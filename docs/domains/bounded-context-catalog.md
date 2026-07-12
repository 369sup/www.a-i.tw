# Bounded Context catalog

狀態：Current / approved runtime Contexts

| Context           | Purpose                                | Owns                                       | Does not own                          | Lifecycle |
| ----------------- | -------------------------------------- | ------------------------------------------ | ------------------------------------- | --------- |
| Identity & Access | authenticate and attribute Principals  | Principal and in-memory session facts      | Account, Repository decisions         | Approved  |
| Account           | resource ownership and relationships   | Account, namespace, Membership and Team    | authentication, Repository policy     | Approved  |
| Repository        | non-code resource container governance | Repository, visibility, grants, lifecycle  | Account roster, credentials, Git/code | Approved  |
| Issues            | repository-scoped issue tracking       | Issue, Issue Number, Label, Assignment     | Repository grants, Account roster     | Approved  |
| Projects          | account-owned work planning            | Project, typed Issue reference, Draft Item | Issue truth, Account membership       | Approved  |
| Discussions       | repository conversation                | prototype Discussion record                | Repository grants                     | Prototype |
| Notifications     | attention and Inbox triage             | prototype Notification and Inbox state     | Subscription and source lifecycle     | Prototype |
| Search            | non-code indexing and query            | prototype Search Document and Result Set   | source truth or authorization         | Prototype |
| Activity Feed     | recipient activity stream              | prototype Feed Item                        | source resource truth                 | Prototype |
| Audit             | administrative evidence                | prototype Audit Entry                      | durable audit evidence lifecycle      | Prototype |

五個 approved 產品 Context 的 owner 均為 `www.a-i.tw Product Team`。Discussions、
Notifications、Search、Activity Feed 與 Audit 只有 in-memory prototype；Apps、Billing、
Sponsors 與 Support 仍是 Research／candidate。

`master-template` 是 architecture fixture，登錄於
[`../architecture/reference-fixtures.json`](../architecture/reference-fixtures.json)，不得出現在產品 Context Map。
