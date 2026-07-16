# Network Domain Governance Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `VerifiedDomain`, `DomainVerification`, `IpAllowList`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own verified and approved domains, domain verification, IP allow lists and network access boundaries.
- Evidence status: Partial; candidate boundary requires dedicated domain and IP-allow-list evidence before promotion.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `VerifiedDomain`
- `DomainVerification`
- `IpAllowList`

### Does not own

- Credential
- SAML or SCIM configuration
- generic authorization role
- Repository lifecycle

### Ubiquitous language

- Verified Domain
- Approved Domain
- IP allow list
- Network Boundary
- access origin

### Core invariants

- Domain ownership and network-origin decisions have independent verification and enforcement lifecycles.
- A network decision is an additional guard and cannot replace authentication or authorization.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude private networking used solely by Codespaces, Actions runners or source-code infrastructure.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `A6`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
