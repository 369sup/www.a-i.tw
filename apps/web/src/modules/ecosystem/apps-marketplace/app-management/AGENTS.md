# App Integrations / app-management Context rules

Owner: www.a-i.tw Product Team. Follow the fixed capability-oriented Domain, Application, Contracts, Adapters, Composition and Tests
topology. Cross-Context consumers may import only `contracts/<version>/public.ts`; Domain and Application never import
another Context.

The directory ownership and pattern rules in the parent `apps/web/src/modules/AGENTS.md` are mandatory. Domain code is
grouped by the declared capability; commands and queries use one named directory containing their message and handler.

Temporary, prototype, scaffolded, migration, and test-only status never waive the fixed topology, dependency direction,
manifest, Published Language, architecture check, or CI gate.

This first slice owns Personal Account-owned `GitHubAppRegistration` identity and presentation configuration only.
It consumes Personal Account owner facts through `PersonalAccountDirectoryApiV1` and its own ACL. It must not absorb
Installation, Repository selection, User/OAuth Authorization, tokens, requested/granted permissions, Webhook Delivery,
Marketplace commerce, or Account namespace truth without a separate semantic gate.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: External applications require a registration identity and presentation configuration independent from installations, user authorization, webhook delivery and marketplace commerce.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `GitHubAppRegistration`

### Does not own

- Webhook delivery
- Marketplace purchase
- Repository membership
- User Session

### Ubiquitous language

- GitHub App
- OAuth App
- App Registration
- Installation
- User Authorization
- permission request

### Core invariants

- App definition, installation and user authorization are distinct lifecycles even when implemented in one Context.
- Granted repository selection is not Repository membership.

### Allowed dependencies

- Consumes from `user-account` through `PersonalAccountDirectoryApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude the app's source code, Actions implementations and API-client business behavior.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `INT1`, `INT2`, `INT3`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
