# Social Curation / social-curation Context rules

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
- Problem: Own authenticated User Repository star bookmark and interest relationships without owning Repository state, Watch subscriptions, notifications or activity feed.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `RepositoryStar`

### Does not own

- Repository state
- Watch Subscription
- Notification
- Account membership

### Ubiquitous language

- Follow
- Star
- Star List
- interest signal

### Core invariants

- Star is an interest/bookmark relationship, not a Watch Subscription.
- Follow affects discovery and feed projection but grants no access.

### Allowed dependencies

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude code contribution and source popularity signals that require Code analysis.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `ACT1`, `ACT2`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
