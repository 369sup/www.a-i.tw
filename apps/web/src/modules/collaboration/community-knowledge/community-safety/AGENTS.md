# Community Safety / community-safety Context rules

Owner: www.a-i.tw Product Team. Follow the fixed capability-oriented Domain, Application, Contracts, Adapters, Composition and Tests
topology. Cross-Context consumers may import only `contracts/<version>/public.ts`; Domain and Application never import
another Context.

The directory ownership and pattern rules in the parent `apps/web/src/modules/AGENTS.md` are mandatory. Domain code is
grouped by the declared capability; commands and queries use one named directory containing their message and handler.

Temporary, prototype, scaffolded, migration, and test-only status never waive the fixed topology, dependency direction,
manifest, Published Language, architecture check, or CI gate.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Own temporary Repository interaction-limit rules and fail-closed non-Code interaction decisions without owning source content or access grants.
- Evidence status: Partial; cross-content moderation transitions remain evidence-gated.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `RepositoryInteractionLimit`

### Does not own

- source Discussion or Issue truth
- administrative role
- Account lifecycle
- Notification

### Ubiquitous language

- Content Report
- Moderation Case
- Interaction Limit
- Conversation Lock
- Hide
- Redaction

### Core invariants

- Moderation references content without becoming its owner.
- A moderation outcome must remain auditable and must not silently rewrite source aggregates.

### Allowed dependencies

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).
- Publishes to `work-tracking` through `CommunitySafetyApiV1` (synchronous, current).
- Publishes to `discussions` through `CommunitySafetyApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude code-review moderation and source-code security enforcement.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `D2`, `A4`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
