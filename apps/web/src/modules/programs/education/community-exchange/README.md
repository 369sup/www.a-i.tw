# Community Exchange

Lifecycle: `planned`

Own verified community participation, Repository submission references, discovery listings, collaborator requests and submission moderation.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own verified community participation, Repository submission references, discovery listings, collaborator requests and submission moderation.

This directory is the declared local ownership boundary for `CommunityExchangeMembership`, `CommunityExchangeSubmission`, `DiscoveryListing`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `CommunityExchangeMembership`
- `CommunityExchangeSubmission`
- `DiscoveryListing`

### Language and invariants

Ubiquitous language:

- Community Exchange Membership
- Repository Submission Reference
- Discovery Listing
- Collaborator Request
- Submission Moderation

Required invariants:

- A submission references a public Repository without taking ownership of its content.
- Discovery metadata and submission moderation remain program-specific rather than generic Search or Community Safety truth.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Repository content
- generic Search index
- Education Application
- source Account lifecycle

Exclude submitted repository contents, commits, branches and contribution workflows.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `EDU6`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
