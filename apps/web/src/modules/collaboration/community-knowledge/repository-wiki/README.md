# Knowledge Wiki: repository-wiki

Strategic subdomain `repository-wiki` (`supporting`); owner www.a-i.tw Product Team.

Owns Repository-scoped `Wiki` and `WikiPage` identity, title/content invariants and publication state. Repository owns
existence, lifecycle and Wiki feature availability; Authorization & Policy owns Roles and Access Grants. Git-backed
storage, source files, revisions, search and notifications are outside this Context.

The current in-memory slice lets an active Principal with Repository `write` access create the first uniquely titled,
non-empty Page in an enabled active Repository Wiki, then read it through a Knowledge-owned query. The Context consumes
`RepositoryParticipationApiV1` only through its own outbound Port and ACL.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Repository-scoped Wiki and Wiki Page identity, title, content and publication semantics without owning Repository lifecycle, access grants or Git-backed storage.

This directory is the declared local ownership boundary for `Wiki`, `WikiPage`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: In an enabled active Repository Wiki, an authenticated actor with Repository write access creates the first uniquely titled non-empty Wiki Page and reads it through a Knowledge-owned query.

### Source of truth

- `Wiki`
- `WikiPage`

### Language and invariants

Ubiquitous language:

- Wiki
- Wiki Page
- Page Revision
- Sidebar
- Footer
- publication state

Required invariants:

- Wiki is Repository-scoped knowledge, while its pages remain a separate content lifecycle.
- Git-backed persistence is an adapter detail and cannot introduce Git objects into the Domain model.

### Collaboration

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Repository lifecycle
- Repository file
- Issue or Discussion comment
- generic Search index

Exclude repository source files and all Git implementation details behind Wiki storage.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `K1`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
