# Serena semantic state contract

## Authority and boundary

- This contract applies to `.serena/`. Code, tests, manifests, root or nearer `AGENTS.md`, and canonical docs remain authoritative; Serena memory never overrides them.
- `.serena/project.yml` owns project activation, language backend, source roots, ignored paths, and LSP settings.
- `cache/` contains generated LSP symbol data and other disposable runtime state. It is not memory, must stay ignored, and may be regenerated or deleted when stale or corrupt.
- `memories/` contains human-readable, curated semantic memory. It stores verified relationships and resumable state, not an LSP index or a copy of repository sources.

## Fixed physical tree

```text
.serena/
├── AGENTS.md
├── README.md
├── project.yml
├── .gitignore
├── cache/                         # ignored, generated, disposable; never memory
└── memories/                      # tracked semantic state; exactly three files
    ├── project-overview.md        # root routing node
    ├── knowledge.md               # durable verified semantic records
    └── current-work-state.md      # single overwriteable checkpoint
```

Do not create additional memory files or folders, including per-Context, workflow, command, research, archive, episode, transcript, or temporary memory trees. A new retrieval concern must be represented as a section or record in one of the three fixed files, or placed in its canonical repository owner when it is not memory.

## Fixed semantic graph

```text
project-overview
├── routes to canonical repository owners
├── routes resume/compact/pause -> current-work-state
└── routes verified non-obvious knowledge -> knowledge

knowledge record
├── identifies one concept or relation
├── points to evidence: canonical path, symbol, reference, test, or approved decision
├── states scope and invariant
└── states validation and invalidation conditions

current-work-state
├── anchors the active objective and scope
├── records confirmed decisions and progress
├── anchors branch, HEAD, working tree, and validation
└── points to exactly one next action
```

References between memories must use Serena's `mem:` form, for example `mem:knowledge`. Do not duplicate the referenced content.

## Memory schemas

### `project-overview.md`

Keep this small and stable. Its fixed sections are:

```text
# Project Overview
## Authority
## Read Order
## Source Map
## Stable Shape
## Memory Map
## Update Gate
## Last Verified
```

It may contain routing cues and stable repository shape only. Update it only when source routing, memory roles, or stable repository shape changes.

### `knowledge.md`

Admit one durable record only when the fact is verified, reusable, non-obvious, expensive to reconstruct, and has no better canonical owner. Each record uses:

```text
### K-YYYYMMDD-short-slug
- Status: active | review | deprecated
- Tags: retrieval hints
- Scope: repository, Context, symbol, tool, or workflow boundary
- Claim: one semantic fact or relation
- Invariant: what must remain true
- Symbols and relations: qualified symbols plus defines/calls/imports/implements/consumes relations when applicable
- Why retained: future value and reconstruction cost
- Evidence: canonical path, symbol, reference, test, command, or approved decision
- Applies when: validity conditions
- Invalidated when: observable re-verification or removal trigger
- Last verified: YYYY-MM-DD plus evidence
```

Do not admit generic framework knowledge, quick-read facts, source dumps, line-level details, speculative semantics, secrets, logs, diffs, or one-off task notes. Merge duplicates and delete invalidated records instead of accumulating history.

### `current-work-state.md`

This is the only resumable task state and is overwritten, not appended. Its fixed sections are:

```text
# Current Work State
## Objective
## Scope
## Confirmed Decisions
## Completed
## In Progress
## Pending
## Modified Files
## Git Anchor
## Validation
## Known Risks
## Next Action
```

`Git Anchor` must include branch, HEAD, and working-tree summary. Do not store transcripts, raw command output, source dumps, or abandoned decisions.

## Retrieval and mutation workflow

1. For Serena-supported code tasks, call `get_current_config` once. Activate or initialize only when the session or project is not ready.
2. Read `mem:project-overview` only when repository routing is needed; read `mem:current-work-state` only for resume, compact, pause, or a pending checkpoint; read `mem:knowledge` only for a relevant distilled fact.
3. For code, use `get_symbols_overview` then `find_symbol` or `find_declaration`, followed only as needed by implementations and references. Confirm definition, responsibility, dependency direction, and impact before editing.
4. Prefer an appropriate symbol-level edit and run changed-file diagnostics plus reference checks afterward. Use native tools for Markdown, JSON, YAML, TOML, configuration, Git, commands, literals, and other non-symbol text.
5. Update memory only after verification. Use the checkpoint contract for `current-work-state`; update `project-overview` or `knowledge` only when their admission gate passes.

## Validation

- Serena or project configuration changes require successful project activation and focused checkpoint tests when applicable.
- Memory-structure changes require checking the exact three filenames and required headings, then running `pnpm docs:check` and inspecting the focused diff.
- Finish repository changes with `git diff --check`; do not claim a memory checkpoint succeeded unless Serena write and read-back both succeeded.
