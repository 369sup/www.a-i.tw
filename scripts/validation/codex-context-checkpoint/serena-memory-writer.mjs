import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const CURRENT_WORK_STATE_MEMORY = "current-work-state";

const REQUIRED_HEADINGS = [
  "# Current Work State",
  "## Objective",
  "## Scope",
  "## Confirmed Decisions",
  "## Completed",
  "## In Progress",
  "## Pending",
  "## Modified Files",
  "## Git Anchor",
  "## Validation",
  "## Known Risks",
  "## Next Action",
];

export function normalizeSummary(summary) {
  return summary.replace(/\r\n/g, "\n").trimEnd() + "\n";
}

export function validateCheckpointSummary(summary) {
  if (
    typeof summary !== "string" ||
    summary.length === 0 ||
    summary.length > 48 * 1024
  ) {
    throw new Error("Checkpoint summary must be between 1 byte and 48 KiB");
  }
  for (const heading of REQUIRED_HEADINGS) {
    if (!summary.includes(heading))
      throw new Error(`Checkpoint summary is missing ${heading}`);
  }
  if (/^diff --git /m.test(summary) || /^@@ .* @@$/m.test(summary)) {
    throw new Error("Checkpoint summary must not contain a Git diff");
  }
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i.test(summary)) {
    throw new Error("Checkpoint summary appears to contain a private key");
  }
  if (
    /(?:api[_-]?key|token|password|secret)\s*[:=]\s*["']?[A-Za-z0-9_\-]{16,}/i.test(
      summary,
    )
  ) {
    throw new Error("Checkpoint summary appears to contain a secret value");
  }
}

function runSerena(args, { cwd, input } = {}) {
  const executable = process.env.CODEX_CHECKPOINT_SERENA_EXECUTABLE || "serena";
  const result = spawnSync(executable, args, {
    cwd,
    input,
    encoding: "utf8",
    windowsHide: true,
    timeout: 30_000,
    env: { ...process.env, PYTHONUTF8: "1" },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      result.stderr.trim() ||
        result.stdout.trim() ||
        `serena ${args.join(" ")} failed`,
    );
  }
  return result.stdout;
}

export function writeAndVerifySerenaMemory({
  projectRoot,
  summary,
  memoryName = CURRENT_WORK_STATE_MEMORY,
}) {
  validateCheckpointSummary(summary);
  const normalized = normalizeSummary(summary);
  runSerena(["memories", "write", memoryName, projectRoot], {
    cwd: projectRoot,
    input: normalized,
  });
  const readBack = runSerena(["memories", "read", memoryName, projectRoot], {
    cwd: projectRoot,
  });
  if (normalizeSummary(readBack) !== normalized)
    throw new Error("Serena memory read-back did not match the write");
  return createHash("sha256").update(normalized).digest("hex");
}

export function writeFallback(path, summary) {
  validateCheckpointSummary(summary);
  mkdirSync(dirname(path), { recursive: true });
  const normalized = normalizeSummary(summary);
  const temporary = `${path}.${process.pid}.tmp`;
  writeFileSync(temporary, normalized, { encoding: "utf8", mode: 0o600 });
  renameSync(temporary, path);
  return createHash("sha256").update(normalized).digest("hex");
}
