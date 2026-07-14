# Account, Profile and Presence

狀態：Accepted GitHub semantic baseline / partial runtime

| Language             | Meaning                                                             | Runtime                 |
| -------------------- | ------------------------------------------------------------------- | ----------------------- |
| User account         | Login-capable Actor attribution and personal ownership root         | Personal subset Current |
| Personal account     | User-controlled User account                                        | Current                 |
| Managed user account | Enterprise-provisioned User account lifecycle mode                  | Research                |
| Organization account | Shared ownership, Membership and Team boundary; never a login Actor | Current subset          |
| Enterprise account   | Multi-Organization governance boundary; never a login Actor         | Research                |
| Profile              | Account presentation: name, bio, avatar, location and links         | Current subset          |
| Presence             | Temporary status, availability and busy signal                      | Research                |

Profile is not an authentication identity. Account switching changes the active User Actor; selecting
Organization or Enterprise changes Active Scope only.

## Current semantic reconstruction slices

狀態：Current verified

Problem: primitive strings currently carry stable identity, mutable namespace handle and validation rules without
expressing their different semantics. GitHub username changes demonstrate that the stable Account identity and mutable
Account handle are not the same value; an old username may later be claimed by someone else. Organization accounts own
resources and governance scope but cannot authenticate as an Actor.

Actor: an active authenticated User Principal.

Business outcome: create a Personal or Organization Account with a globally unique canonical handle, an initial Profile,
and, for an Organization, an active owner Membership attributed to the creating User Principal.

| Value Object         | Owner   | Invariant / meaning                                                                       |
| -------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `AccountId`          | Account | stable Account identity; never derived from or replaced by a handle                       |
| `AccountHandle`      | Account | lowercase canonical namespace handle; validated at construction and globally unique       |
| `AccountKind`        | Account | `personal` or `organization`; an Organization is never a login Actor                      |
| `AccountStatus`      | Account | Account lifecycle value; initial state is `active`                                        |
| `ProfileDisplayName` | Account | required trimmed presentation name; changing it does not change identity or authorization |
| `ProfileBio`         | Account | optional trimmed public text; at most 160 characters                                      |
| `ProfileWebsite`     | Account | optional canonical absolute HTTP(S) URL                                                   |

The Current implementation includes the Account and Profile values above, plus the approved Membership, Invitation and
Team runtime values below. These values were extracted from existing use cases; no tactical artifact is fabricated merely
to populate template directories.

| Value Object                         | Owner   | Invariant / meaning                                                                  |
| ------------------------------------ | ------- | ------------------------------------------------------------------------------------ |
| `MembershipId`                       | Account | stable organization Membership identity; non-empty at construction                   |
| `MembershipRole`                     | Account | closed organization role vocabulary: `owner` or `member`                             |
| `MembershipStatus`                   | Account | closed Membership lifecycle: `active` or `removed`                                   |
| `MembershipInvitationId`             | Account | stable invitation identity; non-empty at construction                                |
| `MembershipInvitationStatus`         | Account | `pending`, `accepted`, `expired` or `cancelled`; only pending invitations transition |
| `MembershipInvitationExpiry`         | Account | exactly seven days after issue; acceptance at or after expiry is rejected            |
| `TeamId`                             | Account | stable organization-local Team identity; non-empty at construction                   |
| `TeamName`                           | Account | canonical lowercase organization-local name; 1-100 permitted characters              |
| Team Membership reference collection | Account | contains Account-owned `MembershipId` references without duplicates                  |

Only an active Organization owner may issue or cancel an invitation. The invited Principal alone may accept it before
expiry, producing an active Membership. Team assignment requires an active organization Membership. These checks live in
Domain/Application ownership; transport and persistence do not decide them.

GitHub documents the Profile name as required and independently changeable, while other profile information is mostly
optional, and documents a 160-character Profile bio limit. The HTTP(S)-only `ProfileWebsite` rule is a local safety
invariant: the consulted GitHub profile documentation requires full URLs for social links but does not publish a
personal website length limit, so this model does not invent one.

Success means invalid handles cannot construct an Account, case variants resolve to the same canonical handle,
duplicate handles are rejected by the Application use case, Personal Accounts require an active Principal reference,
and Organization creation establishes its owner Membership.

Out of scope: login/session transport, Repository authorization, Enterprise policy, Managed User lifecycle, Presence,
database selection and new Bounded Context creation.

Runtime evidence: `apps/web/src/modules/platform-governance/accounts-profile/user-account` implements Personal Account,
`apps/web/src/modules/platform-governance/accounts-profile/profile-presence` owns Profile, while
`apps/web/src/modules/platform-governance/accounts-profile/organization-account` and
`apps/web/src/modules/platform-governance/participation-teams/organization-participation` implement Organization identity, Membership, Invitation and
Team behavior. Account/Profile verification is recorded in
[`../evidence/2026-07-13-account-value-object-foundation.md`](../evidence/2026-07-13-account-value-object-foundation.md);
Membership/Invitation/Team verification is recorded in
[`../evidence/2026-07-14-account-membership-team-value-objects.md`](../evidence/2026-07-14-account-membership-team-value-objects.md).

Official evidence:

- [Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)
- [Username changes](https://docs.github.com/en/account-and-profile/concepts/username-changes)
- [Personalize your profile](https://docs.github.com/en/account-and-profile/tutorials/personalize-your-profile)
- [Inviting users to join your organization](https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization)
- [Adding people to your organization](https://docs.github.com/en/organizations/managing-membership-in-your-organization/adding-people-to-your-organization)
- [Canceling or editing an invitation](https://docs.github.com/en/organizations/managing-membership-in-your-organization/canceling-or-editing-an-invitation-to-join-your-organization)
