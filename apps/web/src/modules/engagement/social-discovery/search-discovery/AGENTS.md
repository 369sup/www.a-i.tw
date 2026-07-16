# Search bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Search & Discovery`; subdomain: `search` (`supporting`).
- Owns viewer-scoped `SearchDocumentProjection` index snapshots and Search Query semantics.
- Search Result is an Application DTO, never source truth or an Aggregate.
- Source Contexts remain authoritative for Account, Repository, Issue, Project and Discussion facts.
- A viewer snapshot may contain only resources already visible to that authenticated viewer; a Search query must never
  broaden access.
- The current in-memory slice supports navigation suggestions only. Qualifiers, ranking, pagination, saved searches and
  asynchronous indexing require separate approval.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Index and retrieve non-code resource projections without becoming their source of truth.
- Evidence status: Partial; saved-search and universal qualifier semantics remain unconfirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `SearchDocumentProjection`

### Does not own

- indexed source aggregate
- authorization grant
- Repository or Issue lifecycle
- Code Search

### Ubiquitous language

- Search Document
- Search Query
- Qualifier
- Filter
- Result Set
- ranking

### Core invariants

- Search owns only access-filtered projections and checkpoints.
- Index freshness may affect discovery but cannot be a synchronous command correctness barrier.

### Allowed dependencies

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude Code Search, symbol navigation and source-content indexing.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `S1`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
