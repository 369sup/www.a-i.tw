# Education Eligibility Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `EducationApplication`, `EligibilityEvidence`, `EducationBenefitGrant`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own student and teacher applications, eligibility evidence, verification decisions and education benefit grants.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `EducationApplication`
- `EligibilityEvidence`
- `EducationBenefitGrant`

### Does not own

- Classroom
- Campus institution partnership
- generic product entitlement
- Account lifecycle

### Ubiquitous language

- Student Application
- Teacher Application
- Eligibility Evidence
- Verification
- Benefit Grant

### Core invariants

- Benefits become available only after an evidence-backed application decision.
- Education verification cannot rewrite User Account or Organization truth.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude student repository content and code-submission assessment.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `EDU1`, `EDU2`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
