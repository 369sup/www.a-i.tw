# Billing Payments Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `BillingAccount`, `Invoice`, `PaymentMethod`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own billing accounts, cycles, payment methods, invoices, receipts, taxes, discounts and payment failure lifecycle.
- Evidence status: Partial; candidate boundary requires a non-Code billing first use case.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `BillingAccount`
- `Invoice`
- `PaymentMethod`

### Does not own

- Product entitlement
- metered usage allocation
- Marketplace listing
- Sponsorship relationship

### Ubiquitous language

- Billing Account
- Billing Cycle
- Payment Method
- Invoice
- Receipt
- Plan Change
- Payment Failure

### Core invariants

- Core plan billing remains distinct from paid Marketplace apps and usage-based charges.
- Payment failure cannot directly revoke domain resources; entitlement changes require an explicit downstream process.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude billing models dedicated solely to Code products from the initial non-Code slice.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `BILL1`, `BILL2`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
