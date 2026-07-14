# repository bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Repository Governance`; subdomain: `repository` (`core`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.
- `Workspace` is not Ubiquitous Language and must not appear in runtime or presentation naming. Repository owns only its core resource identity, Account ownership,
  profile, visibility, state, feature configuration and lifecycle.
- Do not add Access Grant, Role, Permission, Project association, Ruleset, Custom Property definition, Webhook, Audit,
  Notification, Watch Subscription or Star semantics. Access decisions use the Repository-owned consumer Port and ACL
  for the approved `authority/repository-governance` Published Language.

# Authorization & Policy / repository-governance Context rules

Owner: www.a-i.tw Product Team. Follow the fixed capability-oriented Domain, Application, Contracts, Adapters, Composition and Tests
topology. Cross-Context consumers may import only `contracts/<version>/public.ts`; Domain and Application never import
another Context.

The directory ownership and pattern rules in the parent `apps/web/src/modules/AGENTS.md` are mandatory. Domain code is
grouped by the declared capability; commands and queries use one named directory containing their message and handler.

Temporary, prototype, scaffolded, migration, and test-only status never waive the fixed topology, dependency direction,
manifest, Published Language, architecture check, or CI gate.

Repository Role, Repository Access Grant and Authorization Decision are owned here. Repository, Identity and Account
facts enter only through versioned Published Language and Context-owned ACLs. Do not import peer internals or add
commercial entitlement, authentication, resource lifecycle, custom roles or organization base permissions to this
slice without a separate semantic gate.
