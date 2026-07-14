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
