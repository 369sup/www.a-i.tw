# Support Management Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `SupportTicket`, `SupportInteraction`, `ServiceLevelTarget`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own support tickets, priorities, contacts, interactions, escalation, service levels and temporary access requests.
- Evidence status: Partial; temporary Repository access is pending dedicated official evidence.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `SupportTicket`
- `SupportInteraction`
- `ServiceLevelTarget`

### Does not own

- Support Entitlement
- Account lifecycle
- Repository permission
- product defect aggregate

### Ubiquitous language

- Support Ticket
- Priority
- Interaction
- Escalation
- Service Level Target

### Core invariants

- Support eligibility is consumed from entitlement rather than decided by a Ticket.
- Any temporary resource access requires explicit consent, expiry and separate authorization evidence.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude code ingestion and automatic source-code access; temporary access semantics remain unapproved without dedicated evidence.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `SUP1`, `SUP2`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
