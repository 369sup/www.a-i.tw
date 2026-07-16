# Accounts and Profile / profile-presence Context rules

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
- Problem: Own account presentation and presence independently of account identity and authentication.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `AccountProfile`

### Does not own

- User Account lifecycle
- Credential
- Organization membership
- activity source event

### Ubiquitous language

- Profile
- display name
- bio
- avatar
- status
- presence
- profile visibility

### Core invariants

- Presentation data cannot authenticate a Principal or grant product authority.
- Managed-profile control facts may constrain edits without transferring IdP ownership here.

### Allowed dependencies

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude source-code contribution truth; only privacy-filtered non-Code projections may be presented.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `ACT2`, `A6`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
