import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";

const CHECKPOINT_MEMORY_PATHS = new Set([
  ".serena/memories/project-overview.md",
  ".serena/memories/knowledge.md",
  ".serena/memories/current-work-state.md",
]);

/**
 * @typedef {object} CheckpointState
 * @property {number} version
 * @property {string | null} last_checkpoint_time
 * @property {string | null} last_checkpoint_work_hash
 * @property {string | null} last_checkpoint_work_state_hash
 * @property {string | null} last_checkpoint_reason
 * @property {string | null} last_checkpoint_storage
 * @property {string | null} pending_work_hash
 */

function runGit(cwd, args) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.status !== 0)
    throw new Error(result.stderr.trim() || `git ${args.join(" ")} failed`);
  return result.stdout.trimEnd();
}

export function collectGitState(cwd) {
  const root = resolve(runGit(cwd, ["rev-parse", "--show-toplevel"]));
  const branch = runGit(root, ["branch", "--show-current"]) || "DETACHED";
  const status = runGit(root, ["status", "--short"]);
  const statusLines = (status ? status.split(/\r?\n/) : []).filter((line) => {
    const path = line.slice(3).replaceAll("\\", "/").replace(/^"|"$/g, "");
    return !CHECKPOINT_MEMORY_PATHS.has(path);
  });
  const observable = [statusLines.join("\n")];

  for (const line of statusLines) {
    const rawPath = line.slice(3).replace(/^"|"$/g, "");
    const path = rawPath.includes(" -> ")
      ? rawPath.split(" -> ").at(-1)
      : rawPath;
    try {
      const file = statSync(join(root, path));
      observable.push(`${path}\0${file.size}\0${file.mtimeMs}`);
    } catch {
      observable.push(`${path}\0missing`);
    }
  }

  return {
    root,
    branch,
    statusLines,
    changedFiles: statusLines.length,
    workHash: createHash("sha256").update(observable.join("\n")).digest("hex"),
  };
}

/** @returns {CheckpointState} */
export function emptyState() {
  return {
    version: 2,
    last_checkpoint_time: null,
    last_checkpoint_work_hash: null,
    last_checkpoint_work_state_hash: null,
    last_checkpoint_reason: null,
    last_checkpoint_storage: null,
    pending_work_hash: null,
  };
}

/**
 * @param {{
 *   source: { event: string, trigger?: string | null },
 *   git: { workHash: string },
 *   state?: CheckpointState,
 *   manualSignal?: string | null
 * }} input
 */
export function evaluateCheckpointPolicy({
  source,
  git,
  state = emptyState(),
  manualSignal = null,
}) {
  const sameCheckpoint = state.last_checkpoint_work_hash === git.workHash;
  const samePending = state.pending_work_hash === git.workHash;

  if (samePending) return { checkpoint: false, reason: "same-request-pending" };

  if (source.event === "PreCompact") {
    return sameCheckpoint
      ? {
          checkpoint: false,
          reason: "current-work-already-checkpointed",
        }
      : {
          checkpoint: true,
          reason: `before-${source.trigger || "unknown"}-compaction`,
        };
  }

  if (manualSignal) {
    if (sameCheckpoint && state.last_checkpoint_reason === manualSignal) {
      return { checkpoint: false, reason: "manual-signal-deduplicated" };
    }
    return { checkpoint: true, reason: manualSignal };
  }

  return { checkpoint: false, reason: "no-explicit-checkpoint-request" };
}

export function statePaths(root) {
  const directory = join(root, ".serena", "cache", "codex-context-checkpoint");
  return {
    directory,
    state: join(directory, "checkpoint-state.json"),
    request: join(directory, "checkpoint-request.json"),
    fallback: join(directory, "checkpoint-fallback.md"),
  };
}

export function loadState(path) {
  if (!existsSync(path)) return emptyState();
  try {
    const value = JSON.parse(readFileSync(path, "utf8"));
    return {
      ...emptyState(),
      last_checkpoint_time: value.last_checkpoint_time || null,
      last_checkpoint_work_hash: value.last_checkpoint_work_hash || null,
      last_checkpoint_work_state_hash:
        value.last_checkpoint_work_state_hash || null,
      last_checkpoint_reason: value.last_checkpoint_reason || null,
      last_checkpoint_storage: value.last_checkpoint_storage || null,
      pending_work_hash: value.pending_work_hash || null,
    };
  } catch {
    return emptyState();
  }
}

export function writeJsonAtomic(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  renameSync(temporary, path);
}

export function createCheckpointRequest({
  git,
  reason,
  source,
  now = Date.now(),
}) {
  const previewLimit = 50;
  return {
    version: 1,
    memory_name: "current-work-state",
    requested_at: new Date(now).toISOString(),
    reason,
    repository_root: git.root,
    branch: git.branch,
    work_hash: git.workHash,
    changed_file_count: git.changedFiles,
    git_status_short_preview: git.statusLines.slice(0, previewLimit),
    omitted_status_lines: Math.max(0, git.statusLines.length - previewLimit),
    source_event: source.event,
    trigger: source.trigger || null,
  };
}

/**
 * @param {{
 *   paths: ReturnType<typeof statePaths>,
 *   git: ReturnType<typeof collectGitState>,
 *   state: CheckpointState,
 *   workStateHash: string,
 *   storage: string,
 *   reason: string | null,
 *   now?: number
 * }} input
 */
export function acknowledgeCheckpoint({
  paths,
  git,
  state,
  workStateHash,
  storage,
  reason,
  now = Date.now(),
}) {
  const request = existsSync(paths.request)
    ? JSON.parse(readFileSync(paths.request, "utf8"))
    : null;
  if (!request || request.work_hash !== git.workHash) {
    throw new Error("No checkpoint request matches the current work hash");
  }
  const next = {
    ...state,
    last_checkpoint_time: new Date(now).toISOString(),
    last_checkpoint_work_hash: git.workHash,
    last_checkpoint_work_state_hash: workStateHash,
    last_checkpoint_reason: reason || request.reason,
    last_checkpoint_storage: storage,
    pending_work_hash: null,
  };
  writeJsonAtomic(paths.state, next);
  rmSync(paths.request, { force: true });
  return next;
}
