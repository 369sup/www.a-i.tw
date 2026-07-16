# Enterprise Governance

Context `enterprise-account`; primary subdomain `enterprise-account` (`core`); owner www.a-i.tw Product Team.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Govern multiple Organizations with Enterprise-scoped affiliations and enforceable policy constraints without owning their resources.

This directory is the declared local ownership boundary for `Enterprise`, `EnterpriseOrganizationAffiliation`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Affiliate an Organization and restrict Public Repository creation and visibility changes.

### Source of truth

- `Enterprise`
- `EnterpriseOrganizationAffiliation`

### Language and invariants

Ubiquitous language:

- Enterprise Account
- enterprise slug
- Organization affiliation
- administrative boundary

Required invariants:

- An Enterprise governs affiliated Organizations but does not directly own their Repositories or Projects.
- Organization affiliation is not Organization membership.

### Collaboration

- Consumes from `organization-account` through `OrganizationAccountDirectoryApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Repository, Project or Discussion
- Organization membership
- resource-specific role
- billing transaction

Exclude enterprise code-security, Actions and repository-content administration.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `A1`, `A5`, `A6`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
