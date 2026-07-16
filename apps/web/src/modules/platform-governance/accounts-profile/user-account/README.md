# Account and Profile: user-account

Strategic subdomain `user-account` (`core`); owner www.a-i.tw Product Team.

## First approved use case

An active Principal creates one Personal Account and resolves the presentation Profile initialized for that Account.

- Actor: an active authenticated Principal.
- Input: a proposed User Account id, handle and display name plus the authoritative Principal reference.
- Success: persist one provisioning `PersonalAccount`, initialize its Profile through `ProfileDirectory`, activate
  the Account, and return the app-facing Personal Account reference.
- Failures: the Principal already owns a Personal Account; account identity, handle or Principal reference is invalid;
  or the authoritative Profile capability is unavailable.
- Source of truth: this Context owns `PersonalAccount`; Profile state remains owned by `profile-presence`.
- Consistency: Account persistence is local. Profile initialization is a synchronous, idempotent cross-Context
  dependency and is not represented as one cross-Context Aggregate or database transaction. Failure leaves an internal
  provisioning Account that is hidden from queries; a retry for the same Principal and handle reuses its Account id,
  repeats Profile initialization and then activates the Account.

## Minimal Domain model

The use case requires a `PersonalAccount` Aggregate Root. `UserAccountId` protects stable identity,
`UserAccountHandle` owns canonicalization and syntax, and `PrincipalReference` prevents an upstream Principal
reference from being confused with Account identity. A new Account starts `provisioning` and can transition once to
`active` after Profile initialization succeeds. Provisioning state is Context internal and is not published through
`PersonalAccountRefV1`.

Managed Account provisioning, suspension transitions, recovery and authentication are not part of this slice.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own personal and managed account identity, public profile, and account lifecycle without owning organization membership or authentication.

This directory is the declared local ownership boundary for `PersonalAccount`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Create a personal account for an active principal and resolve its profile.

### Source of truth

- `PersonalAccount`

### Language and invariants

Ubiquitous language:

- User Account
- Personal Account
- Managed User Account
- username
- account lifecycle

Required invariants:

- Personal and managed are control modes of a User Account, not peer account types.
- A User Account is the actor-attribution boundary; Organization and Enterprise Accounts cannot sign in as users.

### Collaboration

- Consumes from `profile-presence` through `ProfileDirectoryApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Credential or Session
- Organization or Enterprise membership
- resource authorization
- Profile presentation

Exclude commit identity, SSH keys and source-code contribution semantics.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `A1`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
