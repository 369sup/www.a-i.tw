# Account and Profile / user-account Context rules

Owner: www.a-i.tw Product Team. Follow the fixed capability-oriented Domain, Application, Contracts, Adapters, Composition and Tests
topology. Cross-Context consumers may import only `contracts/<version>/public.ts`; Domain and Application never import
another Context.

The directory ownership and pattern rules in the parent `apps/web/src/modules/AGENTS.md` are mandatory. Domain code is
grouped by the declared capability; commands and queries use one named directory containing their message and handler.

Temporary, prototype, scaffolded, migration, and test-only status never waive the fixed topology, dependency direction,
manifest, Published Language, architecture check, or CI gate.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Own personal and managed account identity, public profile, and account lifecycle without owning organization membership or authentication.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `PersonalAccount`

### Does not own

- Credential or Session
- Organization or Enterprise membership
- resource authorization
- Profile presentation

### Ubiquitous language

- User Account
- Personal Account
- Managed User Account
- username
- account lifecycle

### Core invariants

- Personal and managed are control modes of a User Account, not peer account types.
- A User Account is the actor-attribution boundary; Organization and Enterprise Accounts cannot sign in as users.

### Allowed dependencies

- Consumes from `profile-presence` through `ProfileDirectoryApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude commit identity, SSH keys and source-code contribution semantics.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `A1`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
