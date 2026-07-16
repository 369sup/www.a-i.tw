# search-discovery

- Domain: Search & Discovery
- Subdomain: search (supporting)
- Owner: www.a-i.tw Product Team

The Current in-memory slice builds an authenticated viewer's access-filtered `SearchDocumentProjection` snapshot and
queries it for command-palette navigation. Search owns neither the indexed resources nor authorization. Result Sets are
derived Application output, not source truth.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Index and retrieve non-code resource projections without becoming their source of truth.

This directory is the declared local ownership boundary for `SearchDocumentProjection`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Query visibility-filtered product resources from the authenticated command palette.

### Source of truth

- `SearchDocumentProjection`

### Language and invariants

Ubiquitous language:

- Search Document
- Search Query
- Qualifier
- Filter
- Result Set
- ranking

Required invariants:

- Search owns only access-filtered projections and checkpoints.
- Index freshness may affect discovery but cannot be a synchronous command correctness barrier.

### Collaboration

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- indexed source aggregate
- authorization grant
- Repository or Issue lifecycle
- Code Search

Exclude Code Search, symbol navigation and source-content indexing.

### Official evidence

- Evidence status: Partial; saved-search and universal qualifier semantics remain unconfirmed.
- Evidence IDs: `S1`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
