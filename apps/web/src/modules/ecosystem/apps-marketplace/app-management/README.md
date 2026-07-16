# App Integrations: app-management

Strategic subdomain `app-registration` (`supporting`); owner www.a-i.tw Product Team.

Current first use case: an authenticated active Personal Account owner registers and lists a private GitHub App with a
required unique name, Homepage URL and optional Callback URL. Registration is not Installation or User Authorization.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

External applications require a registration identity and presentation configuration independent from installations, user authorization, webhook delivery and marketplace commerce.

This directory is the declared local ownership boundary for `GitHubAppRegistration`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: An authenticated Personal Account owner creates a private GitHub App registration with a unique name, required homepage URL and optional callback URL, then lists registrations owned by that account.

### Source of truth

- `GitHubAppRegistration`

### Language and invariants

Ubiquitous language:

- GitHub App
- OAuth App
- App Registration
- Installation
- User Authorization
- permission request

Required invariants:

- App definition, installation and user authorization are distinct lifecycles even when implemented in one Context.
- Granted repository selection is not Repository membership.

### Collaboration

- Consumes from `user-account` through `PersonalAccountDirectoryApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Webhook delivery
- Marketplace purchase
- Repository membership
- User Session

Exclude the app's source code, Actions implementations and API-client business behavior.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `INT1`, `INT2`, `INT3`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
