# Bounded Context catalog

狀態：Current / runtime semantic ownership summary

| Context                       | Purpose                                | Owns                                                                                  | Does not own                                      | Lifecycle |
| ----------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| Authentication Security       | authenticate and attribute Principals  | Principal, authentication and in-memory Session facts                                 | Account, Profile, Repository decisions            | Approved  |
| User Account                  | User Account identity and lifecycle    | Personal Account identity, handle and Principal reference                             | Profile, Membership, authentication               | Approved  |
| Organization Account          | Organization identity and lifecycle    | Organization Account identity, handle and owner eligibility                           | Profile, Membership, Team, policy                 | Approved  |
| Enterprise Account            | Enterprise identity and affiliation    | Enterprise identity, lifecycle and Organization affiliation                           | Organization resources, roles, policy             | Approved  |
| Profile & Presence            | Account presentation                   | Account Profile presentation state                                                    | Account identity, authentication, authority       | Approved  |
| Organization Participation    | Organization relationships             | Membership, Invitation and Organization Team                                          | Account lifecycle, Repository Role                | Approved  |
| Administrative Access Control | administrative role assignment         | Enterprise and Organization administrative access facts                               | resource-specific action or policy                | Approved  |
| Policy Governance             | enforceable governance constraints     | policy constraints and delegation                                                     | administrative role, resource lifecycle           | Approved  |
| Network & Domain Governance   | Enterprise domain ownership proof      | prototype Domain Verification and Verified Domain state                               | identity, authorization, email policy, IP rules   | Prototype |
| Repository                    | non-code product resource container    | identity, Account owner, profile, visibility, state, feature configuration, lifecycle | access grants, Issues, Projects, Webhooks, Stars  | Approved  |
| Issues                        | repository-scoped issue tracking       | Issue, Issue Number, Label, Assignment                                                | Repository grants, Account roster                 | Approved  |
| Projects                      | account-owned work planning            | Project, typed Issue reference, Draft Item                                            | Issue truth, Account membership                   | Approved  |
| Discussions                   | repository Q&A conversation            | Discussion Category, Discussion, Comment and accepted Answer                          | Repository grants, moderation, notifications      | Approved  |
| Knowledge Wiki                | repository long-form documentation     | Wiki, Wiki Page, title/content invariants                                             | Repository lifecycle/grants, Git storage          | Approved  |
| Community Safety              | temporary non-Code interaction control | Repository Interaction Limit, expiry/removal lifecycle and interaction decision       | Repository grants, Issue/Discussion content       | Approved  |
| Social Curation               | User-owned Repository interest         | Repository Star, idempotent star/unstar and `starredAt`                               | Repository state, Watch, Notification, Feed       | Approved  |
| Subscriptions                 | ongoing activity receipt preferences   | Repository Watch, Conversation Subscription and recipient resolution                  | Notification, Inbox state and source resource     | Approved  |
| Notifications                 | recipient attention and Inbox triage   | Notification, Read State, Inbox State, Saved flag and retention decision              | Subscription and source lifecycle                 | Approved  |
| Search & Discovery            | non-Code indexing and navigation query | viewer-scoped Search Document Projection snapshots                                    | source truth, authorization or Result Set truth   | Approved  |
| App Management                | GitHub App registration identity       | Personal Account-owned private GitHub App Registration and presentation configuration | Installation, Authorization, Webhook, Marketplace | Approved  |
| Activity Feed                 | recipient activity stream              | prototype Feed Item                                                                   | source resource truth                             | Prototype |
| Audit                         | administrative evidence                | prototype Audit Entry                                                                 | durable audit evidence lifecycle                  | Prototype |

Approved 產品 Context 的 owner 均為 `www.a-i.tw Product Team`。Activity Feed、Audit 與 Network & Domain
Governance 目前只有 in-memory prototype；其餘 16 個 planned descriptors 仍須獨立通過 promotion gate。

完整 logical owner inventory（包含尚未 scaffold 的 Repository Governance、Knowledge、
Community Safety、Subscription、Social Graph、App Registry／Installation、Webhook Delivery 等）由
[`../product/github-non-code-semantic-model.md`](../product/github-non-code-semantic-model.md) 管理。本表只描述現有 runtime，
不得用 runtime 缺口反向否定官方語意 owner。
