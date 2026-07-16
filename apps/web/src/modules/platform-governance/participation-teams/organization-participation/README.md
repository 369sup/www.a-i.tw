# Account Participation: organization-participation

Strategic subdomain `organization-participation` (`core`); owner www.a-i.tw Product Team.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Organization membership, invitations and Team participation without owning Organization identity.

This directory is the declared local ownership boundary for `OrganizationMembership`, `OrganizationInvitation`, `OrganizationTeam`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Provision the founding Organization owner and manage Organization membership and Team participation.

### Source of truth

- `OrganizationMembership`
- `OrganizationInvitation`
- `OrganizationTeam`

### Language and invariants

Ubiquitous language:

- Organization Membership
- Invitation
- Outside Collaborator
- Organization Team
- Team Maintainer

Required invariants:

- Organization Team members must remain eligible Organization participants.
- Organization Team hierarchy and maintainership must not be reused for Enterprise Teams.

### Collaboration

- Consumes from `organization-account` through `OrganizationAccountDirectoryApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Organization Account lifecycle
- Enterprise Team
- Repository Role
- administrative permission definition

Exclude code-review assignment and source-code contribution eligibility.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `A2`, `A3`, `A4`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
