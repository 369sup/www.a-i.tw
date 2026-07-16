import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";

const script = fileURLToPath(new URL("./check-context.mjs", import.meta.url));
const projectTemplate = fileURLToPath(
  new URL("../../../.serena/project.yml", import.meta.url),
);

/**
 * @param {string} command
 * @param {string[]} args
 * @param {import("node:child_process").SpawnSyncOptionsWithStringEncoding} [options]
 * @param {number} [expectedStatus]
 */
function run(command, args, options = {}, expectedStatus = 0) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    windowsHide: true,
    ...options,
  });
  assert.equal(result.status, expectedStatus, result.stderr);
  return result.stdout;
}

function createProject() {
  const root = mkdtempSync(join(tmpdir(), "codex-hook-integration-"));
  mkdirSync(join(root, ".serena", "memories"), { recursive: true });
  writeFileSync(join(root, ".serena", ".gitignore"), "cache/\nlogs/\n", "utf8");
  const projectConfig = readFileSync(projectTemplate, "utf8").replace(
    /^project_name:.*$/m,
    `project_name: checkpoint-integration-${Date.now()}`,
  );
  writeFileSync(join(root, ".serena", "project.yml"), projectConfig, "utf8");
  writeFileSync(
    join(root, ".serena", "memories", "current-work-state.md"),
    "# Previous state\n",
    "utf8",
  );
  writeFileSync(join(root, "work.txt"), "work\n", "utf8");
  run("git", ["init", "--quiet"], { cwd: root });
  run(
    "git",
    [
      "add",
      ".serena/.gitignore",
      ".serena/project.yml",
      ".serena/memories/current-work-state.md",
      "work.txt",
    ],
    { cwd: root },
  );
  return root;
}

/** @param {string} root */
function compactInput(root) {
  return JSON.stringify({
    session_id: "session-test",
    turn_id: "turn-test",
    cwd: root,
    hook_event_name: "PreCompact",
    model: "test-model",
    trigger: "auto",
  });
}

/**
 * @param {string} root
 * @param {string} event
 * @param {Record<string, unknown>} [extra]
 */
function hookInput(root, event, extra = {}) {
  return JSON.stringify({
    session_id: "session-test",
    turn_id: "turn-test",
    cwd: root,
    hook_event_name: event,
    model: "test-model",
    ...extra,
  });
}

const summary = `# Current Work State

## Objective
Verify the checkpoint flow.
## Scope
Temporary test repository only.
## Confirmed Decisions
- Use official Serena CLI.
## Completed
- PreCompact request.
## In Progress
- None.
## Pending
- None.
## Modified Files
- work.txt; verified.
## Git Anchor
- Branch: main
- HEAD: test-fixture
- Working tree: work.txt modified
## Validation
- Integration test passed.
## Known Risks
- No stable token source.
## Next Action
Retry compaction.
`;

test("PreCompact pauses, Serena writes and reads back, then compaction may retry", () => {
  const root = createProject();
  const input = compactInput(root);
  const first = JSON.parse(
    run(process.execPath, [script, "--hook"], { cwd: root, input }),
  );
  assert.equal(first.continue, false);

  const repeated = JSON.parse(
    run(process.execPath, [script, "--hook"], { cwd: root, input }),
  );
  assert.equal(repeated.continue, false);
  assert.match(repeated.stopReason, /still pending/);

  const saved = JSON.parse(
    run(process.execPath, [script, "--checkpoint"], {
      cwd: root,
      input: summary,
    }),
  );
  assert.equal(saved.serena_saved, true);
  assert.equal(saved.read_back_verified, true);
  assert.equal(
    readFileSync(
      join(root, ".serena", "memories", "current-work-state.md"),
      "utf8",
    ).replace(/\r\n/g, "\n"),
    summary,
  );

  const retry = JSON.parse(
    run(process.execPath, [script, "--hook"], { cwd: root, input }),
  );
  assert.equal(
    retry.continue,
    true,
    `${JSON.stringify(retry)}\n${run("git", ["status", "--short"], { cwd: root })}`,
  );
});

test("Stop only blocks a checkpoint created by an explicit phase signal", () => {
  const root = createProject();
  const sessionStart = JSON.parse(
    run(process.execPath, [script, "--hook"], {
      cwd: root,
      input: hookInput(root, "SessionStart", { source: "startup" }),
    }),
  );
  assert.equal(sessionStart.continue, true);

  writeFileSync(join(root, "work.txt"), "changed\n", "utf8");
  writeFileSync(join(root, "second.txt"), "changed\n", "utf8");
  writeFileSync(join(root, "third.txt"), "changed\n", "utf8");

  const input = hookInput(root, "Stop", { stop_hook_active: false });
  const withoutRequest = JSON.parse(
    run(process.execPath, [script, "--hook"], { cwd: root, input }),
  );
  assert.equal(withoutRequest.continue, true);

  const signal = JSON.parse(
    run(process.execPath, [script, "--signal", "important-phase-completed"], {
      cwd: root,
    }),
  );
  assert.equal(signal.checkpoint_requested, true);

  const withRequest = JSON.parse(
    run(process.execPath, [script, "--hook"], {
      cwd: root,
      input,
    }),
  );
  assert.equal(withRequest.continue, false);
  assert.match(withRequest.stopReason, /still pending/i);

  const resumed = JSON.parse(
    run(process.execPath, [script, "--hook"], {
      cwd: root,
      input: hookInput(root, "SessionStart", { source: "resume" }),
    }),
  );
  assert.match(
    resumed.hookSpecificOutput.additionalContext,
    /checkpoint is pending/i,
  );
});

test("Serena failure saves the same summary to the local fallback", () => {
  const root = createProject();
  run(process.execPath, [script, "--hook"], {
    cwd: root,
    input: compactInput(root),
  });
  const output = JSON.parse(
    run(
      process.execPath,
      [script, "--checkpoint"],
      {
        cwd: root,
        input: summary,
        env: {
          ...process.env,
          CODEX_CHECKPOINT_SERENA_EXECUTABLE: "definitely-missing-serena",
        },
      },
      2,
    ),
  );
  assert.equal(output.serena_saved, false);
  assert.equal(output.fallback_saved, true);
  assert.equal(
    existsSync(
      join(
        root,
        ".serena",
        "cache",
        "codex-context-checkpoint",
        "checkpoint-fallback.md",
      ),
    ),
    true,
  );
});

test("invalid hook input exits safely without interrupting Codex", () => {
  const output = JSON.parse(
    run(process.execPath, [script, "--hook"], { input: "not-json" }),
  );
  assert.equal(output.continue, true);
  assert.match(output.systemMessage, /skipped safely/);
});
