# Administrative Authority: administrative-access-control

Strategic subdomain `administrative-access-control` (`supporting`); owner www.a-i.tw Product Team.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Enterprise and Organization administrative role assignments independently of resource authorization.

This directory is the declared local ownership boundary for `EnterpriseOwnerAssignment`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Assign and verify the founding Enterprise owner authority.

### Source of truth

- `EnterpriseOwnerAssignment`

### Language and invariants

Ubiquitous language:

- Administrative Role
- Administrative Permission
- Role Assignment
- delegated authority

Required invariants:

- Administrative authority is scope-bound; equal role labels in different scopes are not interchangeable.
- Repository, Project, App and Marketplace actions remain owned by their resource Contexts.

### Collaboration

- Consumes from `enterprise-account` through `EnterpriseAccountDirectoryApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Authentication
- resource-specific actions or roles
- Enterprise policy
- commercial entitlement

Exclude source-code review, branch protection and code-security permissions.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `A4`, `A5`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
