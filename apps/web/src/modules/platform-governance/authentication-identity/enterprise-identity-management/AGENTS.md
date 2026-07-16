# Enterprise Identity Management Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `IdentityProviderConnection`, `ExternalIdentity`, `ProvisioningState`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own identity-provider connections, external identities, federation configuration and managed-user provisioning lifecycle.
- Evidence status: Partial; candidate boundary requires a first-use-case evidence refresh before promotion.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `IdentityProviderConnection`
- `ExternalIdentity`
- `ProvisioningState`

### Does not own

- Product role
- Repository permission
- Organization Team
- User Profile presentation policy

### Ubiquitous language

- Identity Provider
- External Identity
- SAML
- OIDC
- SCIM
- managed-user provisioning

### Core invariants

- Federation and provisioning are external-identity lifecycle concerns, not authorization decisions.
- Deprovisioning must not invent deletion semantics for downstream owned resources.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude Git transport credentials and any IdP-driven source-code access implementation.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `A6`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
