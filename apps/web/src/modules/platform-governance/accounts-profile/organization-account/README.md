# Organization Account

Context `organization-account`; core subdomain; owner www.a-i.tw Product Team.

Problem: Own Organization Account identity and lifecycle without owning presentation Profile, Membership, Team, authentication, policy, or resource access grants.

## First approved use case

Principal use case: Create an Organization Account for an active Principal, initialize its Profile, and activate the Account.

An active Principal creates an Organization Account and initializes its presentation Profile.

- Success: persist a `provisioning` Organization Account, initialize Profile through `ProfileDirectory`, activate the
  Account, and return an Organization reference.
- Failures: inactive Principal, invalid identity/handle, conflicting active handle, or unavailable Profile capability.
- Retry: failed Profile initialization leaves an internal provisioning Account; the same canonical handle reuses the
  Account identity and retries initialization.
- Source of truth: this Context owns `OrganizationAccount`; Profile remains owned by `profile-presence`.

Organization Accounts never authenticate as Actors. Membership, Invitation and Organization Team lifecycle belongs to
`organization-participation`; this slice deliberately does not create a founding owner Membership or claim full
Organization onboarding.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Organization Account identity and lifecycle without owning presentation Profile, Membership, Team, authentication, policy, or resource access grants.

This directory is the declared local ownership boundary for `OrganizationAccount`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Create an Organization Account for an active Principal, initialize its Profile, and activate the Account.

### Source of truth

- `OrganizationAccount`

### Language and invariants

Ubiquitous language:

- Organization Account
- organization handle
- shared account
- resource owner
- organization lifecycle

Required invariants:

- An Organization is a shared account operated by User Accounts and cannot authenticate as a person.
- Owning a resource does not transfer that resource's aggregate or lifecycle into this Context.

### Collaboration

- Consumes from `profile-presence` through `ProfileDirectoryApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Membership, invitation or Team
- Repository or Project aggregate
- Enterprise policy
- user authentication

Exclude repository content, Pull Requests and code-security administration.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `A1`, `A2`, `A3`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
