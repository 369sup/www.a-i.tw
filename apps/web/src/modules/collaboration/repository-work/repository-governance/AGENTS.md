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

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Manage the identity, Account ownership, profile, visibility, state, feature configuration and lifecycle of a non-code Repository.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `Repository`
- `RepositoryRoleDefinition`
- `RepositoryAccessGrant`

`RepositoryRoleDefinition` and `RepositoryAccessGrant` are Current runtime co-location inherited from the completed
`authorization-policy` merge. The canonical product model still classifies their language as Authorization & Policy;
do not expand that co-location or infer that Repository lifecycle owns authorization semantics without a new boundary
decision and migration.

### Does not own

- Issue, Project, Discussion or Wiki content
- Webhook
- Star or Watch
- Audit Entry
- commercial entitlement

### Ubiquitous language

- Repository
- owner reference
- namespace
- visibility
- lifecycle
- feature configuration
- Repository Role

### Core invariants

- Repository ownership is limited to Personal Account or Organization references; Enterprise is not a direct owner.
- Archive, delete and restore are distinct transitions; feature disablement does not transfer or delete another Context's data.

### Allowed dependencies

- Consumes from `authentication-security` through `IdentityDirectoryApiV1` (synchronous, current).
- Consumes from `user-account` through `PersonalAccountDirectoryApiV1` (synchronous, current).
- Consumes from `organization-account` through `OrganizationAccountDirectoryApiV1` (synchronous, current).
- Consumes from `organization-participation` through `OrganizationParticipationApiV1` (synchronous, current).
- Consumes from `policy-governance` through `RepositoryPolicyDecisionApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude Git objects, files, commits, branches, tags, diffs, Pull Requests, releases and code-centric rulesets.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `R1`, `R2`, `R3`, `R5`, `R6`, `R7`, `R8`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
