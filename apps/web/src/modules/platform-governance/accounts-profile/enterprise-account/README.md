# Enterprise Account

Context `enterprise-account`; core subdomain; owner www.a-i.tw Product Team.

Problem: Own Enterprise Account identity, lifecycle, and Organization affiliations without owning Organization resources, administrative roles, or policy constraints.

## First approved use case

Create an Enterprise Account and affiliate one active Organization Account.

- Success: persist Enterprise identity and an affiliation fact with its timestamp.
- Failures: invalid Enterprise identity/name, missing or inactive Organization, missing Enterprise, or an Organization
  already affiliated with another Enterprise.
- Idempotency: affiliating the same Organization with the same Enterprise is a no-op.
- Source of truth: `Enterprise` and `EnterpriseOrganizationAffiliation`.

Enterprise Accounts govern Organizations but do not directly own their repositories or projects. Administrative roles
belong to `administrative-access-control`; enforceable constraints belong to `policy-governance`.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Enterprise Account identity, lifecycle, and Organization affiliations without owning Organization resources, administrative roles, or policy constraints.

This directory is the declared local ownership boundary for `Enterprise`, `EnterpriseOrganizationAffiliation`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Create an Enterprise Account and affiliate one active Organization Account.

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
