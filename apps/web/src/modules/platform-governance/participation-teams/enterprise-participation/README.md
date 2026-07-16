# Enterprise Participation

Lifecycle: `planned`

Own Enterprise membership classifications, Enterprise Teams and Organization access assignments without merging Organization Team semantics.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Enterprise membership classifications, Enterprise Teams and Organization access assignments without merging Organization Team semantics.

This directory is the declared local ownership boundary for `EnterpriseMember`, `EnterpriseTeam`, `OrganizationAccessAssignment`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `EnterpriseMember`
- `EnterpriseTeam`
- `OrganizationAccessAssignment`

### Language and invariants

Ubiquitous language:

- Enterprise Member
- Guest Collaborator
- Enterprise Team
- Organization access assignment

Required invariants:

- Enterprise Team and Organization Team are distinct models with different scope and capabilities.
- Organization access assignment may cause downstream membership effects but does not let this Context write Organization participation state directly.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Organization Membership aggregate
- Organization Team hierarchy
- license definition
- Enterprise Account lifecycle

Exclude repository collaborator and code-security team assignment semantics.

### Official evidence

- Evidence status: Partial; candidate boundary requires enterprise-team evidence refresh before promotion.
- Evidence IDs: `A5`, `A6`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
