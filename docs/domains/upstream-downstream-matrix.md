# Upstream–downstream matrix

狀態：Target

| Upstream          | Downstream | Supplies                                     | Pattern                                      | Downstream responsibility                |
| ----------------- | ---------- | -------------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| Identity & Access | Repository | authenticated Principal facts                | Open Host Service + Published Language + ACL | translate facts; do not own credentials  |
| Account           | Repository | owner eligibility, membership and Team facts | Customer/Supplier + Published Language + ACL | decide resource role; do not copy roster |
| Repository        | Experience | Repository access decision                   | Open Host Service + Published Language       | render and enforce no duplicate policy   |

The detailed relationship and failure semantics are owned by [`context-map.md`](context-map.md).
