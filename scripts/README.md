# Repository automation

## Purpose and structure

`scripts/` contains deterministic repository gates and release helpers. Canonical entry points remain in root `package.json`.

The two script categories below are the only legal root categories and are machine-enforced by `pnpm arch:topology`; temporary automation does not justify a third hierarchy.

```text
scripts/
├── architecture/ # topology, manifest, export, workspace, and import checks
└── validation/   # docs, links, environment, status, release, and verification gates
```

## Common commands

| Need                     | Command                               |
| ------------------------ | ------------------------------------- |
| Documentation validation | `pnpm docs:check`                     |
| Architecture validation  | `pnpm arch:check`                     |
| Context checkpoint       | `pnpm checkpoint:context -- --status` |
| Runtime checks           | `pnpm check`                          |
| Release readiness        | `pnpm release:check`                  |
| Full release gate        | `pnpm task:verify:all`                |

Canonical repository gates use Node `.mjs`. Checks use repository files as inputs, emit actionable diagnostics, and
exit non-zero on rejection; validation orchestration propagates the first failed command's exit status.

`validation/codex-context-checkpoint/` owns the low-frequency Codex lifecycle monitor and Serena checkpoint request.
It uses only official Codex hooks and the official Serena CLI; its disposable state remains under `.serena/cache/`.

## Environment and side effects

- Run commands from the repository root with dependencies installed.
- The canonical `pnpm` commands run on Windows and Unix without requiring Bash. `pnpm semgrep` uses either an installed
  `semgrep` or an isolated `uvx --from semgrep` fallback.
- Validation and architecture checks are read-only; a script that mutates files or external state must document inputs, outputs, rollback, and confirmation behavior beside its entry point.
- Environment variables are read only when the owning command documents them; never place real secret values in scripts or documentation.
