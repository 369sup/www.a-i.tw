# Education Eligibility

Lifecycle: `planned`

Own student and teacher applications, eligibility evidence, verification decisions and education benefit grants.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own student and teacher applications, eligibility evidence, verification decisions and education benefit grants.

This directory is the declared local ownership boundary for `EducationApplication`, `EligibilityEvidence`, `EducationBenefitGrant`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `EducationApplication`
- `EligibilityEvidence`
- `EducationBenefitGrant`

### Language and invariants

Ubiquitous language:

- Student Application
- Teacher Application
- Eligibility Evidence
- Verification
- Benefit Grant

Required invariants:

- Benefits become available only after an evidence-backed application decision.
- Education verification cannot rewrite User Account or Organization truth.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Classroom
- Campus institution partnership
- generic product entitlement
- Account lifecycle

Exclude student repository content and code-submission assessment.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `EDU1`, `EDU2`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
