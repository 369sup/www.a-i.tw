# activity-feed bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Activity Feed`; subdomain: `activity-feed` (`supporting`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `prototype`; runtime evidence: `in-memory-prototype`.
- Owner: www.a-i.tw Product Team.
- Problem: Present recipient-scoped activity projections without owning source transactions.
- Evidence status: Partial; only the evidenced in-memory projection is Current.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `FeedItem`

### Does not own

- source Domain event
- Repository or Account lifecycle
- authorization grant
- Notification Inbox

### Ubiquitous language

- Feed Item
- Feed Candidate
- Recipient Feed
- ranking
- suppression

### Core invariants

- Feed items are visibility-filtered projections and never become source truth.
- Ranking cannot disclose an inaccessible source resource.

### Allowed dependencies

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude source-code contribution events and Code-derived reputation unless separately approved.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `ACT1`, `ACT2`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
