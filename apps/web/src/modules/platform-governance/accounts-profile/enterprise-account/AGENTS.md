# Enterprise Governance Context rules

Owner: www.a-i.tw Product Team. Organize each layer by declared subdomain. Peer Context dependencies originate only from consumer
Infrastructure integrations and use this Context's `contracts/<subdomain>/public.ts`. `public-api.ts` and
`composition/index.ts` are reserved for app server composition. Ownership-free shared directories are forbidden.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `approved`; runtime evidence: `current`.
- Owner: www.a-i.tw Product Team.
- Problem: Govern multiple Organizations with Enterprise-scoped affiliations and enforceable policy constraints without owning their resources.
- Evidence status: Confirmed.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `Enterprise`
- `EnterpriseOrganizationAffiliation`

### Does not own

- Repository, Project or Discussion
- Organization membership
- resource-specific role
- billing transaction

### Ubiquitous language

- Enterprise Account
- enterprise slug
- Organization affiliation
- administrative boundary

### Core invariants

- An Enterprise governs affiliated Organizations but does not directly own their Repositories or Projects.
- Organization affiliation is not Organization membership.

### Allowed dependencies

- Consumes from `organization-account` through `OrganizationAccountDirectoryApiV1` (synchronous, current).

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude enterprise code-security, Actions and repository-content administration.

### Change and promotion gate

Any ownership, contract, relationship or lifecycle change requires matching Context Map/runtime evidence and blast-radius verification.

### Official evidence

Evidence IDs: `A1`, `A5`, `A6`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
