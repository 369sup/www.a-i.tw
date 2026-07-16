# Campus Experts Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `CampusExpertApplication`, `TrainingCohort`, `CampusExpertMembership`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own Campus Expert applications, training cohorts, progress, community impact proposals and membership status.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `CampusExpertApplication`
- `TrainingCohort`
- `CampusExpertMembership`

### Does not own

- Campus Program partnership
- generic Profile lifecycle
- Education benefit grant
- Community Exchange submission

### Ubiquitous language

- Campus Expert Application
- Training Cohort
- Training Progress
- Community Impact Proposal
- Membership

### Core invariants

- Campus Expert membership follows individual eligibility, application and training; it is not an institution partnership.
- A badge or profile presentation references membership but does not own it.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude training source code and repository contribution implementation.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `EDU5`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
