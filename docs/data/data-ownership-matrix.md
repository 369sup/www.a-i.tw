# Data ownership matrix

狀態：Target

| Data concept                                  | Sole owner        | Consumers may receive              |
| --------------------------------------------- | ----------------- | ---------------------------------- |
| Principal, credential/session state           | Identity & Access | minimal authenticated facts        |
| Account, namespace, Membership, Team          | Account           | eligibility and relationship facts |
| Repository, visibility, role/grant, lifecycle | Repository        | scope and decision facts           |

Logical data ownership applies even when contexts share one database instance. Consumers must not write owner storage.
