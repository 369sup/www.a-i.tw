# Governance Policy: policy-governance

Strategic subdomain `policy-governance` (`core`); owner www.a-i.tw Product Team.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Enterprise policy constraints and delegation independently of administrative role assignment.

This directory is the declared local ownership boundary for `RepositoryVisibilityPolicy`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Set and resolve the effective Repository visibility policy for an affiliated Organization.

### Source of truth

- `RepositoryVisibilityPolicy`

### Language and invariants

Ubiquitous language:

- Policy
- Policy Assignment
- delegation
- constraint
- effective policy

Required invariants:

- Policy answers whether governance permits or delegates an operation; it does not prove actor authority.
- A policy target must use an owned reference and cannot directly mutate the governed Context.

### Collaboration

- Consumes from `enterprise-account` through `EnterpriseAccountDirectoryApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Administrative Role Assignment
- resource lifecycle
- commercial entitlement
- authentication decision

Exclude branch, tag, push and other code-centric ruleset semantics.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `A5`, `A6`, `R6`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
