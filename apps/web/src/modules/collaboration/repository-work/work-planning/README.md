# work-planning

- Domain: Projects
- Subdomain: projects (core)
- Owner: www.a-i.tw Product Team

Before adding behavior, document the aggregate boundary, first use case, input
and output contract, outbound ports, and Context Map relationships.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Plan external work-item references without taking ownership of Issue truth.

This directory is the declared local ownership boundary for `Project`, `ProjectItem`, `DraftItem`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Add an existing Issue reference to an account-owned Project.

### Source of truth

- `Project`
- `ProjectItem`
- `DraftItem`

### Language and invariants

Ubiquitous language:

- Project
- Project Item
- Draft Issue
- Project Field
- View
- Workflow
- Template
- Status Update

Required invariants:

- Projects are owned by User Accounts or Organizations, not by Repositories.
- An Issue-backed Project Item is a reference; removing it cannot delete the Issue.

### Collaboration

- Consumes from `user-account` through `PersonalAccountDirectoryApiV1` (synchronous, current).
- Consumes from `organization-participation` through `OrganizationParticipationApiV1` (synchronous, current).
- Consumes from `work-tracking` through `IssueDirectoryApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Issue lifecycle
- Repository ownership
- Organization membership
- generic analytics

Exclude Pull Request items and automation whose correctness depends on Actions or source-code state.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `P1`, `I5`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
