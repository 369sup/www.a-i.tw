# Latest Checkpoint

GitHub non-code target is documented as 19 logical Contexts without treating unimplemented targets as runtime. Approved app-local Contexts are Identity & Access, Account, Enterprise Governance, Repository, Issues and Projects. Prototype Contexts remain explicitly marked.

Latest slice:
- Enterprise, owner assignment, Organization affiliation and Repository visibility policy.
- Account eligibility -> Enterprise consumer ACL.
- Enterprise constraints -> Repository consumer ACL.
- Repository remains final authorization owner.
- Context generator now requires problem, first use case, source of truth and runtime evidence.

Verification:
- Web typecheck passed.
- Web tests: 24 files passed, 1 skipped; 38 tests passed, 1 todo.
- Docs checks passed.
- Architecture checks passed: 13 tests, 257 modules, 432 dependencies, no violations.
- Next.js 16.2.10 build passed.
- Repository-wide check remains blocked by 213 pre-existing Prettier files.
- Semgrep is unavailable because the Windows host lacks the executable and the script is POSIX-only.

Canonical status: `docs/status/2026-07-12-github-ddd-alignment.md`
Last verified: 2026-07-12