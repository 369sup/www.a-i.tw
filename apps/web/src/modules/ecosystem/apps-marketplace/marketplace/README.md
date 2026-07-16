# Marketplace

Lifecycle: `planned`

Own publisher verification, listings, pricing, publication, purchases, trials, plan changes and marketplace transactions.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own publisher verification, listings, pricing, publication, purchases, trials, plan changes and marketplace transactions.

This directory is the declared local ownership boundary for `MarketplaceListing`, `PublisherVerification`, `MarketplacePurchase`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `MarketplaceListing`
- `PublisherVerification`
- `MarketplacePurchase`

### Language and invariants

Ubiquitous language:

- Publisher
- Listing
- Listing Review
- Pricing Plan
- Purchase
- Free Trial
- Plan Change
- Cancellation

Required invariants:

- Publisher/listing lifecycle is distinct from buyer subscription lifecycle.
- A Marketplace purchase references an App and billing capability without taking ownership of either.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- App registration or installation
- general billing account
- Webhook transport
- seller source code

Exclude Actions listings and any inspection or execution of integration source code.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `MKT1`, `MKT2`, `MKT3`, `MKT4`, `MKT5`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
