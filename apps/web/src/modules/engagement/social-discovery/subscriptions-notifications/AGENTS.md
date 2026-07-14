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
