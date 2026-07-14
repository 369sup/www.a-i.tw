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

export const CHECKPOINT_THRESHOLD = 0.9;
export const MINIMUM_INTERVAL_MS = 5 * 60 * 1000;
export const MINIMUM_TOKEN_INCREASE_RATIO = 0.04;
export const MINIMUM_CHANGED_FILES = 3;

const CHECKPOINT_MEMORY_PATHS = new Set([
  ".serena/memories/project-overview.md",
  ".serena/memories/knowledge.md",
  ".serena/memories/current-work-state.md",
]);

export function calculateUsage(tokenCount, contextWindow) {
  if (
    !Number.isFinite(tokenCount) ||
    !Number.isFinite(contextWindow) ||
    tokenCount < 0 ||
    contextWindow <= 0
  ) {
    return { available: false, percentage: null };
  }
  return { available: true, percentage: tokenCount / contextWindow };
}

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

export function emptyState() {
  return {
    version: 1,
    last_checkpoint_token_count: null,
    last_checkpoint_time: null,
    last_checkpoint_work_hash: null,
    last_checkpoint_work_state_hash: null,
    last_checkpoint_reason: null,
    last_checkpoint_storage: null,
    last_observed_work_hash: null,
    last_request_time: null,
    pending_work_hash: null,
    threshold_triggered: false,
  };
}

export function evaluateCheckpointPolicy({
  source,
  git,
  state = emptyState(),
  now = Date.now(),
  tokenCount = null,
  contextWindow = null,
  manualSignal = null,
}) {
  const usage = calculateUsage(tokenCount, contextWindow);
  const sameCheckpoint = state.last_checkpoint_work_hash === git.workHash;
  const samePending = state.pending_work_hash === git.workHash;
  const lastActivity = Math.max(
    Date.parse(state.last_checkpoint_time || 0) || 0,
    Date.parse(state.last_request_time || 0) || 0,
  );
  const intervalElapsed = now - lastActivity >= MINIMUM_INTERVAL_MS;
  const workChanged = state.last_observed_work_hash !== git.workHash;
  const tokenIncrease =
    usage.available && Number.isFinite(state.last_checkpoint_token_count)
      ? tokenCount - state.last_checkpoint_token_count
      : null;
  const materialTokenIncrease =
    usage.available && tokenIncrease !== null
      ? tokenIncrease >= contextWindow * MINIMUM_TOKEN_INCREASE_RATIO
      : false;

  if (samePending)
    return { checkpoint: false, reason: "same-request-pending", usage };

  if (usage.available && usage.percentage >= CHECKPOINT_THRESHOLD) {
    if (
      !sameCheckpoint &&
      (intervalElapsed || materialTokenIncrease || workChanged)
    ) {
      return {
        checkpoint: true,
        reason: "context-at-or-above-90-percent",
        usage,
      };
    }
    return { checkpoint: false, reason: "threshold-deduplicated", usage };
  }

  if (source.event === "PreCompact") {
    return sameCheckpoint
      ? {
          checkpoint: false,
          reason: "current-work-already-checkpointed",
          usage,
        }
      : {
          checkpoint: true,
          reason: `before-${source.trigger || "unknown"}-compaction`,
          usage,
        };
  }

  if (manualSignal) {
    if (sameCheckpoint && state.last_checkpoint_reason === manualSignal) {
      return { checkpoint: false, reason: "manual-signal-deduplicated", usage };
    }
    if (!intervalElapsed && sameCheckpoint)
      return { checkpoint: false, reason: "minimum-interval", usage };
    return { checkpoint: true, reason: manualSignal, usage };
  }

  if (source.event === "Stop") {
    if (source.stopHookActive)
      return {
        checkpoint: false,
        reason: "stop-continuation-already-active",
        usage,
      };
    if (!state.last_observed_work_hash) {
      return {
        checkpoint: false,
        reason: "observation-baseline-created",
        usage,
      };
    }
    if (!workChanged || sameCheckpoint)
      return { checkpoint: false, reason: "no-material-work-change", usage };
    if (git.changedFiles < MINIMUM_CHANGED_FILES) {
      return { checkpoint: false, reason: "below-cross-file-threshold", usage };
    }
    if (!intervalElapsed)
      return { checkpoint: false, reason: "minimum-interval", usage };
    return { checkpoint: true, reason: "cross-file-work-changed", usage };
  }

  return { checkpoint: false, reason: "phase-checkpoint-mode", usage };
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
    return { ...emptyState(), ...JSON.parse(readFileSync(path, "utf8")) };
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

export function acknowledgeCheckpoint({
  paths,
  git,
  state,
  workStateHash,
  storage,
  reason,
  tokenCount = null,
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
    last_checkpoint_token_count: Number.isFinite(tokenCount)
      ? tokenCount
      : null,
    last_checkpoint_time: new Date(now).toISOString(),
    last_checkpoint_work_hash: git.workHash,
    last_checkpoint_work_state_hash: workStateHash,
    last_checkpoint_reason: reason || request.reason,
    last_checkpoint_storage: storage,
    last_observed_work_hash: git.workHash,
    pending_work_hash: null,
    threshold_triggered: false,
  };
  writeJsonAtomic(paths.state, next);
  rmSync(paths.request, { force: true });
  return next;
}
