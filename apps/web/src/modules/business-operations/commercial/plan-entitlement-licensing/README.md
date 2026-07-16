# Plan Entitlement Licensing

Lifecycle: `planned`

Own product plans, feature entitlements, licenses, seats, trials and entitlement decisions independently of resource authorization.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own product plans, feature entitlements, licenses, seats, trials and entitlement decisions independently of resource authorization.

This directory is the declared local ownership boundary for `Plan`, `FeatureEntitlement`, `License`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `Plan`
- `FeatureEntitlement`
- `License`

### Language and invariants

Ubiquitous language:

- Product Catalog
- Plan
- SKU
- Entitlement
- License
- Seat
- Trial

Required invariants:

- Entitlement answers whether a product capability is available; it never grants resource authority.
- License assignment references eligible Accounts, Users or Teams without owning their participation.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Actor authorization
- payment transaction
- usage charge
- Support Ticket

Exclude product definitions whose only purpose is Actions, Packages, Codespaces, Copilot or code security.

### Official evidence

- Evidence status: Partial; candidate catalog and entitlement split requires an approved non-Code first use case.
- Evidence IDs: `BILL1`, `BILL2`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
