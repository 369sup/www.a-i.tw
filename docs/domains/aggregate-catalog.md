# Aggregate catalog

狀態：Current / in-memory baseline

| Context / subdomain | Aggregate root        | Identity             | Current invariants                                                    | Transaction boundary         |
| ------------------- | --------------------- | -------------------- | --------------------------------------------------------------------- | ---------------------------- |
| Identity & Access   | Principal             | Principal id         | disabled Principal cannot authenticate                                | one Principal/session action |
| Identity & Access   | Session               | opaque token         | resolves one active authenticated Principal; revocable                | one Session                  |
| Account             | Personal Account      | Account id           | normalized unique handle; exactly one attributed Principal            | one Personal Account         |
| Account             | Organization          | Account id           | normalized unique handle; ownership derives from Membership roles     | one Organization             |
| Account             | Account Profile       | Account id           | required display name; bounded bio; valid website; no grants          | one Profile                  |
| Account             | Membership Invitation | Invitation id        | organization-only; owner-issued; invitee accepts before expiry        | one Invitation               |
| Account             | Membership            | Membership id        | one active relationship per Principal/organization                    | one Membership               |
| Account             | Team                  | Team id              | organization-only; unique name; active members only                   | one Team                     |
| Repository          | Repository            | Repository id        | owner/name unique; archived mutation restrictions                     | one Repository               |
| Repository          | Access Grant          | Repository + subject | Principal/Team subject; owner is not a grant; centralized role policy | one grant                    |
| Issues              | Issue                 | Issue id             | repository number unique; explicit open/closed transitions            | one Issue                    |
| Issues              | Label                 | Label id             | normalized name unique per Repository                                 | one Label                    |
| Issues              | Assignment            | Issue + Principal    | eligible Principal; one active pair                                   | one Issue mutation           |
| Projects            | Project               | Project id           | owner-authorized creation; typed unique Issue/Draft items             | one Project                  |

Session is a current in-memory Aggregate baseline, not a durable production session. Enterprise governance and transfer remain proposed.
