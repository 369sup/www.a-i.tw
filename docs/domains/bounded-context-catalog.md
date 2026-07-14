# Bounded Context catalog

狀態：Current / approved runtime Contexts

| Context                | Purpose                                | Owns                                                                                  | Does not own                                       | Lifecycle |
| ---------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------- | --------- |
| Identity & Access      | authenticate and attribute Principals  | Principal and in-memory session facts                                                 | Account, Repository decisions                      | Approved  |
| Account                | resource ownership and relationships   | Account, namespace, Membership and Team                                               | authentication, Repository policy                  | Approved  |
| Enterprise Governance  | multi-Organization governance          | Enterprise, affiliation, visibility policy                                            | Organization resources, Repository decision        | Approved  |
| Authorization & Policy | Repository access control              | Repository Role, Repository Access Grant, Authorization Decision                      | authentication, Account/Team, Repository lifecycle | Approved  |
| Repository             | non-code product resource container    | identity, Account owner, profile, visibility, state, feature configuration, lifecycle | access grants, Issues, Projects, Webhooks, Stars   | Approved  |
| Issues                 | repository-scoped issue tracking       | Issue, Issue Number, Label, Assignment                                                | Repository grants, Account roster                  | Approved  |
| Projects               | account-owned work planning            | Project, typed Issue reference, Draft Item                                            | Issue truth, Account membership                    | Approved  |
| Discussions            | repository Q&A conversation            | Discussion Category, Discussion, Comment and accepted Answer                          | Repository grants, moderation, notifications       | Approved  |
| Knowledge Wiki         | repository long-form documentation     | Wiki, Wiki Page, title/content invariants                                             | Repository lifecycle/grants, Git storage           | Approved  |
| Community Safety       | temporary non-Code interaction control | Repository Interaction Limit, expiry/removal lifecycle and interaction decision       | Repository grants, Issue/Discussion content        | Approved  |
| Social Curation        | User-owned Repository interest         | Repository Star, idempotent star/unstar and `starredAt`                               | Repository state, Watch, Notification, Feed        | Approved  |
| Subscriptions          | ongoing activity receipt preferences   | Repository Watch, Conversation Subscription and recipient resolution                  | Notification, Inbox state and source resource      | Approved  |
| Notifications          | recipient attention and Inbox triage   | Notification, Read State, Inbox State, Saved flag and retention decision              | Subscription and source lifecycle                  | Approved  |
| Search & Discovery     | non-Code indexing and navigation query | viewer-scoped Search Document Projection snapshots                                    | source truth, authorization or Result Set truth    | Approved  |
| App Management         | GitHub App registration identity       | Personal Account-owned private GitHub App Registration and presentation configuration | Installation, Authorization, Webhook, Marketplace  | Approved  |
| Activity Feed          | recipient activity stream              | prototype Feed Item                                                                   | source resource truth                              | Prototype |
| Audit                  | administrative evidence                | prototype Audit Entry                                                                 | durable audit evidence lifecycle                   | Prototype |

Approved 產品 Context 的 owner 均為 `www.a-i.tw Product Team`。Activity Feed 與 Audit 只有
in-memory prototype；App Installation、Marketplace、Billing、
Sponsors 與 Support 仍是 Research／candidate。

完整 logical owner inventory（包含尚未 scaffold 的 Repository Governance、Knowledge、
Community Safety、Subscription、Social Graph、App Registry／Installation、Webhook Delivery 等）由
[`../product/github-non-code-semantic-model.md`](../product/github-non-code-semantic-model.md) 管理。本表只描述現有 runtime，
不得用 runtime 缺口反向否定官方語意 owner。
