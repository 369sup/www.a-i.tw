# Upstream–downstream matrix

狀態：Current baseline

| Upstream                   | Downstream         | Supplies                                            | Pattern                                      | Downstream responsibility                          |
| -------------------------- | ------------------ | --------------------------------------------------- | -------------------------------------------- | -------------------------------------------------- |
| Identity & Access          | Account            | PrincipalRefV1 and authentication eligibility facts | Open Host Service + Published Language + ACL | establish relationship; do not retain credential   |
| Identity & Access          | Repository         | authenticated Principal facts                       | Open Host Service + Published Language + ACL | translate facts; do not own credentials            |
| Account                    | Repository         | owner identity and eligibility facts                | Customer/Supplier + Published Language + ACL | decide resource role; do not copy Account state    |
| Organization Participation | Repository         | Membership and Team participation facts             | Customer/Supplier + Published Language + ACL | decide resource role; do not copy roster           |
| Organization Account       | Enterprise Account | Organization identity and eligibility facts         | Customer/Supplier + Published Language + ACL | own affiliation; reject invalid Organization       |
| Policy Governance          | Repository         | Repository visibility constraints                   | Customer/Supplier + Published Language + ACL | own final decision; do not copy policy hierarchy   |
| Repository                 | Experience         | Repository access decision                          | Open Host Service + Published Language       | render and enforce no duplicate policy             |
| Repository                 | Issues             | collaboration scope and participation decision      | Open Host Service + Published Language + ACL | own work rules; never copy grant graph             |
| Identity & Access          | Issues             | PrincipalRefV1 and active status                    | Open Host Service + Published Language + ACL | attribute actor/assignee; do not retain credential |

The detailed relationship and failure semantics are owned by [`context-map.md`](context-map.md).
