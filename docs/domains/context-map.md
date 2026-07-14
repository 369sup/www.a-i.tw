# Domain context map

狀態：Current / approved in-memory vertical slice

Identity & Access、Account、Authorization & Policy、Enterprise Governance、Repository、Issues、Projects、Discussions、Knowledge Wiki、Community Safety、Social Curation、Subscriptions、Notifications 與 Search & Discovery 已核准為 runtime bounded contexts，owner 均為
`www.a-i.tw Product Team`。第一階段以同步、in-process published language 與
context-owned ACL 協作；in-memory adapters 是明確的示範交付限制。

## Strategic Context Map

此 Map 有十四個策略節點：Product、Identity & Access、Account、Authorization & Policy、Enterprise Governance、Repository、Issues、Projects、Discussions、Knowledge Wiki、Community Safety、Social Curation、Experience
及 Platform。十一個產品 Context 已核准；Experience 與 Platform
仍是 app 與 operations owner，不建模為產品 Context。

Enterprise Governance 是獨立 Context：它關聯並治理多個 Organization；不登入、不承載 credential、
不擁有 Repository，也不回傳最終 Repository authorization decision。

世界模型中的 Identity、Authorization、Policy、Capability、Event、Notification、Search、Audit
與 Integration 是橫切責任分類，不自動構成新的 Context 或中央服務。實際 fact、decision、event
與 read model 必須回到其 owning／consuming Context；完整規則見
[`../product/platform-world-model.md`](../product/platform-world-model.md)。

## 初始策略

- `Product`：產品問題、需求與驗收語意。
- `Identity & Access`：已實作 in-memory Principal 與 session baseline；production credential/provider 延後。
- `Account`：已實作 personal／organization Account、namespace、Membership 與 Team lifecycle。
- `Authorization & Policy`：已實作 predefined Repository Role、Principal/Team Access Grant 與 fail-closed non-Code decision。
- `Enterprise Governance`：已實作 Enterprise、Organization affiliation、owner assignment 與 Repository visibility policy。
- `Repository`：核心 owner 是 identity、Account ownership、profile、visibility、state、feature configuration 與
  lifecycle；透過 consumer Port／ACL 使用 Authorization decision。
- `Issues`：已實作 Issue、Issue Number、open/closed state、Label 與 Assignment。
- `Projects`：已實作 Account-owned Project、typed Issue reference、Draft Item 與 owner／Issue validation。
- `Discussions`：已實作 Repository Q&A Category、Discussion、Comment 與 accepted Answer eligibility。
- `Knowledge Wiki`：已實作 Repository-scoped Wiki、Wiki Page、title/content invariants 與 create/read slice。
- `Community Safety`：已實作 public Repository 的 one-day `collaborators_only` Interaction Limit、移除／到期與 fail-closed interaction decision。
- `Social Curation`：已實作 authenticated User 的 idempotent Repository Star、`starredAt` 與 access-filtered owner list。
- `Search & Discovery`：已實作 authenticated viewer-scoped Search Document Projection snapshot 與非 Code command-palette query；Result Set 只是衍生 Application output。
- `Experience`：Next.js route、shadcn UI 與 view model（presentation owner）。
- `Platform`：部署、可觀測性與交付工具（operations owner）。

### 策略關係

```text
Identity & Access ──PrincipalRefV1 / AuthenticatedPrincipalV1──> Account
Identity & Access ──AuthenticatedPrincipalV1──> Repository
Identity & Access ──IdentityDirectoryApiV1──> Authorization & Policy
Account ──AccountDirectoryApiV1──> Authorization & Policy
Account ──Published Language: AccountEligibilityV1 / AccountRefV1──> Repository
Authorization & Policy ──AuthorizationPolicyApiV1──> Repository
Repository ──RepositoryCollaborationScopeV1 / RepositoryParticipationDecisionV1──> Issues ACL
Repository ──RepositoryCollaborationScopeV1 / RepositoryParticipationDecisionV1──> Discussions ACL
Repository ──RepositoryCollaborationScopeV1 / RepositoryParticipationDecisionV1──> Knowledge Wiki ACL
Repository ──RepositoryParticipationApiV1──> Community Safety ACL
Community Safety ──CommunitySafetyApiV1──> Issues / Discussions ACL
Repository ──RepositoryParticipationApiV1──> Social Curation ACL
Identity & Access ──PrincipalRefV1──> Issues
Account ──AccountDirectoryApiV1──> Projects ACL
Issues ──IssueDirectoryApiV1──> Projects ACL
Account ──AccountDirectoryApiV1──> Enterprise Governance ACL
Enterprise Governance ──EnterpriseRepositoryGovernanceApiV1──> Repository ACL
```

| Upstream               | Downstream             | Pattern                                                             | Contract / ACL owner                                                                                      | Consistency and failure semantics                                                            |
| ---------------------- | ---------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Identity & Access      | Account                | Open Host Service + Published Language                              | Identity & Access owns minimal principal facts; Account owns membership translation                       | invalid or unavailable authentication facts cannot create or activate a relationship         |
| Identity & Access      | Authorization & Policy | Open Host Service + Published Language + ACL                        | Identity owns active Principal facts; authorization owns eligibility translation                          | unavailable／invalid facts deny safely                                                       |
| Account                | Authorization & Policy | Customer/Supplier + Published Language + ACL                        | Account owns Membership／Team facts; authorization owns grant interpretation                              | stale or unavailable facts must not become implicit grants                                   |
| Authorization & Policy | Repository             | Open Host Service + Published Language + ACL                        | Authorization owns grant/role/decision; Repository owns resource facts and consumer mapping               | unavailable decisions deny safely                                                            |
| Identity & Access      | Issues                 | Open Host Service + Published Language; Issues owns an ACL          | Identity owns PrincipalRefV1; Issues owns actor/assignee translation                                      | missing or disabled Principal facts deny mutation                                            |
| Repository             | Issues                 | Open Host Service + Published Language; Issues owns an ACL          | Repository owns scope/facade; Authorization owns decision policy; Issues translates participation         | unavailable scope or denied decision fails closed                                            |
| Repository             | Discussions            | Open Host Service + Published Language; Discussions owns an ACL     | Repository owns scope/facade; Authorization owns decision policy; Discussions translates participation    | unavailable scope or denied decision fails closed                                            |
| Repository             | Knowledge Wiki         | Open Host Service + Published Language; Knowledge owns an ACL       | Repository owns Wiki availability/access facade; Knowledge owns Wiki/Page state and command preconditions | disabled/unavailable scope, archived mutation or denied decision fails closed                |
| Repository             | Community Safety       | Open Host Service + Published Language; Safety owns an ACL          | Repository owns visibility/lifecycle/access facade; Safety owns Interaction Limit and decision            | unavailable/private/inactive scope or denied management fails closed                         |
| Community Safety       | Issues                 | Open Host Service + Published Language; Issues owns an ACL          | Safety owns open-Issue interaction decision; Issues owns Issue state                                      | unavailable or denied decision rejects Issue creation                                        |
| Community Safety       | Discussions            | Open Host Service + Published Language; Discussions owns an ACL     | Safety owns comment interaction decision; Discussions owns conversation state                             | unavailable or denied decision rejects Discussion comments                                   |
| Repository             | Social Curation        | Open Host Service + Published Language; Social Curation owns an ACL | Repository owns current read decision; Social Curation owns Repository Star state                         | unavailable, inactive or forbidden Repository access rejects and is omitted from owner lists |
| Account                | Projects               | Customer/Supplier + Published Language; Projects owns an ACL        | Account owns Membership role facts; Projects owns owner translation                                       | missing or non-owner Membership rejects Project mutation                                     |
| Issues                 | Projects               | Customer/Supplier + Published Language; Projects owns an ACL        | Issues owns minimal Issue references; Projects owns planning translation                                  | unknown Issue references are rejected; Projects never copies Issue truth                     |
| Account                | Enterprise Governance  | Customer/Supplier + Published Language; Enterprise owns an ACL      | Account owns Organization eligibility; Enterprise owns affiliation translation                            | inactive or unavailable Organization rejects affiliation                                     |
| Enterprise Governance  | Repository             | Customer/Supplier + Published Language; Repository owns an ACL      | Enterprise owns constraints; Repository owns final decision                                               | unavailable constraints fail closed; unaffiliated owner receives no Enterprise restriction   |

Runtime enforcement uses `IdentityDirectoryAdapter` and `AccountAuthorizationDirectoryAdapter` in Authorization
Infrastructure, `RepositoryAuthorizationAdapter` plus `AccountDirectoryAdapter` in Repository Infrastructure,
`RepositoryParticipationAdapter` in Issues Infrastructure, `RepositoryDiscussionParticipationAdapter` in Discussions Infrastructure,
`RepositorySafetyParticipationAdapter` in Community Safety Infrastructure, Community Safety consumer adapters in Issues and Discussions Infrastructure, and `AccountOwnerDirectoryAdapter` plus
`IssueDirectoryAdapter` in Projects Infrastructure. Consumer Application layers depend only on their local
Ports and Principal input types; provider facade instances are injected by app server composition.
Enterprise integration uses `OrganizationDirectoryAdapter` and `EnterpriseRepositoryGovernanceAdapter` under the same rule.

Identity does not return a `repository:*` decision. Account does not return a Repository Role. Authorization & Policy
owns Repository Access Grant／Role／Permission and combines provider facts. Repository no longer owns grant persistence
or role decision policy; its participation contract is a compatibility facade for Issues.
No Shared Kernel, cross-context entity import, shared ORM model or cross-context transaction is
approved for these candidates.

Strategic relationship 由本文件擁有；runtime existence 由
[`context-map.json`](context-map.json)、各 Context manifest、imports 與 tests 共同證明。
新增 Context 或 internal subdomain 前必須完成 architecture standard 的 Definition of Ready。

新增關係時必須指定 Customer/Supplier、Conformist、ACL、Open Host Service、Published Language、Shared Kernel、Partnership 或 Separate Ways，並記錄契約 owner、版本與失敗處理。

## Issues relationship

`Issues` 擁有 Issue、Label 與 Assignment，並作為 Repository 的 downstream。
關係是 Repository Open Host Service + Published Language，Issues 擁有 ACL；
它只消費穩定 Repository reference/scope/access decision，不 import Repository internals。
此 edge 由 ADR 0005 與版本化 contract 核准；runtime manifest 由 scaffold gate 登錄。

## Discussions relationship

`Discussions` owns Repository-scoped Category, Discussion, Comment and accepted Answer. It consumes
`RepositoryParticipationApiV1` through `RepositoryDiscussionParticipation` and its own ACL; Repository and
Authorization do not own conversation state. The first Q&A slice permits read-level creation/commenting and requires
the Discussion author or Repository `triage+` access to mark an answer.

## Knowledge Wiki relationship

`Knowledge Wiki` owns Repository-scoped Wiki and Wiki Page truth. It consumes
`RepositoryParticipationApiV1` through `RepositoryWikiParticipation` and its own ACL. Repository owns feature
availability and delegates role/grant decisions to Authorization & Policy. Git-backed storage is not part of the
Published Language or Domain Model.

## Community Safety relationship

`Community Safety` owns `RepositoryInteractionLimit`, its one-day expiry/removal lifecycle and the versioned
interaction decision. It consumes Repository visibility, state and access through `RepositorySafetyParticipation`.
Issues and Discussions consume `CommunitySafetyApiV1` through their own identically named local Ports and ACLs; they do
not import Safety internals, and Safety does not own Issue, Discussion or Comment state.

## Social Curation relationship

`Social Curation` owns `RepositoryStar`, idempotent star/unstar behavior and `starredAt`. It consumes
`RepositoryParticipationApiV1` through `RepositoryStarParticipation` and its own ACL, always requesting
`repository:read`. Repository owns current identity, lifecycle, visibility and access; Social Curation filters owner
lists against that current decision and never creates Watch, Notification or Activity Feed state.

`Subscriptions` owns ongoing Repository Watch and Conversation Subscription relationships plus recipient resolution.
`Notifications` owns recipient updates and the orthogonal Inbox dimensions `readState`, `inboxState` and `saved`.
Notifications consumes `SubscriptionManagementApiV1` through its own `ConversationSubscriptionManagement` Port and
`ConversationSubscriptionManagementAdapter`. Marking Done never changes a Subscription; the explicit Inbox
Unsubscribe process deactivates the matching Conversation Subscription before marking the owned Notification done.

## Search & Discovery boundary

Search & Discovery owns viewer-scoped `SearchDocumentProjection` snapshots and Search Query semantics. App composition
maps only Account、Repository、Issue、Project and Discussion facts already visible to the authenticated viewer into a
replacement snapshot. Search does not import source Context internals, persist authorization grants or treat Result Set
as source truth. Qualifiers、ranking、pagination、saved searches and asynchronous indexing remain unapproved.

## Prototype Contexts

- Activity Feed owns recipient-scoped Feed Items.
- Audit owns immutable Audit Entries and structured query.

These Contexts expose isolated in-memory prototypes only. They are not approved semantic slices and do not
gain cross-context edges until owner, invariants, Published Language, failure semantics and tests are approved.
