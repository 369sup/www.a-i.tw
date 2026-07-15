# account

- Domain: Account Management
- Subdomain: account (core)
- Owner: www.a-i.tw Product Team

Current aggregates are Account, Membership Invitation, Membership and Team. Application use cases create Accounts,
manage Membership lifecycle and manage Team membership. Outbound Ports are `AccountStore`, `ProfileStore`,
`MembershipStore`, `MembershipInvitationStore` and `TeamStore`; process-local adapters are wired only by the product composition root.
Published language is limited to Account eligibility and Membership/Team relationship facts.

## Current semantic foundation

Create Account is the first Use Case-driven vertical slice. Its acceptance and failure conditions require the following
minimal Domain model; the Value Objects are consequences of those invariants, not the starting point:

- `AccountId` is stable identity and is not derived from `AccountHandle`.
- `AccountHandle` owns lowercase canonicalization and construction-time syntax validation; global uniqueness is enforced
  by the Create Account Application handler through `AccountStore`.
- `AccountKind` distinguishes Personal from Organization Accounts; an Organization never authenticates as an Actor.
- `AccountStatus` owns Account lifecycle vocabulary; a new Account starts `active`.
- `CreateAccountCommand` and its Handler own orchestration. Personal creation requires an active Principal; Organization
  creation also establishes an active owner Membership.
- Persistence seed data is mapped through Domain factories by the Account persistence adapter; raw records cannot enter
  the Domain as already-valid Accounts.

The second verified slice owns `ProfileDisplayName`, `ProfileBio` and `ProfileWebsite`; Update Profile validates through
Domain construction and an Application Command/Handler, while persistence seeds also pass through that construction.

The third inside-out slice owns Membership, Invitation and Team runtime values:

- Membership identity, role and lifecycle are Account-owned closed values.
- Invitations expire exactly seven days after issue; only the invited Principal can accept a pending invitation, while
  an active Organization owner can cancel it.
- Expired pending invitations are persisted as expired and do not permanently block a later invitation.
- Team identity and canonical name are distinct values; Team membership stores unique Account-owned `MembershipId`
  references and Application orchestration admits only active organization members.
- Store interfaces are consumer-owned outbound Ports. In-memory seeds reconstruct through Domain factories.

Next approved Context sequence begins with Authentication & Federation. Do not add unapproved Team visibility,
maintainer or hierarchy semantics, empty tactical artifacts, or Presentation mapping merely to populate the template.
