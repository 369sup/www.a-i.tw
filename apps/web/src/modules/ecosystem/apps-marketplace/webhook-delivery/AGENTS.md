# Webhook Delivery Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `WebhookSubscription`, `WebhookDelivery`, `DeliveryAttempt`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own webhook subscriptions, endpoints, signing, delivery attempts, retry, redelivery and suspension lifecycle.
- Evidence status: Partial; retry and redelivery invariants require a first-use-case evidence refresh.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `WebhookSubscription`
- `WebhookDelivery`
- `DeliveryAttempt`

### Does not own

- source Domain event
- App Registration
- Notification delivery
- Repository aggregate

### Ubiquitous language

- Webhook Subscription
- Webhook Scope
- Delivery
- Attempt
- Redelivery
- Suspension

### Core invariants

- A delivery is derived from a subscription and source event; retries must be idempotent.
- Webhook failure cannot roll back the originating business transaction.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude Actions workflow dispatch and source-code payload interpretation.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `W1`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
