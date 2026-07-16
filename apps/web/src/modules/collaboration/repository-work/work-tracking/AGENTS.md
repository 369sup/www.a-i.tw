# work-tracking bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Issues`; subdomain: `issues` (`core`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Track repository-scoped work with Issue identity, lifecycle, labels, assignment and collaboration relationships.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `Issue`
- `Label`
- `IssueComment`
- `Milestone`
- `IssueDependency`

### Does not own

- Repository lifecycle
- Project Item or Project field
- Notification
- Pull Request

### Ubiquitous language

- Issue
- Issue Number
- Issue Type
- Issue Field
- Label
- Milestone
- Sub-issue
- Dependency

### Core invariants

- Issue Number is unique only within a Repository scope.
- Project references never transfer Issue truth; Organization Issue Fields remain distinct from Project custom fields.

### Allowed dependencies

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).
- Consumes from `community-safety` through `CommunitySafetyApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude Pull Requests, code review, commit references that require Code semantics and code-scanning issues.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `I1`, `I2`, `I3`, `I4`, `I5`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
