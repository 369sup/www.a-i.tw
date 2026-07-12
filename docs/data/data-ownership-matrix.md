# Data ownership matrix

狀態：Current logical ownership / in-memory storage

| Data concept                                                                | Sole owner        | Consumers may receive              |
| --------------------------------------------------------------------------- | ----------------- | ---------------------------------- |
| Principal, credential/session state                                         | Identity & Access | minimal authenticated facts        |
| Account, namespace, Membership, Team, enterprise-to-organization governance | Account           | eligibility and relationship facts |
| Repository, visibility, role/grant, lifecycle                               | Repository        | scope and decision facts           |
| Issue, Issue Number, Label, Assignment                                      | Work Management   | purpose-specific work summaries    |

Enterprise billing, IdP roster 與 detailed governance policy 仍由 Account 的 private model 擁有；Repository 只可保存決策所需的 contract version 或 translated restriction，不可複製 hierarchy。

Logical data ownership applies even when contexts share one database instance. Consumers must not write owner storage.
