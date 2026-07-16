# Developer Program

Lifecycle: `planned`

Own Developer Program applications, integration evidence, membership status, benefits and developer badges.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Developer Program applications, integration evidence, membership status, benefits and developer badges.

This directory is the declared local ownership boundary for `DeveloperProgramApplication`, `DeveloperProgramMembership`, `DeveloperProgramBenefit`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `DeveloperProgramApplication`
- `DeveloperProgramMembership`
- `DeveloperProgramBenefit`

### Language and invariants

Ubiquitous language:

- Developer Program Application
- Applicant Type
- Integration Evidence
- Support Contact
- Program Membership

Required invariants:

- Program membership may reference evidence that an integration exists but does not own the integration.
- A support contact is application evidence, not a Support Ticket.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- App Registration
- App Installation
- Support Ticket
- integration implementation

Exclude API client source code, app runtime and implementation details of the submitted integration.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `DEV1`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
