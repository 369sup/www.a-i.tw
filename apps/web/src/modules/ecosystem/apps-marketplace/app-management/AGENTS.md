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
