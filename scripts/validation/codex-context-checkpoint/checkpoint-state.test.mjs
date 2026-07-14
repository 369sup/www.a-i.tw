import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  CHECKPOINT_THRESHOLD,
  calculateUsage,
  emptyState,
  evaluateCheckpointPolicy,
} from "./checkpoint-state.mjs";
import {
  validateCheckpointSummary,
  writeFallback,
} from "./serena-memory-writer.mjs";

const now = Date.parse("2026-07-14T00:10:00.000Z");
const git = { workHash: "work-a", changedFiles: 4 };
const source = { event: "ManualSignal", trigger: null, stopHookActive: false };

test("below threshold does not request a checkpoint", () => {
  const result = evaluateCheckpointPolicy({
    source,
    git,
    tokenCount: 89,
    contextWindow: 100,
    now,
  });
  assert.equal(calculateUsage(89, 100).percentage < CHECKPOINT_THRESHOLD, true);
  assert.equal(result.checkpoint, false);
});

test("at threshold requests exactly one checkpoint", () => {
  const first = evaluateCheckpointPolicy({
    source,
    git,
    tokenCount: 90,
    contextWindow: 100,
    now,
  });
  const duplicate = evaluateCheckpointPolicy({
    source,
    git,
    tokenCount: 90,
    contextWindow: 100,
    now,
    state: { ...emptyState(), pending_work_hash: "work-a" },
  });
  assert.equal(first.checkpoint, true);
  assert.equal(duplicate.checkpoint, false);
});

test("material token or work growth permits a later checkpoint", () => {
  const result = evaluateCheckpointPolicy({
    source,
    git,
    tokenCount: 95,
    contextWindow: 100,
    now,
    state: {
      ...emptyState(),
      last_checkpoint_token_count: 90,
      last_checkpoint_time: "2026-07-14T00:09:00.000Z",
      last_checkpoint_work_hash: "work-before",
      last_observed_work_hash: "work-before",
    },
  });
  assert.equal(result.checkpoint, true);
});

test("unavailable token data falls back safely to phase mode", () => {
  const result = evaluateCheckpointPolicy({ source, git, now });
  assert.deepEqual(calculateUsage(null, null), {
    available: false,
    percentage: null,
  });
  assert.equal(result.checkpoint, false);
  assert.equal(result.reason, "phase-checkpoint-mode");
});

test("PreCompact requests unless the same work was checkpointed", () => {
  const compact = {
    event: "PreCompact",
    trigger: "auto",
    stopHookActive: false,
  };
  assert.equal(
    evaluateCheckpointPolicy({ source: compact, git, now }).checkpoint,
    true,
  );
  assert.equal(
    evaluateCheckpointPolicy({
      source: compact,
      git,
      now,
      state: { ...emptyState(), last_checkpoint_work_hash: "work-a" },
    }).checkpoint,
    false,
  );
});

test("cross-file work can checkpoint again after the debounce interval", () => {
  const stop = { event: "Stop", trigger: null, stopHookActive: false };
  const result = evaluateCheckpointPolicy({
    source: stop,
    git,
    now,
    state: {
      ...emptyState(),
      last_checkpoint_time: "2026-07-14T00:04:00.000Z",
      last_checkpoint_work_hash: "work-before",
      last_observed_work_hash: "work-before",
    },
  });
  assert.equal(result.checkpoint, true);
});

test("Stop continuation does not create a checkpoint loop", () => {
  const stop = { event: "Stop", trigger: null, stopHookActive: true };
  const result = evaluateCheckpointPolicy({
    source: stop,
    git,
    now,
    state: { ...emptyState(), last_observed_work_hash: "work-before" },
  });
  assert.equal(result.checkpoint, false);
  assert.equal(result.reason, "stop-continuation-already-active");
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
