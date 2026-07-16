# Governance Policy / policy-governance Context rules

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
- Problem: Own Enterprise policy constraints and delegation independently of administrative role assignment.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `RepositoryVisibilityPolicy`

### Does not own

- Administrative Role Assignment
- resource lifecycle
- commercial entitlement
- authentication decision

### Ubiquitous language

- Policy
- Policy Assignment
- delegation
- constraint
- effective policy

### Core invariants

- Policy answers whether governance permits or delegates an operation; it does not prove actor authority.
- A policy target must use an owned reference and cannot directly mutate the governed Context.

### Allowed dependencies

- Consumes from `enterprise-account` through `EnterpriseAccountDirectoryApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude branch, tag, push and other code-centric ruleset semantics.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `A5`, `A6`, `R6`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
