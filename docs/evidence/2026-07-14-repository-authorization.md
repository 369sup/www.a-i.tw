# Authorization & Policy Repository access evidence

日期：2026-07-14  
狀態：Current in-memory runtime slice

## Approved semantics

- Owner: `collaboration/repository-work/repository-governance`.
- First use case: an authorized Repository administrator grants one predefined Repository Role to an eligible active
  Principal or an owner-Account Team, then the Context decides a requested non-Code action.
- Source of truth: `RepositoryRoleDefinition` and `RepositoryAccessGrant`.
- Repository Account ownership is an upstream fact and is never stored as a collaborator grant.
- Resource state, Principal status, Account Membership and Team Membership are consumed facts, not duplicated
  aggregates.

GitHub defines the predefined organization Repository Roles as Read, Triage, Write, Maintain and Admin, and assigns
roles independently to people and teams:

- <https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization>
- <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository>

The first non-Code permission mapping retains only evidenced actions: Read covers viewing, opening Issues and normal
Issue participation; Triage covers Issue triage; Write covers Label management; Admin covers Repository rename,
visibility, archive and access management. Code, Pull Request, Actions, package and security permissions remain
excluded.

## Runtime boundaries

- Domain owns Role validation, Access Grant construction, role ordering and fail-closed decisions.
- Application owns grant eligibility and decision orchestration through Identity and Account Ports.
- Authorization adapters consume only `IdentityDirectoryApiV1` and `AccountDirectoryApiV1`.
- Repository consumes only `AuthorizationPolicyApiV1` through `RepositoryAuthorizationAdapter`.
- Repository's Issues participation contract remains a compatibility facade and does not expose grants.

## Explicit exclusions

Custom Repository Roles, organization base permission, outside-collaborator lifecycle, Enterprise Role assignment,
durable persistence, revocation history and general policy administration require separate evidence and gates.

## Verification

- Authorization／Repository／Issues focused tests: 9 files, 21 tests passed.
- Complete web tests: 34 files, 81 tests passed.
- Web typecheck: passed.
- Web lint: passed with one pre-existing Projects warning and no errors.
- Architecture check: passed with 37 tests and zero dependency violations.
- Documentation checks: passed.
- Next.js 16.2.10 production build: passed.
- Chromium governance E2E: 3 tests passed.
- Semgrep: 298 targets, zero findings.
- `git diff --check`: passed.
- Repository-wide `pnpm check`: formatting phase remains blocked only by the pre-existing
  `.codex/agents/README.md` and `.codex/prompts/README.md` differences; scoped web check and formatting passed.
