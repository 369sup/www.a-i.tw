# Profile & Presence

Context `profile-presence`; supporting subdomain; owner www.a-i.tw Product Team.

Problem: Own account presentation and presence independently of account identity and authentication.

## First approved use case

Principal use case: Create and resolve the presentation profile initialized for a Personal or Organization Account.

Initialize and resolve the presentation Profile for a Personal or Organization Account.

- Input: Account identity, display name and optional presentation fields.
- Success: persist one normalized `AccountProfile`; repeating the same initialization is idempotent.
- Failures: invalid presentation data or conflicting initialization for the same Account identity.
- Source of truth: this Context alone owns `AccountProfile` presentation state.
- Non-ownership: Account identity/lifecycle, authentication, Membership, Team and authorization.

`AccountProfile` is the Aggregate Root because it is independently loaded, changed and persisted. Initialization is
invoked by an Account provisioning workflow through Profile Published Language. Later updates require an existing local
Profile Aggregate and never query or write Account state.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own account presentation and presence independently of account identity and authentication.

This directory is the declared local ownership boundary for `AccountProfile`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Create and resolve the presentation profile initialized for a Personal or Organization Account.

### Source of truth

- `AccountProfile`

### Language and invariants

Ubiquitous language:

- Profile
- display name
- bio
- avatar
- status
- presence
- profile visibility

Required invariants:

- Presentation data cannot authenticate a Principal or grant product authority.
- Managed-profile control facts may constrain edits without transferring IdP ownership here.

### Collaboration

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- User Account lifecycle
- Credential
- Organization membership
- activity source event

Exclude source-code contribution truth; only privacy-filtered non-Code projections may be presented.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `ACT2`, `A6`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
