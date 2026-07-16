# Billing Payments

Lifecycle: `planned`

Own billing accounts, cycles, payment methods, invoices, receipts, taxes, discounts and payment failure lifecycle.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own billing accounts, cycles, payment methods, invoices, receipts, taxes, discounts and payment failure lifecycle.

This directory is the declared local ownership boundary for `BillingAccount`, `Invoice`, `PaymentMethod`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `BillingAccount`
- `Invoice`
- `PaymentMethod`

### Language and invariants

Ubiquitous language:

- Billing Account
- Billing Cycle
- Payment Method
- Invoice
- Receipt
- Plan Change
- Payment Failure

Required invariants:

- Core plan billing remains distinct from paid Marketplace apps and usage-based charges.
- Payment failure cannot directly revoke domain resources; entitlement changes require an explicit downstream process.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Product entitlement
- metered usage allocation
- Marketplace listing
- Sponsorship relationship

Exclude billing models dedicated solely to Code products from the initial non-Code slice.

### Official evidence

- Evidence status: Partial; candidate boundary requires a non-Code billing first use case.
- Evidence IDs: `BILL1`, `BILL2`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
