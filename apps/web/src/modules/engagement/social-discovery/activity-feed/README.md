# activity-feed

- Domain: Activity Feed
- Subdomain: activity-feed (supporting)
- Owner: www.a-i.tw Product Team

Before adding behavior, document the aggregate boundary, first use case, input
and output contract, outbound ports, and Context Map relationships.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Present recipient-scoped activity projections without owning source transactions.

This directory is the declared local ownership boundary for `FeedItem`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `prototype`.
- Runtime evidence: `in-memory-prototype`.
- Principal use case: Append and list an in-memory Feed Item for a recipient.

### Source of truth

- `FeedItem`

### Language and invariants

Ubiquitous language:

- Feed Item
- Feed Candidate
- Recipient Feed
- ranking
- suppression

Required invariants:

- Feed items are visibility-filtered projections and never become source truth.
- Ranking cannot disclose an inaccessible source resource.

### Collaboration

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- source Domain event
- Repository or Account lifecycle
- authorization grant
- Notification Inbox

Exclude source-code contribution events and Code-derived reputation unless separately approved.

### Official evidence

- Evidence status: Partial; only the evidenced in-memory projection is Current.
- Evidence IDs: `ACT1`, `ACT2`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
