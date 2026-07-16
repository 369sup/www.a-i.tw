# Codex context checkpoint

## Status and responsibility

Current, event-driven repository automation. It preserves cross-session work state in Serena memory; it does not make
Serena authoritative over repository code, tests, manifests, or canonical documentation.

```text
Codex official hook adapter
  -> explicit phase signal or PreCompact
  -> one pending checkpoint request
  -> Codex creates a semantic work summary
  -> official Serena CLI write and read-back verification
```

The implementation never emulates MCP and never parses Codex transcript or session JSONL. Disposable monitor state and
the failure fallback live under `.serena/cache/codex-context-checkpoint/`.

## Feasibility and selected scheme

Codex officially supports `PreCompact`, `Stop`, and `SessionStart` command hooks. Their documented input includes the
event, working directory, model, session, and turn identifiers, but not current token count or remaining context
percentage. Although Codex configuration exposes `model_context_window`, that value alone cannot produce a usage ratio.
The documented `transcript_path` is explicitly not a stable hook interface.

This repository uses explicit semantic events instead of approximating them from token counts, elapsed time, or dirty
file counts:

- `PreCompact` creates a request and pauses compaction until the work state is preserved.
- `--signal` creates a request for important phase completion, architecture decisions, task switching, or user pause.
- `Stop` blocks only when one of those requests already exists.
- `SessionStart` restores an existing request as additional context.

Official references:

- <https://learn.chatgpt.com/docs/hooks>
- <https://learn.chatgpt.com/docs/config-file/config-reference>

## Automatic behavior

- `SessionStart`: restores any pending request as additional context.
- `Stop`: allows the task to end when no request exists; an existing request remains blocked until acknowledged.
- `PreCompact`: creates one request and returns `continue: false`. Repeated compaction remains paused while that same
  request is pending. If the worktree changes, the request is refreshed to the current work hash.
- `--signal`: records the current work hash and the supplied semantic reason. It does not depend on a timer or file-count
  threshold.
- Successful checkpoint: validates the summary, invokes `serena memories write current-work-state <project>`, reads the
  memory back, compares normalized content, records the work-state hash, and clears the request.
- Serena failure: validates and saves the same summary as
  `.serena/cache/codex-context-checkpoint/checkpoint-fallback.md`, reports the Serena error, and never claims Serena
  persistence.

The work hash uses `git status --short` plus file size and modification time, not file content. Checkpoint-owned fixed
memory files are excluded to prevent the checkpoint itself from retriggering the monitor. Request status previews are
capped at 50 lines.

## Completing a request

Create the exact `Current Work State` structure required by root `AGENTS.md`, including branch, HEAD, and working-tree summary under `Git Anchor`, then pipe it to the canonical command:

```powershell
$summary | pnpm checkpoint:context -- --checkpoint
```

The command must report both `serena_saved: true` and `read_back_verified: true`. Exit code `2` means Serena failed but
the local fallback was saved. Exit code `1` means no valid checkpoint was preserved.

Before writing a checkpoint for an important project phase, create its request:

```powershell
pnpm checkpoint:context -- --signal important-phase-completed
pnpm checkpoint:context -- --signal architecture-decision
pnpm checkpoint:context -- --signal task-switch-or-pause
pnpm checkpoint:context -- --status
```

`PreCompact` creates its own request, so it does not require a preceding signal.

## Activation and maintenance

Project hooks are loaded from `.codex/config.toml` only in a trusted project. On first use, review and trust their exact
definitions through Codex `/hooks`, then start a new session or restart the client so the config is loaded.

- Stable memory names: `project-overview`, `knowledge`, and `current-work-state`.
- Every checkpoint updates `current-work-state`; update `project-overview` only when routing changes and `knowledge` only when a verified durable record passes the admission gate.
- Direct verification: `node --test scripts/validation/codex-context-checkpoint/*.test.mjs`.
