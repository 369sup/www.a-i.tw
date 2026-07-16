# Aggregate catalog

狀態：Current / in-memory baseline

| Context / subdomain        | Aggregate root          | Identity             | Current invariants                                                                         | Transaction boundary |
| -------------------------- | ----------------------- | -------------------- | ------------------------------------------------------------------------------------------ | -------------------- |
| Identity & Access          | Principal               | Principal id         | stable attribution; disabled Principal cannot authenticate                                 | one Principal        |
| Identity & Access          | Session                 | Session id           | distinct opaque token; eight-hour expiry; active → revoked/expired only                    | one Session          |
| Account                    | Personal Account        | Account id           | normalized unique handle; exactly one attributed Principal                                 | one Personal Account |
| Organization Account       | Organization Account    | Account id           | normalized unique handle; Profile and participation remain separate owners                 | one Account          |
| Profile & Presence         | Account Profile         | Account id           | required display name; bounded bio; valid website; no grants                               | one Profile          |
| Organization Participation | Membership Invitation   | Invitation id        | owner-issued; seven-day expiry; invitee accepts; owner may cancel pending state            | one Invitation       |
| Organization Participation | Membership              | Membership id        | one active relationship per Principal/organization; removal is terminal                    | one Membership       |
| Organization Participation | Team                    | Team id              | organization-only; canonical unique name; unique active Membership references              | one Team             |
| Enterprise Account         | Enterprise              | Enterprise id        | one Enterprise per Organization affiliation; no policy or administrative-role ownership    | one Enterprise       |
| Repository                 | Repository              | Repository id        | Personal Account/Organization owner; owner/name unique; archived mutation restrictions     | one Repository       |
| Authorization & Policy     | Repository Access Grant | Repository + subject | one role per direct Principal/Team relationship; not a Repository child entity             | one grant            |
| Issues                     | Issue                   | Issue id             | repository number unique; explicit open/closed transitions                                 | one Issue            |
| Issues                     | Label                   | Label id             | normalized name unique per Repository                                                      | one Label            |
| Issues                     | Assignment              | Issue + Principal    | eligible Principal; one active pair                                                        | one Issue mutation   |
| Projects                   | Project                 | Project id           | owner-authorized creation; typed unique Issue/Draft items                                  | one Project          |
| Discussions                | Discussion Category     | Category id          | Repository-scoped Category; current Q&A seed explicitly accepts answers                    | one Category         |
| Discussions                | Discussion              | Discussion id        | required Category/title/body; unique Comments; accepted Answer references active Comment   | one Discussion       |
| App Management             | GitHub App Registration | App registration id  | active Personal Account owner; required unique name; HTTP(S) homepage; private first slice | one Registration     |

Session is a current in-memory Aggregate baseline, not a durable production session. Enterprise Team, Identity
Governance, Billing, Entitlement, Audit and Repository transfer remain proposed.
