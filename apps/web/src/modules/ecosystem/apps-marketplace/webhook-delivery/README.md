# Webhook Delivery

Lifecycle: `planned`

Own webhook subscriptions, endpoints, signing, delivery attempts, retry, redelivery and suspension lifecycle.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own webhook subscriptions, endpoints, signing, delivery attempts, retry, redelivery and suspension lifecycle.

This directory is the declared local ownership boundary for `WebhookSubscription`, `WebhookDelivery`, `DeliveryAttempt`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `WebhookSubscription`
- `WebhookDelivery`
- `DeliveryAttempt`

### Language and invariants

Ubiquitous language:

- Webhook Subscription
- Webhook Scope
- Delivery
- Attempt
- Redelivery
- Suspension

Required invariants:

- A delivery is derived from a subscription and source event; retries must be idempotent.
- Webhook failure cannot roll back the originating business transaction.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- source Domain event
- App Registration
- Notification delivery
- Repository aggregate

Exclude Actions workflow dispatch and source-code payload interpretation.

### Official evidence

- Evidence status: Partial; retry and redelivery invariants require a first-use-case evidence refresh.
- Evidence IDs: `W1`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
