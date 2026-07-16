# Administrative Authority / administrative-access-control Context rules

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
- Problem: Own Enterprise and Organization administrative role assignments independently of resource authorization.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `EnterpriseOwnerAssignment`

### Does not own

- Authentication
- resource-specific actions or roles
- Enterprise policy
- commercial entitlement

### Ubiquitous language

- Administrative Role
- Administrative Permission
- Role Assignment
- delegated authority

### Core invariants

- Administrative authority is scope-bound; equal role labels in different scopes are not interchangeable.
- Repository, Project, App and Marketplace actions remain owned by their resource Contexts.

### Allowed dependencies

- Consumes from `enterprise-account` through `EnterpriseAccountDirectoryApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude source-code review, branch protection and code-security permissions.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `A4`, `A5`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
