# Campus Program

Lifecycle: `planned`

Own institution-level Campus Program applications, agreements, partnerships, benefits, renewal and program status.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own institution-level Campus Program applications, agreements, partnerships, benefits, renewal and program status.

This directory is the declared local ownership boundary for `CampusProgramApplication`, `CampusPartnership`, `InstitutionBenefit`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `CampusProgramApplication`
- `CampusPartnership`
- `InstitutionBenefit`

### Language and invariants

Ubiquitous language:

- Educational Institution
- Campus Partnership
- Program Agreement
- Institution Benefit
- Annual Renewal

Required invariants:

- Campus Program is institution-level and distinct from individual student eligibility.
- Renewal and benefits cannot turn the institution into an Account subtype.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Organization or Enterprise lifecycle
- individual Education Application
- Campus Expert membership
- billing account

Exclude institution source repositories, course code and deployment tooling.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `EDU3`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
