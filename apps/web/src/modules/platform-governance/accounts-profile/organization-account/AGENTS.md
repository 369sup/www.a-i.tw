# Organization Account bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Organization Account`; subdomain: `organization-account` (`core`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.
- Profile display name is presentation, never Account identity or handle. Profile bio is trimmed and limited to 160
  characters. Profile website is optional and must be an absolute HTTP(S) URL; this protocol restriction is a local
  safety invariant, not an undocumented GitHub limit.
- Persistence seeds and mappers must construct Account/Profile values through Domain factories. Contracts keep
  primitive Published Language and must not export internal branded Value Objects.
- Membership, Invitation and Team state belongs to `organization-participation` and must not be written here.
- A failed Profile initialization leaves an internal provisioning Account; public queries must hide it and the same
  canonical handle must retry with the same Account identity.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Own Organization Account identity and lifecycle without owning presentation Profile, Membership, Team, authentication, policy, or resource access grants.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `OrganizationAccount`

### Does not own

- Membership, invitation or Team
- Repository or Project aggregate
- Enterprise policy
- user authentication

### Ubiquitous language

- Organization Account
- organization handle
- shared account
- resource owner
- organization lifecycle

### Core invariants

- An Organization is a shared account operated by User Accounts and cannot authenticate as a person.
- Owning a resource does not transfer that resource's aggregate or lifecycle into this Context.

### Allowed dependencies

- Consumes from `authentication-security` through `PrincipalRefV1` (synchronous, current).
- Consumes from `profile-presence` through `ProfileDirectoryApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude repository content, Pull Requests and code-security administration.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `A1`, `A2`, `A3`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
