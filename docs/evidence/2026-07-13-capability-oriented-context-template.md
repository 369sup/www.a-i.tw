# Capability-oriented Context template verification

Date: 2026-07-13

## Scope

- Migrated all 11 Current Bounded Contexts to `templateVersion: 2`.
- Replaced the former fixed tactical leaves with capability-oriented Domain folders, explicit Application ports,
  versioned Contracts, plural Adapters, Composition entrypoints, and layer-oriented Tests.
- Synchronized Context manifests, the Context Map, architecture guards, generators, repository skills, plugin guidance,
  and canonical architecture documentation.

## Verification evidence

| Check                                                                       | Result                                                                               |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `pnpm --filter @a-i/architecture-tests test`                                | Passed: 1 file, 29 tests.                                                            |
| `pnpm --filter @a-i/web test`                                               | Passed: 21 files, 35 tests.                                                          |
| `pnpm --filter @a-i/web typecheck`                                          | Passed.                                                                              |
| `pnpm arch:check`                                                           | Passed; all 11 Contexts satisfy template version 2 and all dependency guards passed. |
| `pnpm docs:check`                                                           | Passed.                                                                              |
| `pnpm check`                                                                | Passed: 25 Turbo tasks.                                                              |
| `pnpm build`                                                                | Passed with Next.js 16.2.10.                                                         |
| `pnpm semgrep`                                                              | Passed: 185 targets, 4 rules, 0 findings.                                            |
| `node --check .agents/skills/scaffold-bounded-context/scripts/generate.mjs` | Passed.                                                                              |
| `git diff --check`                                                          | Passed.                                                                              |

## Git Bash compatibility correction

- `pnpm semgrep` delegates explicitly to the repository Bash wrapper, prefers an installed `semgrep`, and otherwise
  uses an isolated `uvx --from semgrep` fallback.
- The wrapper disables Semgrep's Windows-incompatible ignore-file parsing for this scan and supplies explicit generated
  directory exclusions. This avoids the `lexing: empty token` failure while preserving the governed scan roots.
