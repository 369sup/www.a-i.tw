# Certification

Lifecycle: `planned`

Own certification programs, exam registration and appointments, results, credentials, badges and expiration lifecycle.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own certification programs, exam registration and appointments, results, credentials, badges and expiration lifecycle.

This directory is the declared local ownership boundary for `CertificationProgram`, `ExamRegistration`, `CertificationCredential`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `CertificationProgram`
- `ExamRegistration`
- `CertificationCredential`

### Language and invariants

Ubiquitous language:

- Certification Program
- Exam Registration
- Appointment
- Attempt
- Result
- Certification Credential

Required invariants:

- Exam registration and awarded credential are distinct lifecycle stages.
- Profile badges may reference an issued credential but cannot become its source of truth.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- training content
- authentication credential
- Profile-owned presentation
- generic Education eligibility

Exclude exam-preparation source code and code-lab execution.

### Official evidence

- Evidence status: Partial; external exam-provider transitions require an approved first use case.
- Evidence IDs: `CERT1`, `CERT2`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
