# Sponsorship

Lifecycle: `planned`

Own sponsored profiles, sponsorship tiers, benefits, recurring or one-time sponsorships, eligibility and payout lifecycle.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own sponsored profiles, sponsorship tiers, benefits, recurring or one-time sponsorships, eligibility and payout lifecycle.

This directory is the declared local ownership boundary for `SponsoredProfile`, `Sponsorship`, `SponsorshipTier`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `SponsoredProfile`
- `Sponsorship`
- `SponsorshipTier`

### Language and invariants

Ubiquitous language:

- Sponsored Profile
- Sponsorship
- Tier
- Benefit
- Payout
- Tax Information

Required invariants:

- One-time and recurring sponsorship are distinct from ordinary product entitlement.
- Payout and tax lifecycle belongs to sponsorship operations, while public profile presentation remains referenced.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- ordinary product subscription
- Profile presentation
- Marketplace purchase
- general payment ledger

Exclude sponsor buttons or repository files as ownership evidence; they are presentation/integration surfaces.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `SP1`, `SP2`, `SP3`, `SP4`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
