#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { readCodexHookSource } from "./adapters/codex-hook-source.mjs";
import {
  acknowledgeCheckpoint,
  collectGitState,
  createCheckpointRequest,
  evaluateCheckpointPolicy,
  loadState,
  statePaths,
  writeJsonAtomic,
} from "./checkpoint-state.mjs";
import {
  writeAndVerifySerenaMemory,
  writeFallback,
} from "./serena-memory-writer.mjs";

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function hookOutput(value) {
  process.stdout.write(`${JSON.stringify(value)}\n`);
}

async function readStdin() {
  let value = "";
  for await (const chunk of process.stdin) value += chunk;
  return value;
}

function updateObservation(state, git) {
  return { ...state, last_observed_work_hash: git.workHash };
}

function persistRequest({ paths, state, git, source, reason }) {
  const request = createCheckpointRequest({ git, reason, source });
  writeJsonAtomic(paths.request, request);
  writeJsonAtomic(paths.state, {
    ...updateObservation(state, git),
    last_request_time: request.requested_at,
    pending_work_hash: git.workHash,
    threshold_triggered: reason === "context-at-or-above-90-percent",
  });
  return request;
}

async function handleHook() {
  const source = await readCodexHookSource();
  const git = collectGitState(source.cwd);
  const paths = statePaths(git.root);
  const state = loadState(paths.state);

  if (source.event === "SessionStart") {
    const pending = existsSync(paths.request);
    writeJsonAtomic(paths.state, updateObservation(state, git));
    hookOutput(
      pending
        ? {
            continue: true,
            hookSpecificOutput: {
              hookEventName: "SessionStart",
              additionalContext:
                "A Serena current-work-state checkpoint is pending. Inspect it with `pnpm checkpoint:context -- --status` and complete the root AGENTS.md checkpoint workflow before new work.",
            },
          }
        : { continue: true },
    );
    return;
  }

  const result = evaluateCheckpointPolicy({ source, git, state });
  const observed = updateObservation(state, git);

  if (!result.checkpoint) {
    writeJsonAtomic(paths.state, observed);
    if (
      (source.event === "PreCompact" || source.event === "Stop") &&
      result.reason === "same-request-pending"
    ) {
      hookOutput({
        continue: false,
        stopReason: "Serena checkpoint request is still pending",
        systemMessage:
          "The turn remains open until current-work-state is written, read back, and the request is cleared.",
      });
      return;
    }
    hookOutput({ continue: true });
    return;
  }

  persistRequest({ paths, state, git, source, reason: result.reason });

  if (source.event === "PreCompact") {
    hookOutput({
      continue: false,
      stopReason: "Serena checkpoint required before compaction",
      systemMessage:
        "Compaction paused. Build the required Current Work State summary and pipe it to `pnpm checkpoint:context -- --checkpoint`; retry compaction only after Serena read-back succeeds or the local fallback is reported.",
    });
    return;
  }

  hookOutput({
    continue: false,
    stopReason: "Serena checkpoint required before stopping",
    systemMessage:
      "Complete task-scoped verification, then write the pending Serena current-work-state checkpoint. Follow root AGENTS.md and pipe the structured Markdown to `pnpm checkpoint:context -- --checkpoint`. Do not stop until the command reports Serena read-back success or an explicit local fallback.",
  });
}

function manualSource(signal) {
  return {
    kind: "manual-observable-signal",
    event: "ManualSignal",
    cwd: process.cwd(),
    trigger: signal,
    stopHookActive: false,
  };
}

async function handleSignal(signal) {
  if (!signal) throw new Error("--signal requires a stable reason");
  const source = manualSource(signal);
  const git = collectGitState(source.cwd);
  const paths = statePaths(git.root);
  const state = loadState(paths.state);
  const parsedTokenCount = Number(option("--token-count"));
  const parsedContextWindow = Number(option("--context-window"));
  const tokenCount =
    Number.isFinite(parsedTokenCount) && parsedTokenCount > 0
      ? parsedTokenCount
      : null;
  const contextWindow =
    Number.isFinite(parsedContextWindow) && parsedContextWindow > 0
      ? parsedContextWindow
      : null;
  const result = evaluateCheckpointPolicy({
    source,
    git,
    state,
    manualSignal: signal,
    tokenCount,
    contextWindow,
  });

  if (!result.checkpoint) {
    writeJsonAtomic(paths.state, updateObservation(state, git));
    process.stdout.write(
      `${JSON.stringify({ checkpoint_requested: false, reason: result.reason }, null, 2)}\n`,
    );
    return;
  }

  persistRequest({ paths, state, git, source, reason: result.reason });
  process.stdout.write(
    `${JSON.stringify({ checkpoint_requested: true, request: paths.request, reason: result.reason }, null, 2)}\n`,
  );
}

async function handleCheckpoint() {
  const summary = await readStdin();
  const git = collectGitState(process.cwd());
  const paths = statePaths(git.root);
  const state = loadState(paths.state);
  const request = existsSync(paths.request)
    ? JSON.parse(readFileSync(paths.request, "utf8"))
    : null;
  if (!request || request.work_hash !== git.workHash) {
    throw new Error("No checkpoint request matches the current work hash");
  }

  try {
    const workStateHash = writeAndVerifySerenaMemory({
      projectRoot: git.root,
      summary,
    });
    acknowledgeCheckpoint({
      paths,
      git,
      state,
      workStateHash,
      storage: "serena",
    });
    process.stdout.write(
      `${JSON.stringify({ serena_saved: true, read_back_verified: true, memory: "current-work-state" }, null, 2)}\n`,
    );
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    const workStateHash = writeFallback(paths.fallback, summary);
    acknowledgeCheckpoint({
      paths,
      git,
      state,
      workStateHash,
      storage: "fallback",
      reason: "serena-write-failed-fallback-saved",
    });
    process.stdout.write(
      `${JSON.stringify(
        {
          serena_saved: false,
          read_back_verified: false,
          fallback_saved: true,
          fallback: paths.fallback,
          error: reason,
        },
        null,
        2,
      )}\n`,
    );
    process.exitCode = 2;
  }
}

function handleStatus() {
  const git = collectGitState(process.cwd());
  const paths = statePaths(git.root);
  let request = null;
  try {
    request = JSON.parse(readFileSync(paths.request, "utf8"));
  } catch {
    // No valid pending request.
  }
  process.stdout.write(
    `${JSON.stringify({ state: loadState(paths.state), request }, null, 2)}\n`,
  );
}

try {
  if (process.argv.includes("--hook")) await handleHook();
  else if (process.argv.includes("--checkpoint")) await handleCheckpoint();
  else if (process.argv.includes("--status")) handleStatus();
  else if (process.argv.includes("--signal"))
    await handleSignal(option("--signal"));
  else
    throw new Error("Use --hook, --signal <reason>, --checkpoint, or --status");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (process.argv.includes("--hook")) {
    hookOutput({
      continue: true,
      systemMessage: `Context checkpoint monitor skipped safely: ${message}`,
    });
    process.exitCode = 0;
  } else {
    process.stderr.write(`Context checkpoint monitor: ${message}\n`);
    process.exitCode = 1;
  }
}
