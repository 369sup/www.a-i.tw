# Campus Experts

Lifecycle: `planned`

Own Campus Expert applications, training cohorts, progress, community impact proposals and membership status.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Campus Expert applications, training cohorts, progress, community impact proposals and membership status.

This directory is the declared local ownership boundary for `CampusExpertApplication`, `TrainingCohort`, `CampusExpertMembership`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `CampusExpertApplication`
- `TrainingCohort`
- `CampusExpertMembership`

### Language and invariants

Ubiquitous language:

- Campus Expert Application
- Training Cohort
- Training Progress
- Community Impact Proposal
- Membership

Required invariants:

- Campus Expert membership follows individual eligibility, application and training; it is not an institution partnership.
- A badge or profile presentation references membership but does not own it.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Campus Program partnership
- generic Profile lifecycle
- Education benefit grant
- Community Exchange submission

Exclude training source code and repository contribution implementation.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `EDU5`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
