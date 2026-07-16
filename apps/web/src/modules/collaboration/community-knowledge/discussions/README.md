# discussions

- Domain: Discussions
- Subdomain: discussions (core)
- Owner: www.a-i.tw Product Team

The current in-memory slice owns Repository-scoped Q&A Categories, Discussions,
Comments and accepted Answer references. It consumes Repository participation
through a Discussions-owned Port and ACL; Category administration, moderation,
polls, announcements, durable persistence and downstream projections remain out
of scope.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Host repository-scoped community questions and answers distinct from Issue work state.

This directory is the declared local ownership boundary for `DiscussionCategory`, `Discussion`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Create a Repository Q&A Discussion, add a Comment, and let the author or an eligible triager mark that Comment as the accepted answer.

### Source of truth

- `DiscussionCategory`
- `Discussion`

### Language and invariants

Ubiquitous language:

- Discussion
- Category
- Question
- Answer
- Announcement
- Poll
- Comment
- Reaction

Required invariants:

- Discussion scope is Repository or Organization and determines its category set.
- Only Q&A semantics can accept an answer; Discussion comments are not Issue comments.

### Collaboration

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).
- Consumes from `community-safety` through `CommunitySafetyApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Issue
- Wiki Page
- Notification delivery
- Moderation case

Exclude Pull Request review conversations and code-line comments.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `D1`, `D2`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
