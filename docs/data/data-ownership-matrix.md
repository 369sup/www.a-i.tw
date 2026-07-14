# Data ownership matrix

狀態：Current logical ownership / in-memory storage

| Data concept                                                                 | Sole owner            | Consumers may receive               |
| ---------------------------------------------------------------------------- | --------------------- | ----------------------------------- |
| Principal, credential/session state                                          | Identity & Access     | minimal authenticated facts         |
| Account Profile display data                                                 | Account               | purpose-specific Profile read model |
| Account, namespace, Membership and Organization Team                         | Account               | eligibility and relationship facts  |
| Enterprise, owner assignment, Organization affiliation and Enterprise policy | Enterprise Governance | governance constraints              |
| Repository, visibility, role/grant, lifecycle                                | Repository            | scope and decision facts            |
| Issue, Issue Number, Label, Assignment                                       | Issues                | purpose-specific work summaries     |

Enterprise Billing、IdP roster、Entitlement 與 Audit 尚無 runtime owner；不得放入 Account 或 Enterprise
Governance。Repository 只可即時消費 translated constraint，不可複製 Enterprise hierarchy。

Logical data ownership applies even when contexts share one database instance. Consumers must not write owner storage.
