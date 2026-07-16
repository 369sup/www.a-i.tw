# authentication-security bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Identity and Access`; subdomain: `authentication-security` (`supporting`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.
- Principal identity/status and Session identity/status/expiry are owned here. Browser tokens are lookup credentials,
  not Domain Session identity and never Published Language.
- A disabled Principal cannot authenticate. An expired or revoked Session must fail closed and cannot become active.
- The current browser Session policy is eight hours, preserving existing runtime behavior; adapters consume the
  Application expiry result instead of re-declaring that policy.
- Federation, provider linkage, SSO, 2FA, passkey, device verification and recovery require separate approved semantics.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Authenticate a principal and maintain session attribution without deciding product authorization.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `Principal`
- `Session`

### Does not own

- Account ownership
- Organization participation
- product authorization
- Repository access

### Ubiquitous language

- Credential
- authentication factor
- Session
- recovery method
- revocation

### Core invariants

- Authentication proves identity; it never implies product authorization.
- Revoked credentials and Sessions cannot be treated as active, and raw credential material never leaves this boundary.

### Allowed dependencies

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude SSH and commit-signing credentials used primarily for source-code workflows.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `A7`, `A8`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
