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
