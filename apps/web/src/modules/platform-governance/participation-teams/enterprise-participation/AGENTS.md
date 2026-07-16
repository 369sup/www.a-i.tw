# Enterprise Participation Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `EnterpriseMember`, `EnterpriseTeam`, `OrganizationAccessAssignment`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own Enterprise membership classifications, Enterprise Teams and Organization access assignments without merging Organization Team semantics.
- Evidence status: Partial; candidate boundary requires enterprise-team evidence refresh before promotion.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `EnterpriseMember`
- `EnterpriseTeam`
- `OrganizationAccessAssignment`

### Does not own

- Organization Membership aggregate
- Organization Team hierarchy
- license definition
- Enterprise Account lifecycle

### Ubiquitous language

- Enterprise Member
- Guest Collaborator
- Enterprise Team
- Organization access assignment

### Core invariants

- Enterprise Team and Organization Team are distinct models with different scope and capabilities.
- Organization access assignment may cause downstream membership effects but does not let this Context write Organization participation state directly.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude repository collaborator and code-security team assignment semantics.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `A5`, `A6`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
