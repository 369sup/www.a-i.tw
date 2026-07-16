# audit-compliance

- Domain: Audit
- Subdomain: audit (supporting)
- Owner: www.a-i.tw Product Team

Before adding behavior, document the aggregate boundary, first use case, input
and output contract, outbound ports, and Context Map relationships.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Preserve append-only administrative evidence without becoming a business event bus.

This directory is the declared local ownership boundary for `AuditEntry`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `prototype`.
- Runtime evidence: `in-memory-prototype`.
- Principal use case: Append and query an in-memory Audit Entry.

### Source of truth

- `AuditEntry`

### Language and invariants

Ubiquitous language:

- Audit Entry
- Actor
- Action
- Target
- Query
- Export
- Stream
- Retention

Required invariants:

- Audit records are append-only evidence and are not reused as source Domain events.
- Idempotent ingestion must preserve actor, scope, action and time without mutating the source Context.

### Collaboration

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- source Aggregate lifecycle
- operational log
- Domain Event
- Webhook payload

Exclude raw source code, secrets and unrestricted payload copies from audit evidence.

### Official evidence

- Evidence status: Partial; current in-memory prototype does not prove durable retention or integrity.
- Evidence IDs: `AU1`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
