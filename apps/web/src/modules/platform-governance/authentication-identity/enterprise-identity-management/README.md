# Enterprise Identity Management

Lifecycle: `planned`

Own identity-provider connections, external identities, federation configuration and managed-user provisioning lifecycle.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own identity-provider connections, external identities, federation configuration and managed-user provisioning lifecycle.

This directory is the declared local ownership boundary for `IdentityProviderConnection`, `ExternalIdentity`, `ProvisioningState`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `IdentityProviderConnection`
- `ExternalIdentity`
- `ProvisioningState`

### Language and invariants

Ubiquitous language:

- Identity Provider
- External Identity
- SAML
- OIDC
- SCIM
- managed-user provisioning

Required invariants:

- Federation and provisioning are external-identity lifecycle concerns, not authorization decisions.
- Deprovisioning must not invent deletion semantics for downstream owned resources.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Product role
- Repository permission
- Organization Team
- User Profile presentation policy

Exclude Git transport credentials and any IdP-driven source-code access implementation.

### Official evidence

- Evidence status: Partial; candidate boundary requires a first-use-case evidence refresh before promotion.
- Evidence IDs: `A6`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
