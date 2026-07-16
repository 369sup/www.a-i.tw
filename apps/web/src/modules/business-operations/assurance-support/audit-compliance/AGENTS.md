# audit-compliance bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Audit`; subdomain: `audit` (`supporting`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `prototype`; runtime evidence: `in-memory-prototype`.
- Owner: www.a-i.tw Product Team.
- Problem: Preserve append-only administrative evidence without becoming a business event bus.
- Evidence status: Partial; current in-memory prototype does not prove durable retention or integrity.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `AuditEntry`

### Does not own

- source Aggregate lifecycle
- operational log
- Domain Event
- Webhook payload

### Ubiquitous language

- Audit Entry
- Actor
- Action
- Target
- Query
- Export
- Stream
- Retention

### Core invariants

- Audit records are append-only evidence and are not reused as source Domain events.
- Idempotent ingestion must preserve actor, scope, action and time without mutating the source Context.

### Allowed dependencies

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude raw source code, secrets and unrestricted payload copies from audit evidence.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `AU1`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
