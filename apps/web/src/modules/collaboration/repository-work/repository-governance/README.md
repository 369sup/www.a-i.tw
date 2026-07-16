# repository

- Domain: Repository Governance
- Subdomain: repository (core)
- Owner: www.a-i.tw Product Team

The Repository Aggregate owns Repository identity, Personal Account or Organization ownership, profile, visibility,
state, feature configuration and lifecycle. Product UI uses `Repository`, `Repositories`, or `Repository management`;
`Workspace` is not product language and is prohibited in runtime and presentation naming.

The Current Create Repository slice owns an optional HTTP(S) homepage URL as Repository Profile data. Empty input means
the Repository has no homepage; transport code does not canonicalize or validate the URL.

Repository does not own Repository Access Grant, Repository Role, Repository Permission, Project association, Ruleset,
Custom Property definition, Webhook, Audit Entry, Notification, Watch Subscription or Star. Repository consumes the
approved Authorization & Policy API through its own Port and ACL; the grant store, role mapping and final decision no
longer live in this Context.

# Authorization & Policy: repository-governance

Strategic subdomain `repository-governance` (`core`); owner www.a-i.tw Product Team.

The Current in-memory slice owns the five predefined Repository Roles, Principal/Team Repository Access Grants and
point-in-time non-Code decisions. It consumes active Principal, Account Membership, Team and Repository resource facts
without taking ownership of those models.

Custom roles, organization base permissions, outside-collaborator lifecycle, enterprise role assignment, durable
persistence and policy administration remain outside this first slice.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Manage the identity, Account ownership, profile, visibility, state, feature configuration and lifecycle of a non-code Repository.

This directory is the declared local ownership boundary for `Repository`, `RepositoryRoleDefinition`, `RepositoryAccessGrant`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Create a Repository owned by an eligible Personal Account or Organization.

### Source of truth

- `Repository`
- `RepositoryRoleDefinition`
- `RepositoryAccessGrant`

The last two models are a dated Current runtime co-location produced by the completed `authorization-policy` merge.
They remain Authorization & Policy concepts in the canonical semantic inventory. This Context may preserve the current
slice, but new access-control semantics require a separate boundary decision instead of silently extending Repository
ownership.

### Language and invariants

Ubiquitous language:

- Repository
- owner reference
- namespace
- visibility
- lifecycle
- feature configuration
- Repository Role

Required invariants:

- Repository ownership is limited to Personal Account or Organization references; Enterprise is not a direct owner.
- Archive, delete and restore are distinct transitions; feature disablement does not transfer or delete another Context's data.

### Collaboration

- Consumes from `authentication-security` through `IdentityDirectoryApiV1` (synchronous, current).
- Consumes from `user-account` through `PersonalAccountDirectoryApiV1` (synchronous, current).
- Consumes from `organization-account` through `OrganizationAccountDirectoryApiV1` (synchronous, current).
- Consumes from `organization-participation` through `OrganizationParticipationApiV1` (synchronous, current).
- Consumes from `policy-governance` through `RepositoryPolicyDecisionApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Issue, Project, Discussion or Wiki content
- Webhook
- Star or Watch
- Audit Entry
- commercial entitlement

Exclude Git objects, files, commits, branches, tags, diffs, Pull Requests, releases and code-centric rulesets.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `R1`, `R2`, `R3`, `R5`, `R6`, `R7`, `R8`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
