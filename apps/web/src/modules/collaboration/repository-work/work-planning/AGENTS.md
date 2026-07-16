# work-planning bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Projects`; subdomain: `projects` (`core`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Plan external work-item references without taking ownership of Issue truth.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `Project`
- `ProjectItem`
- `DraftItem`

### Does not own

- Issue lifecycle
- Repository ownership
- Organization membership
- generic analytics

### Ubiquitous language

- Project
- Project Item
- Draft Issue
- Project Field
- View
- Workflow
- Template
- Status Update

### Core invariants

- Projects are owned by User Accounts or Organizations, not by Repositories.
- An Issue-backed Project Item is a reference; removing it cannot delete the Issue.

### Allowed dependencies

- Consumes from `user-account` through `PersonalAccountDirectoryApiV1` (synchronous, current).
- Consumes from `organization-participation` through `OrganizationParticipationApiV1` (synchronous, current).
- Consumes from `work-tracking` through `IssueDirectoryApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude Pull Request items and automation whose correctness depends on Actions or source-code state.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `P1`, `I5`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
