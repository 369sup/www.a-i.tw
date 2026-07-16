# Developer Program Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `DeveloperProgramApplication`, `DeveloperProgramMembership`, `DeveloperProgramBenefit`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own Developer Program applications, integration evidence, membership status, benefits and developer badges.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `DeveloperProgramApplication`
- `DeveloperProgramMembership`
- `DeveloperProgramBenefit`

### Does not own

- App Registration
- App Installation
- Support Ticket
- integration implementation

### Ubiquitous language

- Developer Program Application
- Applicant Type
- Integration Evidence
- Support Contact
- Program Membership

### Core invariants

- Program membership may reference evidence that an integration exists but does not own the integration.
- A support contact is application evidence, not a Support Ticket.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude API client source code, app runtime and implementation details of the submitted integration.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `DEV1`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
