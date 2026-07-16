# Serena Memory Policy

## Status and authority

Accepted operational policy. `AGENTS.md` owns stable execution rules, `docs/` and ADRs own human-reviewable knowledge, Git/code/tests/manifests own runtime facts, and Serena memory owns only routing, distilled non-obvious knowledge, and resumable state.

## Three-memory model

`.serena/memories/` contains exactly:

| Memory               | Responsibility                                   | Read timing                                   | Write timing                                           |
| -------------------- | ------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------ |
| `project-overview`   | Read-order index and canonical source routing    | A new task needs repository orientation       | Routing, authority, or stable repository shape changes |
| `knowledge`          | Verified reusable facts expensive to reconstruct | The current task needs a relevant prior fact  | A candidate passes every admission gate below          |
| `current-work-state` | Overwriteable cross-session checkpoint           | Resume, compact, pause, or pending checkpoint | Lifecycle hook or explicit checkpoint event            |

Do not create per-Context, architecture, workflow, command, convention, status, research, archive, or temporary memories. Those facts belong in manifests, canonical docs, code, tests, Git, or the current checkpoint.

## Durable knowledge admission

A record enters `knowledge` only when all are true:

1. It is verified by a canonical path, symbol, test, command result, or explicit approved decision.
2. A future task is likely to reuse it.
3. Reconstructing it from repository sources is materially expensive or error-prone.
4. It is not already adequately represented by `AGENTS.md`, docs/ADR, code, tests, manifests, or Git.
5. Its scope, applicability conditions, invalidation condition, evidence, and verification date are known.

Otherwise, do not write it. Formal decisions go to docs or ADRs; temporary observations remain in `current-work-state`; repository-reconstructable detail is discarded.

## Record schema

Each durable record uses one section in `knowledge`:

```md
### K-YYYYMMDD-short-slug

- Status: active | review | deprecated
- Tags: optional comma-separated retrieval hints; never create tag-only records
- Scope: repository, Context, tool, or workflow boundary
- Claim: one verified reusable fact
- Why retained: future value and reconstruction cost
- Evidence: canonical path, symbol, test, command, or approved decision
- Applies when: validity conditions
- Invalidated when: observable re-verification/removal trigger
- Last verified: YYYY-MM-DD plus evidence
```

`Review Queue` may hold a candidate only during the current task; verify and promote it before checkpoint completion or remove it. Never preserve speculation as an active record.

## Current work schema

`current-work-state` uses the fixed headings required by root `AGENTS.md`. `Git Anchor` is mandatory and records:

- Branch: current branch name or detached state.
- HEAD: current commit hash; use a short hash only when it remains unambiguous.
- Working tree: concise `git status --short` summary, including unrelated changes that must be preserved.

The anchor is a recovery coordinate, not a copy of Git history or a diff.

## Distillation and pruning

- Merge overlapping records around one claim; do not create a file per topic.
- When a record becomes formal policy or architecture, promote it to its canonical owner and remove or reduce the memory record to a routing pointer.
- Re-verify records touched by changed paths, contracts, owners, runtime status, or validation evidence.
- Delete invalidated, duplicated, cheap-to-reconstruct, or no-longer-reusable records instead of preserving history.
- Review the whole file when it reaches 20 active records or 12 KiB. Prune/promote before considering any new memory file; splitting requires explicit user approval and a demonstrated retrieval problem.

## Autonomous use

For supported code tasks, apply the user-level Codex tool routing and current-session capabilities: semantic tools own symbols, implementations, references, whole-symbol edits, and diagnostics; native tools own prose, structured text, Git, commands, and validation. The activation prompt in `.serena/project.yml` provides a compact always-on reminder and never replaces root or nearer `AGENTS.md`.

Read only the role needed by the current event. Do not list and preload all memories as a routine startup ritual.

## Checkpoint lifecycle

Official Codex `PreCompact`, `Stop`, and `SessionStart` hooks plus the official Serena CLI implement checkpoints. Hooks do not expose reliable current token usage, and transcript/session files are not stable parsing interfaces; event and phase checkpoints are primary.

Checkpoint after a material implementation or architecture phase, task/context switch, user pause, impending compaction, visible low-context warning, or signs that confirmed decisions are being lost. `PreCompact` pauses until `current-work-state` is written and read back. The single `Stop` hook may keep the turn open after material cross-file work and debounce; complete task-scoped verification before writing the checkpoint. No parallel verification hook or transcript parsing participates in this lifecycle.

The executable procedure and fallback behavior are owned by `scripts/validation/codex-context-checkpoint/README.md`. A successful checkpoint must report Serena write and read-back success. If Serena fails, report the ignored local fallback without claiming Serena persistence.

Never store transcripts, source dumps, diffs, raw logs, secrets, personal data, speculative claims, or overturned decisions in any memory.
