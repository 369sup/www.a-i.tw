# discussions bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Discussions`; subdomain: `discussions` (`core`).
- Keep Published Language deliberately empty until a peer consumer requires it;
  app composition uses the Context composition entrypoint.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.
- Discussion Category, Discussion, Comment and accepted Answer invariants are
  owned here. Repository participation enters only through the local Port and
  outbound ACL; do not import Repository or Authorization internals.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Host repository-scoped community questions and answers distinct from Issue work state.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `DiscussionCategory`
- `Discussion`

### Does not own

- Issue
- Wiki Page
- Notification delivery
- Moderation case

### Ubiquitous language

- Discussion
- Category
- Question
- Answer
- Announcement
- Poll
- Comment
- Reaction

### Core invariants

- Discussion scope is Repository or Organization and determines its category set.
- Only Q&A semantics can accept an answer; Discussion comments are not Issue comments.

### Allowed dependencies

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).
- Consumes from `community-safety` through `CommunitySafetyApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude Pull Request review conversations and code-line comments.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `D1`, `D2`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
