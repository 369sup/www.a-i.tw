# Usage Cost Management

Lifecycle: `planned`

Own metered usage, budgets, alerts, cost centers, allocations and spending projections independently of Organization membership.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own metered usage, budgets, alerts, cost centers, allocations and spending projections independently of Organization membership.

This directory is the declared local ownership boundary for `UsageRecord`, `Budget`, `CostCenter`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `UsageRecord`
- `Budget`
- `CostCenter`

### Language and invariants

Ubiquitous language:

- Usage Record
- Metered Charge
- Budget
- Budget Alert
- Cost Center
- Cost Allocation

Required invariants:

- Cost-center membership is financial attribution, not organization participation.
- Budgets and alerts observe or constrain spend without becoming product authorization.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- payment method or invoice
- Organization membership
- resource lifecycle
- generic analytics

Exclude usage generated solely by Actions, Packages, Codespaces, Copilot or code-security products.

### Official evidence

- Evidence status: Partial; candidate boundary requires an approved included non-Code usage source.
- Evidence IDs: `BILL3`, `BILL4`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
