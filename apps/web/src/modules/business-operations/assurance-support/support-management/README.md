# Support Management

Lifecycle: `planned`

Own support tickets, priorities, contacts, interactions, escalation, service levels and temporary access requests.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own support tickets, priorities, contacts, interactions, escalation, service levels and temporary access requests.

This directory is the declared local ownership boundary for `SupportTicket`, `SupportInteraction`, `ServiceLevelTarget`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `SupportTicket`
- `SupportInteraction`
- `ServiceLevelTarget`

### Language and invariants

Ubiquitous language:

- Support Ticket
- Priority
- Interaction
- Escalation
- Service Level Target

Required invariants:

- Support eligibility is consumed from entitlement rather than decided by a Ticket.
- Any temporary resource access requires explicit consent, expiry and separate authorization evidence.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Support Entitlement
- Account lifecycle
- Repository permission
- product defect aggregate

Exclude code ingestion and automatic source-code access; temporary access semantics remain unapproved without dedicated evidence.

### Official evidence

- Evidence status: Partial; temporary Repository access is pending dedicated official evidence.
- Evidence IDs: `SUP1`, `SUP2`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
