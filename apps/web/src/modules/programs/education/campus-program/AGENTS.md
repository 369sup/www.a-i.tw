# Campus Program Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `CampusProgramApplication`, `CampusPartnership`, `InstitutionBenefit`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own institution-level Campus Program applications, agreements, partnerships, benefits, renewal and program status.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `CampusProgramApplication`
- `CampusPartnership`
- `InstitutionBenefit`

### Does not own

- Organization or Enterprise lifecycle
- individual Education Application
- Campus Expert membership
- billing account

### Ubiquitous language

- Educational Institution
- Campus Partnership
- Program Agreement
- Institution Benefit
- Annual Renewal

### Core invariants

- Campus Program is institution-level and distinct from individual student eligibility.
- Renewal and benefits cannot turn the institution into an Account subtype.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude institution source repositories, course code and deployment tooling.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `EDU3`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
