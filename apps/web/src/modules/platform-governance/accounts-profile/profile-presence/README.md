# Accounts and Profile: profile-presence

Strategic subdomain `profile-presence` (`supporting`); owner www.a-i.tw Product Team.

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
