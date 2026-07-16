# Knowledge Wiki / repository-wiki Context rules

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
- Problem: Own Repository-scoped Wiki and Wiki Page identity, title, content and publication semantics without owning Repository lifecycle, access grants or Git-backed storage.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `Wiki`
- `WikiPage`

### Does not own

- Repository lifecycle
- Repository file
- Issue or Discussion comment
- generic Search index

### Ubiquitous language

- Wiki
- Wiki Page
- Page Revision
- Sidebar
- Footer
- publication state

### Core invariants

- Wiki is Repository-scoped knowledge, while its pages remain a separate content lifecycle.
- Git-backed persistence is an adapter detail and cannot introduce Git objects into the Domain model.

### Allowed dependencies

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude repository source files and all Git implementation details behind Wiki storage.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `K1`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
