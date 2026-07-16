# Marketplace Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `MarketplaceListing`, `PublisherVerification`, `MarketplacePurchase`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own publisher verification, listings, pricing, publication, purchases, trials, plan changes and marketplace transactions.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `MarketplaceListing`
- `PublisherVerification`
- `MarketplacePurchase`

### Does not own

- App registration or installation
- general billing account
- Webhook transport
- seller source code

### Ubiquitous language

- Publisher
- Listing
- Listing Review
- Pricing Plan
- Purchase
- Free Trial
- Plan Change
- Cancellation

### Core invariants

- Publisher/listing lifecycle is distinct from buyer subscription lifecycle.
- A Marketplace purchase references an App and billing capability without taking ownership of either.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude Actions listings and any inspection or execution of integration source code.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `MKT1`, `MKT2`, `MKT3`, `MKT4`, `MKT5`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
