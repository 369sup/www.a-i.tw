# authentication-security

- Domain: Identity and Access
- Subdomain: authentication-security (supporting)
- Owner: www.a-i.tw Product Team

Before adding behavior, document the aggregate boundary, first use case, input
and output contract, outbound ports, and Context Map relationships.

## Approved Principal and Session foundation

Implementation is limited to the existing Login, Session resolution and Logout use cases:

- `PrincipalId`, `PrincipalKind` and `PrincipalStatus` own attribution identity and authentication eligibility.
- `AuthenticationMethod` records the verified mechanism; the current mock adapter represents password verification.
- `SessionId` is Domain identity and is never the browser token.
- `SessionStatus` and `SessionExpiry` own revocation and the existing eight-hour Session deadline.
- Browser tokens, cookies and Next.js options remain Application/Adapter concerns.
- Internal Value Objects never cross `contracts/v1`; Published Language remains primitive and minimal.

Federation, provider subject linkage, SSO, 2FA, passkey, device verification and durable providers remain unapproved
runtime work. Do not create empty artifacts or a new Context for them.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Authenticate a principal and maintain session attribution without deciding product authorization.

This directory is the declared local ownership boundary for `Principal`, `Session`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Authenticate a demo credential and resolve the active principal session.

### Source of truth

- `Principal`
- `Session`

### Language and invariants

Ubiquitous language:

- Credential
- authentication factor
- Session
- recovery method
- revocation

Required invariants:

- Authentication proves identity; it never implies product authorization.
- Revoked credentials and Sessions cannot be treated as active, and raw credential material never leaves this boundary.

### Collaboration

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Account ownership
- Organization participation
- product authorization
- Repository access

Exclude SSH and commit-signing credentials used primarily for source-code workflows.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `A7`, `A8`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
