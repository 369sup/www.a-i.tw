# Certification Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `CertificationProgram`, `ExamRegistration`, `CertificationCredential`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own certification programs, exam registration and appointments, results, credentials, badges and expiration lifecycle.
- Evidence status: Partial; external exam-provider transitions require an approved first use case.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `CertificationProgram`
- `ExamRegistration`
- `CertificationCredential`

### Does not own

- training content
- authentication credential
- Profile-owned presentation
- generic Education eligibility

### Ubiquitous language

- Certification Program
- Exam Registration
- Appointment
- Attempt
- Result
- Certification Credential

### Core invariants

- Exam registration and awarded credential are distinct lifecycle stages.
- Profile badges may reference an issued credential but cannot become its source of truth.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude exam-preparation source code and code-lab execution.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `CERT1`, `CERT2`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
