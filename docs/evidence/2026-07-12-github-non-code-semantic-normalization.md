# GitHub non-code semantic normalization evidence

日期：2026-07-12

## Scope

- Adopt GitHub non-code Published Language.
- Exclude Code capabilities and Pull Requests.
- Rename the existing `work-management` runtime Context to `issues`.
- Classify capability families without scaffolding unapproved Contexts.
- Keep Hexagonal dependency direction and server-only composition unchanged.

## G0-G6 evidence

| Gate | Evidence |
| --- | --- |
| G0 | Serena handshake, current worktree and canonical routing inspected |
| G1 | User approved GitHub non-code semantics; template excluded from product model |
| G2 | Product model, capability catalog, research routing, Ubiquitous Language and roadmap updated |
| G3 | Existing Context path normalized to `apps/web/src/modules/issues` |
| G4 | Not applicable: existing Context rename; no new Context scaffold |
| G5 | `IssuesService`, Issues Domain and existing Ports retained; no behavior invented |
| G6 | Composition imports changed to `modules/issues`; routes remain inbound adapters |

## Runtime truth

Current runtime remains limited to Identity & Access, Account, Repository and the Issue/Label/Assignment
subset of Issues. All newly cataloged capability families remain Research or Proposed.

## Verification

| Check | Result |
| --- | --- |
| Repository topology | Passed |
| Context manifests | Passed |
| Package exports | Passed |
| Workspace dependencies | Passed |
| Cross-context published-contract imports | Passed after Windows path normalization |
| Documentation ownership and all 30 architecture concerns | Passed |
| Documentation links and workspace configuration | Passed |
| `git diff --check` | Passed; line-ending warnings only |
| Web lint and typecheck | Passed |
| Web tests | Passed: 21 tests; 1 template todo |
| Architecture tests | Passed: 11 tests |
| Production build | Passed: Next.js 16.2.10 |
| Full `pnpm check` | Global Prettier baseline failed across 423 files; focused Web checks passed |
| Dependency Cruiser | Technical packages and UI passed; app graph reports 3 existing Presentation-to-contract violations |
| Semgrep | Not run: Semgrep executable is not installed and the repository command is POSIX-only |

Environment or baseline failures must not be interpreted as runtime approval or as evidence that Research
capabilities exist. The repository-wide formatting baseline, three existing dependency violations and Semgrep
availability remain separate governance debt.
