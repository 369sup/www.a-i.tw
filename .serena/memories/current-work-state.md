# Current Work State
## Objective
Complete the approved GitHub non-Code 18-to-37 Context atomic migration without adding planned runtime capabilities.
## Scope
Six Domain Groups, twelve Domain Areas, thirty-seven physical Contexts; runtime ownership splits, mechanical renames, portfolio ledger, generator/checker, Context Map, and canonical docs.
## Confirmed Decisions
Exactly 37 Contexts: 20 runtime and 17 planned. No compatibility aliases. Planned APIs are empty. Context Map contains runtime only. Serena MCP methods were not injected; global Serena command was corrected and the user explicitly authorized narrow native fallback.
## Completed
All old Context roots removed. Account, Organization, Enterprise, Repository authorization, and Notifications/Subscriptions ownership split or merged. Runtime imports and contracts updated. Old IDs remain only in migration ledger and ADR history.
## In Progress
Final reporting only.
## Pending
No implementation work remains. Do not stage, commit, push, deploy, or modify unrelated dirty files.
## 2026-07-14 Topology Rule Follow-up
User confirmed `.codex/logs` and `scripts/codex` are intentional repository areas. Updated the exact topology allowlists in `scripts/architecture/check-repository-topology.mjs` and the matching architecture-test fixture in `tests/architecture/src/dependency-rules.test.ts`. Serena diagnostics were clean for the TypeScript test and for 21 migration boundary files. Full `pnpm arch:check` passed, including 49/49 architecture tests; `git diff --check` passed.
## Modified Files
apps/web/src/modules portfolio and runtime; apps/web/src/composition/product-composition.ts; docs architecture/domain/product/evidence/roadmap; architecture scripts/tests; scaffold skill/generator; package.json. Global C:/Users/sup/.codex AGENTS.md and config.toml were also corrected outside Git.
## Git Anchor
branch main; HEAD 5250de71c1d62e86f1cc8db9c04cde556312967d; dirty working tree with migration plus unrelated pre-existing Serena/plugin/Playwright changes.
## Validation
37/20/17 count verified; planned API mismatch zero; web typecheck and 54 files/125 tests passed; docs:check passed; arch:check passed before final doc-only renames; turbo check/test passed; build passed; semgrep passed; git diff --check passed. pnpm check remains blocked only by 8 unrelated pre-existing formatting files.
## Known Risks
Serena semantic MCP diagnostics were unavailable in this task. Large move diff appears as delete/add until staged by the user. Unrelated dirty files must remain untouched.
## Next Action
Report completion, validation evidence, formatting-only blocker, Serena fallback, and unrelated working-tree risk.
