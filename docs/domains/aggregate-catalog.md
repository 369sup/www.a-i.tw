# Aggregate catalog

狀態：Current / in-memory baseline

| Context / subdomain | Aggregate root        | Identity             | Current invariants                                                    | Transaction boundary         |
| ------------------- | --------------------- | -------------------- | --------------------------------------------------------------------- | ---------------------------- |
| Identity & Access   | Principal             | Principal id         | disabled Principal cannot authenticate                                | one Principal/session action |
| Identity & Access   | Session               | opaque token         | resolves one active authenticated Principal; revocable                | one Session                  |
| Account             | Account               | Account id           | normalized unique handle; active owner required                       | one Account                  |
| Account             | Account Profile       | Account id           | required display name; bounded bio; valid website; no grants          | one Profile                  |
| Account             | Membership Invitation | Invitation id        | organization-only; owner-issued; invitee accepts before expiry        | one Invitation               |
| Account             | Membership            | Membership id        | one active relationship per Principal/organization                    | one Membership               |
| Account             | Team                  | Team id              | organization-only; unique name; active members only                   | one Team                     |
| Repository          | Repository            | Repository id        | owner/name unique; archived mutation restrictions                     | one Repository               |
| Repository          | Access Grant          | Repository + subject | Principal/Team subject; owner is not a grant; centralized role policy | one grant                    |
| Work Management     | Issue                 | Issue id             | repository number unique; explicit open/closed transitions            | one Issue                    |
| Work Management     | Label                 | Label id             | normalized name unique per Repository                                 | one Label                    |
| Work Management     | Assignment            | Issue + Principal    | eligible Principal; one active pair                                   | one Issue mutation           |
| Master Template     | Resource              | Resource id          | normalized name unique in namespace                                   | one Resource                 |
| Sub Template        | Sub Template          | Sub-template id      | valid id and non-empty title                                          | read-only catalog entry      |

Session is a current in-memory Aggregate baseline, not a durable production session. Enterprise governance and transfer remain proposed.
