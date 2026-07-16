import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { emptyState, evaluateCheckpointPolicy } from "./checkpoint-state.mjs";
import {
  validateCheckpointSummary,
  writeFallback,
} from "./serena-memory-writer.mjs";

const git = { workHash: "work-a", changedFiles: 4 };
const source = { event: "ManualSignal", trigger: null, stopHookActive: false };

test("ordinary events do not infer a checkpoint from repository changes", () => {
  const result = evaluateCheckpointPolicy({ source, git });
  assert.equal(result.checkpoint, false);
  assert.equal(result.reason, "no-explicit-checkpoint-request");
});

test("PreCompact requests unless the same work was checkpointed", () => {
  const compact = {
    event: "PreCompact",
    trigger: "auto",
    stopHookActive: false,
  };
  assert.equal(
    evaluateCheckpointPolicy({ source: compact, git }).checkpoint,
    true,
  );
  assert.equal(
    evaluateCheckpointPolicy({
      source: compact,
      git,
      state: { ...emptyState(), last_checkpoint_work_hash: "work-a" },
    }).checkpoint,
    false,
  );
});

test("an explicit phase signal requests a checkpoint", () => {
  const result = evaluateCheckpointPolicy({
    source,
    git,
    manualSignal: "important-phase-completed",
  });
  assert.equal(result.checkpoint, true);
  assert.equal(result.reason, "important-phase-completed");
});

test("the same pending work does not create a second request", () => {
  const result = evaluateCheckpointPolicy({
    source,
    git,
    state: { ...emptyState(), pending_work_hash: "work-a" },
    manualSignal: "important-phase-completed",
  });
  assert.equal(result.checkpoint, false);
  assert.equal(result.reason, "same-request-pending");
});

test("an acknowledged signal is deduplicated for unchanged work", () => {
  const result = evaluateCheckpointPolicy({
    source,
    git,
    state: {
      ...emptyState(),
      last_checkpoint_work_hash: "work-a",
      last_checkpoint_reason: "important-phase-completed",
    },
    manualSignal: "important-phase-completed",
  });
  assert.equal(result.checkpoint, false);
  assert.equal(result.reason, "manual-signal-deduplicated");
});

const validSummary = `# Current Work State

## Objective
Implement checkpointing.
## Scope
Validation automation only.
## Confirmed Decisions
- Phase fallback.
## Completed
- Policy.
## In Progress
- None.
## Pending
- None.
## Modified Files
- scripts; verified.
## Git Anchor
- Branch: main
- HEAD: test-fixture
- Working tree: scripts modified
## Validation
- Tests.
## Known Risks
- No stable token source.
## Next Action
Continue.
`;

test("fallback preserves a valid summary when Serena write fails", () => {
  const directory = mkdtempSync(join(tmpdir(), "codex-checkpoint-"));
  const path = join(directory, "fallback.md");
  writeFallback(path, validSummary);
  assert.equal(readFileSync(path, "utf8"), validSummary);
});

test("checkpoint summaries reject diffs and obvious secrets", () => {
  assert.throws(
    () => validateCheckpointSummary(`${validSummary}\ndiff --git a/a b/a\n`),
    /Git diff/,
  );
  assert.throws(
    () =>
      validateCheckpointSummary(`${validSummary}\napi_key=abcdefghijklmnop\n`),
    /secret/,
  );
});
