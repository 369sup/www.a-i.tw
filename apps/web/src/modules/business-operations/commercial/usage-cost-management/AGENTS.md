# Usage Cost Management Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `UsageRecord`, `Budget`, `CostCenter`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own metered usage, budgets, alerts, cost centers, allocations and spending projections independently of Organization membership.
- Evidence status: Partial; candidate boundary requires an approved included non-Code usage source.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `UsageRecord`
- `Budget`
- `CostCenter`

### Does not own

- payment method or invoice
- Organization membership
- resource lifecycle
- generic analytics

### Ubiquitous language

- Usage Record
- Metered Charge
- Budget
- Budget Alert
- Cost Center
- Cost Allocation

### Core invariants

- Cost-center membership is financial attribution, not organization participation.
- Budgets and alerts observe or constrain spend without becoming product authorization.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude usage generated solely by Actions, Packages, Codespaces, Copilot or code-security products.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `BILL3`, `BILL4`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
