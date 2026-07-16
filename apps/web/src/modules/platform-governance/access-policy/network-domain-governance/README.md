# Network Domain Governance

Lifecycle: `planned`

Own verified and approved domains, domain verification, IP allow lists and network access boundaries.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own verified and approved domains, domain verification, IP allow lists and network access boundaries.

This directory is the declared local ownership boundary for `VerifiedDomain`, `DomainVerification`, `IpAllowList`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `VerifiedDomain`
- `DomainVerification`
- `IpAllowList`

### Language and invariants

Ubiquitous language:

- Verified Domain
- Approved Domain
- IP allow list
- Network Boundary
- access origin

Required invariants:

- Domain ownership and network-origin decisions have independent verification and enforcement lifecycles.
- A network decision is an additional guard and cannot replace authentication or authorization.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Credential
- SAML or SCIM configuration
- generic authorization role
- Repository lifecycle

Exclude private networking used solely by Codespaces, Actions runners or source-code infrastructure.

### Official evidence

- Evidence status: Partial; candidate boundary requires dedicated domain and IP-allow-list evidence before promotion.
- Evidence IDs: `A6`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
