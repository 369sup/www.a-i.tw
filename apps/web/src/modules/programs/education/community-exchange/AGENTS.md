# Community Exchange Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `CommunityExchangeMembership`, `CommunityExchangeSubmission`, `DiscoveryListing`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own verified community participation, Repository submission references, discovery listings, collaborator requests and submission moderation.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `CommunityExchangeMembership`
- `CommunityExchangeSubmission`
- `DiscoveryListing`

### Does not own

- Repository content
- generic Search index
- Education Application
- source Account lifecycle

### Ubiquitous language

- Community Exchange Membership
- Repository Submission Reference
- Discovery Listing
- Collaborator Request
- Submission Moderation

### Core invariants

- A submission references a public Repository without taking ownership of its content.
- Discovery metadata and submission moderation remain program-specific rather than generic Search or Community Safety truth.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude submitted repository contents, commits, branches and contribution workflows.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `EDU6`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
