# Aggregate catalog

狀態：Current / in-memory baseline

| Context / subdomain | Aggregate root | Identity               | Current invariants                                | Transaction boundary         |
| ------------------- | -------------- | ---------------------- | ------------------------------------------------- | ---------------------------- |
| Identity & Access   | Principal      | Principal id           | disabled Principal cannot authenticate            | one Principal/session action |
| Account             | Account        | Account id             | normalized unique handle; active owner required   | one Account                  |
| Repository          | Repository     | Repository id          | owner/name unique; archived mutation restrictions | one Repository               |
| Repository          | Access Grant   | Repository + Principal | owner is not a grant; centralized role policy     | one grant                    |
| Master Template     | Resource       | Resource id            | normalized name unique in namespace               | one Resource                 |
| Sub Template        | Sub Template   | Sub-template id        | valid id and non-empty title                      | read-only catalog entry      |

Session is currently in-memory authentication state, not a declared durable
production Aggregate. Membership, Team, enterprise governance and transfer
remain proposed.
