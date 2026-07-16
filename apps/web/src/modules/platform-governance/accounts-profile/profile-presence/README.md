# Profile & Presence

Context `profile-presence`; supporting subdomain; owner www.a-i.tw Product Team.

Problem: Own account presentation and presence independently of account identity and authentication.

## First approved use case

Principal use case: Create and resolve the presentation profile initialized for a Personal or Organization Account.

Initialize and resolve the presentation Profile for a Personal or Organization Account.

- Input: Account identity, display name and optional presentation fields.
- Success: persist one normalized `AccountProfile`; repeating the same initialization is idempotent.
- Failures: invalid presentation data or conflicting initialization for the same Account identity.
- Source of truth: this Context alone owns `AccountProfile` presentation state.
- Non-ownership: Account identity/lifecycle, authentication, Membership, Team and authorization.

`AccountProfile` is the Aggregate Root because it is independently loaded, changed and persisted. Initialization is
invoked by an Account provisioning workflow through Profile Published Language. Later updates require an existing local
Profile Aggregate and never query or write Account state.
