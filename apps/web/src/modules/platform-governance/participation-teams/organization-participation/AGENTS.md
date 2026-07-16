# Account Participation / organization-participation Context rules

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
- Problem: Own Organization membership, invitations and Team participation without owning Organization identity.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `OrganizationMembership`
- `OrganizationInvitation`
- `OrganizationTeam`

### Does not own

- Organization Account lifecycle
- Enterprise Team
- Repository Role
- administrative permission definition

### Ubiquitous language

- Organization Membership
- Invitation
- Outside Collaborator
- Organization Team
- Team Maintainer

### Core invariants

- Organization Team members must remain eligible Organization participants.
- Organization Team hierarchy and maintainership must not be reused for Enterprise Teams.

### Allowed dependencies

- Consumes from `organization-account` through `OrganizationAccountDirectoryApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude code-review assignment and source-code contribution eligibility.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `A2`, `A3`, `A4`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
