# Sponsorship Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `SponsoredProfile`, `Sponsorship`, `SponsorshipTier`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own sponsored profiles, sponsorship tiers, benefits, recurring or one-time sponsorships, eligibility and payout lifecycle.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `SponsoredProfile`
- `Sponsorship`
- `SponsorshipTier`

### Does not own

- ordinary product subscription
- Profile presentation
- Marketplace purchase
- general payment ledger

### Ubiquitous language

- Sponsored Profile
- Sponsorship
- Tier
- Benefit
- Payout
- Tax Information

### Core invariants

- One-time and recurring sponsorship are distinct from ordinary product entitlement.
- Payout and tax lifecycle belongs to sponsorship operations, while public profile presentation remains referenced.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude sponsor buttons or repository files as ownership evidence; they are presentation/integration surfaces.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `SP1`, `SP2`, `SP3`, `SP4`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
