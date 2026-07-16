# Social Curation: social-curation

Strategic subdomain `social-curation` (`supporting`); owner www.a-i.tw Product Team.

Owns the authenticated User's `RepositoryStar` relationship and `starredAt`. Repository identity, lifecycle,
visibility and access remain upstream; Watch, Notifications and Activity Feed are separate Contexts.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own authenticated User Repository star bookmark and interest relationships without owning Repository state, Watch subscriptions, notifications or activity feed.

This directory is the declared local ownership boundary for `RepositoryStar`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: An authenticated active User stars or unstars a Repository the User can read, then lists the User's own starred Repository references ordered by starredAt descending.

### Source of truth

- `RepositoryStar`

### Language and invariants

Ubiquitous language:

- Follow
- Star
- Star List
- interest signal

Required invariants:

- Star is an interest/bookmark relationship, not a Watch Subscription.
- Follow affects discovery and feed projection but grants no access.

### Collaboration

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Repository state
- Watch Subscription
- Notification
- Account membership

Exclude code contribution and source popularity signals that require Code analysis.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `ACT1`, `ACT2`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
