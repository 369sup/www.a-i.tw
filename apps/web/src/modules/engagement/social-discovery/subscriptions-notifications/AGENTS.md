# Notifications bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Notifications`; subdomain: `notifications` (`supporting`).
- Own Notification recipient attention, read state, active/done Inbox placement, saved retention and recipient-only triage.
- Do not own Repository Watch, Conversation Subscription, source resource state or delivery-provider configuration.
- `Done` never unsubscribes. Explicit Inbox Unsubscribe uses a consumer-owned Application Port and outbound ACL to the
  Subscriptions Published Language, then marks the owned Notification done only after subscription deactivation succeeds.
- Application and Domain must not import peer Contexts; only the ACL imports `subscriptions/contracts/v1/public.ts`.

# Subscriptions / subscriptions Context rules

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
- Problem: Represent recipient attention and Inbox triage independently of source resource truth.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `ActivitySubscription`
- `Notification`
- `NotificationTriage`

### Does not own

- source resource lifecycle
- Follow or Star
- Webhook Delivery
- authorization grant

### Ubiquitous language

- Watch Subscription
- Conversation Subscription
- Notification Thread
- Notification Reason
- Inbox State

### Core invariants

- Subscription is recipient intent; Notification is a derived recipient-specific update.
- Read, saved and done state cannot mutate the source conversation.

### Allowed dependencies

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude notifications whose only source is Code, Pull Requests, Actions or code-security activity.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `N1`, `N2`, `N3`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
