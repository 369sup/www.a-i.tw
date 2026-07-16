# Plan Entitlement Licensing Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `Plan`, `FeatureEntitlement`, `License`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own product plans, feature entitlements, licenses, seats, trials and entitlement decisions independently of resource authorization.
- Evidence status: Partial; candidate catalog and entitlement split requires an approved non-Code first use case.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `Plan`
- `FeatureEntitlement`
- `License`

### Does not own

- Actor authorization
- payment transaction
- usage charge
- Support Ticket

### Ubiquitous language

- Product Catalog
- Plan
- SKU
- Entitlement
- License
- Seat
- Trial

### Core invariants

- Entitlement answers whether a product capability is available; it never grants resource authority.
- License assignment references eligible Accounts, Users or Teams without owning their participation.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude product definitions whose only purpose is Actions, Packages, Codespaces, Copilot or code security.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `BILL1`, `BILL2`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
