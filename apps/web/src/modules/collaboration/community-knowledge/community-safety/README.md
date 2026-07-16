# Community Safety: community-safety

Strategic subdomain `community-safety` (`supporting`); owner www.a-i.tw Product Team.

The Current first slice owns a one-day Repository `collaborators_only` Interaction Limit and its fail-closed decisions
for opening Issues and adding Issue or Discussion comments. Repository and Authorization remain the source of access,
visibility and lifecycle facts; source content remains in Issues and Discussions.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own temporary Repository interaction-limit rules and fail-closed non-Code interaction decisions without owning source content or access grants.

This directory is the declared local ownership boundary for `RepositoryInteractionLimit`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Activate and remove a one-day collaborators_only Interaction Limit for a public Repository and decide Issue or Discussion interactions from authoritative Repository access facts.

### Source of truth

- `RepositoryInteractionLimit`

### Language and invariants

Ubiquitous language:

- Content Report
- Moderation Case
- Interaction Limit
- Conversation Lock
- Hide
- Redaction

Required invariants:

- Moderation references content without becoming its owner.
- A moderation outcome must remain auditable and must not silently rewrite source aggregates.

### Collaboration

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).
- Publishes to `work-tracking` through `CommunitySafetyApiV1` (synchronous, current).
- Publishes to `discussions` through `CommunitySafetyApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- source Discussion or Issue truth
- administrative role
- Account lifecycle
- Notification

Exclude code-review moderation and source-code security enforcement.

### Official evidence

- Evidence status: Partial; cross-content moderation transitions remain evidence-gated.
- Evidence IDs: `D2`, `A4`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
