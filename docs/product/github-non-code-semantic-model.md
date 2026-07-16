# GitHub non-Code semantic model

狀態：Accepted semantic ownership baseline；runtime status separately evidenced；2026-07-15 官方文件複核

## 目的與判斷規則

本文件是 GitHub 非 Code 產品語意的詳細 canonical inventory。它只採用 GitHub Docs 可證明的公開產品行為，
排除 source code、Git、版本控制、Pull Request／code review、CI/CD、Actions、Codespaces、Copilot、SSH、
Packages、Release 與 code-centric security scanning。

官方頁面、導覽、URL、API、GraphQL type、payload 與資料表都不是 Domain boundary。每個概念必須先有：

```text
official behavior and constraints
→ business definition and lifecycle
→ invariant and relationship
→ exactly one semantic owner
→ tactical classification
→ runtime gate
```

狀態定義：

- `Confirmed`：官方文件足以支持定義、boundary 與 owner 判斷。
- `Partial`：概念成立，但 lifecycle、限制或 owner 拆分仍需更多官方證據。
- `Pending verification`：不得建立 runtime artifact。
- `Excluded`：其官方核心語意落在本產品明確排除範圍。

## Accepted complete product-suite navigation taxonomy

若產品範圍從核心 GitHub 非 Code 協作平台擴張到 Education、Certifications 與 Developer Program，完整候選
portfolio 採用 6 Groups、12 Areas、37 physical Context descriptors，其中 20 個具 runtime evidence、17 個維持
`planned`。此數量是 navigation／ownership inventory，並非完整產品能力聲明；[ADR 0014](../decisions/0014-complete-github-non-code-portfolio-taxonomy.md) 擁有 taxonomy
decision，`context-topology-migration.json` 擁有 executable migration status。

```text
platform-governance/
├── accounts-profile/{user-account,organization-account,enterprise-account,profile-presence}
├── authentication-identity/{authentication-security,enterprise-identity-management}
├── participation-teams/{organization-participation,enterprise-participation}
└── access-policy/{administrative-access-control,policy-governance,network-domain-governance}
collaboration/
├── repository-work/{repository-governance,work-tracking,work-planning}
└── community-knowledge/{discussions,community-safety,repository-wiki}
engagement/
└── social-discovery/{social-curation,subscriptions-notifications,activity-feed,search-discovery}
ecosystem/
└── apps-marketplace/{app-management,webhook-delivery,marketplace}
business-operations/
├── commercial/{plan-entitlement-licensing,billing-payments,usage-cost-management,sponsorship}
└── assurance-support/{audit-compliance,support-management}
programs/
├── education/{education-eligibility,campus-program,campus-experts,community-exchange,classroom-management}
└── professional-programs/{certification,developer-program}
```

| Domain Group          | Domain Areas | Candidate Bounded Contexts |
| --------------------- | -----------: | -------------------------: |
| `platform-governance` |            4 |                         11 |
| `collaboration`       |            2 |                          6 |
| `engagement`          |            1 |                          4 |
| `ecosystem`           |            1 |                          3 |
| `business-operations` |            2 |                          6 |
| `programs`            |            2 |                          7 |
| **Total**             |       **12** |                     **37** |

`engagement`／`ecosystem` 的分組分離與 `participation-teams` Area 的引入只改善 navigation，不能被解讀成 runtime
dependency。Personal／Managed User 是 `user-account` 的控制模式；Organization／Enterprise participation 具有不同
membership、team 與 affiliation lifecycle，才是待 G1-G3 驗證的 owner split。Programs 的 Group／Area 是
governance-only reservation；七個候選 Context 全部是 Research，不得預先建立 Context directory。

目前 18 個 runtime Context 保留原 Context ID、Published Language 與行為，只遷移到 ADR 0014 的 primary Area。
候選 taxonomy 與現況 runtime 名稱不要求一對一；任何 rename、split 或 merge 仍須通過正式 boundary-change
workflow。

## Semantic owner registry

這是 logical ownership map，不表示每個 Context 已有 runtime directory。

| Unique owner                     | Owns                                                                                                             | Explicitly does not own                                   |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Account & Profile                | Personal Account、public Profile、account lifecycle                                                              | authentication、Organization Membership、resource access  |
| Organization Directory           | Organization、Membership、Invitation、Outside Collaborator、Team、Team Membership                                | Repository role、enterprise policy                        |
| Enterprise Governance            | Enterprise、Organization affiliation、enterprise role/policy assignment                                          | Organization content、Repository core                     |
| Authentication                   | Credential、authentication factor、Session、recovery challenge                                                   | Account ownership、authorization decision                 |
| Identity Federation              | IdP connection、External Identity、SAML/OIDC authentication、SCIM provisioning                                   | product role、Repository permission                       |
| Authorization & Policy           | Permission、custom/predefined role definition、role/access assignment、authorization decision                    | Principal authentication、resource lifecycle              |
| Repository                       | identity、Account owner、profile、visibility、state、feature/configuration、lifecycle                            | access grant、Issue、Project、Webhook、Star、Audit        |
| Repository Governance            | Custom Property definition/value and non-Code Repository policy constraints                                      | Repository core、code-centric Ruleset internals           |
| Issue Management                 | Issue、Comment、Label、Milestone、Assignee relation、hierarchy/dependency、Issue Type/Field                      | Project item、notification                                |
| Discussion Management            | Discussion、Category、Comment、Answer、Reaction、Poll                                                            | Issue、Wiki、notification delivery                        |
| Project Management               | Project、Item、Draft Issue、Field、View、Workflow、Template、Status Update、Insight                              | referenced Issue truth、Repository core                   |
| Knowledge                        | Wiki、Wiki Page、navigation/content policy                                                                       | Repository lifecycle、Git-backed storage detail           |
| Community Safety                 | interaction limits、conversation moderation、block/report/enforcement                                            | generic authorization role、source conversation truth     |
| Subscription                     | Watch、conversation subscription、event preference                                                               | delivered Notification、Inbox state                       |
| Notification                     | Notification Thread、reason、delivery preference/attempt、Inbox triage state                                     | Watch relationship、source resource state                 |
| Activity & Reputation            | Feed Item、contribution/achievement projection                                                                   | source Domain event or resource truth                     |
| Social Graph                     | Follow、Star                                                                                                     | Repository state、Notification                            |
| Audit & Compliance               | Audit Entry、query/export/stream and evidence retention                                                          | source Aggregate lifecycle、operational log               |
| App Registry                     | GitHub App/OAuth App registration and requested permission vocabulary                                            | installation、user authorization、Marketplace commerce    |
| App Installation & Authorization | App Installation、repository selection、granted permissions、user app authorization                              | App definition、Repository membership                     |
| Webhook Delivery                 | Webhook Subscription、Delivery、Attempt、redelivery state                                                        | source Domain event、Repository Aggregate                 |
| Search & Discovery               | access-filtered Search Document、Query、Result Set、ranking/projection                                           | indexed source truth、authorization grant                 |
| Education Eligibility            | student／teacher application、eligibility evidence、verification and benefit grant lifecycle                     | Classroom、Campus institution、generic entitlement        |
| Campus Program                   | institution application、partnership、qualified-user program and annual benefit lifecycle                        | Organization／Enterprise account lifecycle                |
| Campus Experts                   | student leader application、training progress、community impact proposal and program membership lifecycle        | Campus institution partnership、generic profile lifecycle |
| Community Exchange               | eligible community access、Repository submission metadata、discovery listing and submission moderation lifecycle | Repository content、generic Search index                  |
| Classroom Management             | Classroom、roster、individual/group Assignment metadata、deadline、progress and LMS linkage                      | template/source repository、autograding、PR feedback      |
| Certification                    | certification catalog、exam registration／appointment and awarded credential lifecycle                           | training content、GitHub account profile                  |
| Developer Program                | individual/company application、integration evidence、support contact and membership status                      | App Registration、API integration runtime                 |

The physical portfolio currently co-locates `RepositoryRoleDefinition` and `RepositoryAccessGrant` with
`repository-governance` as the dated result of the completed `authorization-policy` runtime merge. That placement is a
runtime fact, not a change to the logical owner recorded above. New Repository access semantics require a boundary
decision rather than treating physical co-location as semantic ownership.

## Accounts, people, organizations and enterprise

| Concept                 | Definition and lifecycle / invariant                                                                                               | Classification                          | Unique owner           | Allowed relations                                                             | Forbidden attribution                                 | Evidence   | Status    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------- | ---------- | --------- |
| Person                  | Real human represented by a sign-in-capable personal or managed user account; Person is not itself a GitHub resource container.    | External actor reference                | Account & Profile      | may control one Account identity; may hold Membership/role assignments        | Organization、Team、Repository child                  | A1, A6     | Partial   |
| Personal Account        | User-controlled GitHub account that can authenticate and own resources.                                                            | Aggregate                               | Account & Profile      | has Profile; owns Repository/Project; authenticates through Principal         | Organization Membership or Session                    | A1         | Confirmed |
| Managed User Account    | Enterprise-controlled user account provisioned and authenticated through IdP; profile and lifecycle are externally controlled.     | Aggregate / externally governed account | Account & Profile      | linked to External Identity; participates only within enterprise restrictions | normal password/2FA owner; Organization               | A6         | Confirmed |
| Organization            | Shared account for collaboration; cannot sign in and is acted on by people through Membership/roles.                               | Aggregate                               | Organization Directory | has Memberships、Teams、Repositories、Projects、Discussions                   | Principal、Session、Team                              | A1, A2     | Confirmed |
| Enterprise              | Governance account containing Organizations and applying enterprise roles and policies.                                            | Aggregate                               | Enterprise Governance  | affiliates Organizations; assigns enterprise roles                            | direct Repository owner; Organization synonym         | A5, A6     | Confirmed |
| Profile                 | Public/private presentation facts controlled by a personal or managed account subject to privacy/IdP restrictions.                 | Entity / profile aggregate component    | Account & Profile      | projects contribution/activity facts                                          | Credential、authorization state                       | ACT1, ACT2 | Confirmed |
| Organization Membership | Relationship between a user account and Organization with invitation, active, removed and reinstatement lifecycle.                 | Aggregate relationship                  | Organization Directory | prerequisite for Team Membership; carries organization member/owner role      | Repository Access Grant                               | A2, A4     | Confirmed |
| Membership Invitation   | Time-bounded proposal to establish Membership; acceptance is not the same state as active Membership.                              | Entity / process object                 | Organization Directory | targets user/email and Organization                                           | Notification delivery                                 | A2         | Partial   |
| Outside Collaborator    | Person with access to one or more Organization repositories but no Organization Membership.                                        | Relationship classification             | Organization Directory | may receive Repository Access Grant                                           | Organization member、Team member                      | A4         | Confirmed |
| Team                    | Organization-member group used for access assignment and mentions; may be visible/secret and nested under documented restrictions. | Aggregate                               | Organization Directory | contains Team Memberships; receives role/access assignments                   | Repository child、Organization Membership replacement | A3         | Confirmed |
| Team Membership         | Relationship between active Organization Membership and Team.                                                                      | Entity / relationship                   | Organization Directory | references Membership and Team                                                | Repository role                                       | A3         | Confirmed |
| Organization Role       | Organization-scoped permission bundle such as owner/member or custom administration role.                                          | Value / role assignment vocabulary      | Authorization & Policy | assigned to people/teams under Organization scope                             | Membership identity、Repository Role                  | A4         | Confirmed |
| Enterprise Role         | Enterprise-scoped predefined/custom permission bundle.                                                                             | Aggregate definition + assignment       | Authorization & Policy | assigned to eligible users/teams; constrained by enterprise rules             | automatic Organization/Repository access              | A5         | Confirmed |

## Identity, authentication, authorization and policy

| Concept | Definition and lifecycle / invariant | Classification | Unique owner | Allowed relations | Forbidden attribution | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Principal | Authenticated or attributable actor identity used by application decisions. | Entity | Authentication | maps to personal/managed account or App actor | Account、role、permission bundle | A6, INT1 | Partial |
| Credential | Secret or cryptographic proof used to begin authentication. | Entity / secret-bearing value | Authentication | verifies Principal | Profile、Repository permission | A7 | Partial |
| Authentication Factor | Password-independent proof such as TOTP, SMS, security key, passkey or verified mobile factor. | Value / Entity by lifecycle | Authentication | contributes assurance; may be enrolled/revoked | Organization role | A7 | Confirmed |
| Recovery Method | One-time or fallback mechanism for regaining account access; loss of all valid methods can be terminal. | Entity / Policy | Authentication | recovery code、passkey、security key、verified device | normal Session、Support override | A8 | Confirmed |
| Session | Time-bounded authenticated continuity that can expire or be terminated. | Aggregate | Authentication | references Principal and assurance | Account Membership、authorization grant | A7 | Partial |
| Identity Provider Connection | Enterprise/Organization configuration that defines external authentication/provisioning authority. | Aggregate | Identity Federation | uses SAML/OIDC and optionally SCIM | product role definition | A6 | Confirmed |
| External Identity | Link between GitHub account and IdP subject; required for SSO/provisioned lifecycle. | Entity | Identity Federation | links managed/personal account to IdP | Account itself、Membership | A6 | Confirmed |
| Provisioning Relationship | SCIM-controlled create/update/deprovision/reinstate lifecycle for managed accounts/groups. | Process Manager / relationship | Identity Federation | updates managed account and mapped Team relationships | GitHub local credential | A6 | Confirmed |
| Permission | Ability to perform one specific action within a named scope. | Value Object | Authorization & Policy | composed into Role; evaluated against resource facts | free-form global string、Membership | A4 | Confirmed |
| Role Definition | Named set of permissions within enterprise、organization、team、repository or app scope. | Aggregate | Authorization & Policy | has scope and assignment rules | universal role hierarchy | A4, A5 | Confirmed |
| Role Assignment | Time/state-bound relationship assigning a Role Definition to eligible Principal or Team. | Aggregate relationship | Authorization & Policy | references role、subject、scope | Membership replacement | A4, A5 | Confirmed |
| Repository Access Grant | Principal/Team-to-Repository access relationship carrying repository-scoped role/permission facts. | Aggregate relationship | Authorization & Policy | references Repository and eligible subject | Repository child Entity、Repository Membership | A3, A4 | Confirmed |
| Authorization Decision | Point-in-time allow/deny result from actor、assignment、policy and resource facts; not reusable as a permanent grant. | Domain Service result / Value | Authorization & Policy | consumes published facts from resource owners | stored Repository state、UI decision | A4, INT1 | Confirmed |
| Governance Policy | Enterprise/Organization constraint that narrows permitted configuration or assignments. | Policy | owning governance Context; evaluated by Authorization & Policy where access-related | targets Organization/Repository/App facts | role、permission、resource Aggregate | A5, A6 | Partial |

## Repository core and Repository-scoped external models

| Concept | Definition and lifecycle / invariant | Classification | Unique owner | Allowed relations | Forbidden attribution | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Repository | Product resource container owned by Personal Account or Organization. | Aggregate | Repository | scopes Issues/Discussions/Wiki; associates Projects; is target of access/integration/audit/social relations | workspace、Git store、owner of scoped external models | R1 | Confirmed |
| Repository Owner Reference | Exactly one Personal Account or Organization owner; Enterprise is not direct owner. | Value Object | Repository | references Account published identity | Principal、Team、Enterprise owner | A1, R1 | Confirmed |
| Repository Name / Name With Owner | Owner-namespace-local name and derived route address; rename does not create new Repository identity. | Value Objects | Repository | combined with owner login | RepositoryId、global name | R1 | Confirmed |
| Repository Profile | Description、homepage and topics that present the Repository. | Entity / Value collection | Repository | feeds Search/Activity read models | Wiki、README source file | R1 | Partial |
| Repository Visibility | Public/private/internal discovery boundary; internal is enterprise-governed. | Value Object / Policy input | Repository | constrained by Enterprise Governance and authorization | role、Membership status | R1, A5 | Confirmed |
| Repository State | Active/archived is the owner-managed availability state. `isDisabled` is only an externally reported provider fact: official schemas expose it but publish no user-controlled disable/enable transition, so it cannot be normalized into the same lifecycle enum. | Value Object + external observation | Repository | archived state constrains mutation; provider restriction may fail closed at an integration boundary | visibility、access decision、documented disable command | R5, R8 | Confirmed archive subset / provider transition pending |
| Feature Configuration | Enables Issues、Discussions、Wiki、Projects or other optional surfaces without transferring their data ownership. | Configuration | Repository | references capability owners | child Aggregate ownership | R2 | Confirmed |
| Community Configuration | Repository-scoped code-of-conduct/support/contribution/discussion guidance references. | Configuration / association | Repository | consumed by Community/Discussion/Issue experiences | source conversation or Wiki truth | R2, D2 | Partial |
| Repository Lifecycle | Create、rename、visibility change、archive/unarchive and transfer act on a live Repository. Delete removes the live Repository; a separate deletion record may become restorable for 90 days, subject to fork-network constraints, and restoration does not restore Team permissions. | Aggregate behavior + retained deletion record | Repository | validates target Account, policy, fork-network and downstream compatibility | `deleted` as a normal live Repository state、permanent Transfer child Entity | R1, R5, R6, R7 | Confirmed non-Code archive/delete/restore subset |
| Custom Property Definition | Organization-defined typed metadata schema applied to repositories, possibly required/defaulted. | Aggregate | Repository Governance | targets repositories in defining Organization | Repository core field、global Metadata | R3 | Confirmed |
| Custom Property Value | Value for an Organization-defined property on one Repository, with inherited/default/explicit semantics. | Entity / Value | Repository Governance | references definition and Repository | Repository Profile field | R3 | Confirmed |
| Interaction Limit | Time/scoped restriction on who may interact with public conversations. | Policy | Community Safety | targets Organization/Repository conversations | Repository lifecycle state | A4, D2 | Partial |
| Ruleset | Official core controls branch/tag/push behavior; most semantics are Code-related and excluded. Repository rename restriction alone is insufficient to retain the complete Ruleset model. | Excluded aggregate; non-Code constraint pending extraction | Pending verification | may constrain Repository rename if independently evidenced | Repository child、generic non-Code governance aggregate | R4 | Excluded / partial exception |
| Project Repository Association | Project may reference or auto-add items from repositories; association does not make Project a Repository child. | Aggregate relationship | Project Management | references Project and Repository | Repository field | P1 | Confirmed |

### Repository lifecycle matrix

| Fact or operation             | Semantic result                                                                                                                                                                                                     | Identity and relationship consequences                                                                                                    | Modeling rule                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Archive                       | Repository remains addressable but becomes read-only until an authorized actor unarchives it.                                                                                                                       | Collaborators and Teams cannot be added or removed while archived; existing permissions and Repository-scoped resources remain read-only. | Reversible live-Repository state owned by Repository.                                            |
| Delete                        | Live Repository is removed. Public forks remain; deleting a private Repository deletes its forks; Team permissions are permanently deleted. Organization/enterprise policy may prevent deletion.                    | The deleted Repository must not continue as an active Aggregate with mutable children.                                                    | Command plus retained deletion/restoration record, not a `deleted` value in the live state enum. |
| Restore                       | An eligible deleted Repository may be restored within 90 days. It can take up to one hour to appear as restorable; a non-empty fork network blocks self-service restoration, and Team permissions are not restored. | Restoration reconstructs a live Repository subject to current ownership/access policy; it does not rewind every relationship.             | Separate restoration process consuming retained deletion facts.                                  |
| Provider-disabled observation | REST/GraphQL Repository representations expose `disabled`/`isDisabled`, but official product documentation defines no Repository owner/admin disable or enable operation and no public transition matrix.           | The fact may be used conservatively by an integration ACL, but its cause and recovery cannot be inferred.                                 | External provider observation only; do not invent a user-controlled Domain transition.           |

## Issues

| Concept | Definition and lifecycle / invariant | Classification | Unique owner | Allowed relations | Forbidden attribution | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Issue | Repository-scoped work item with stable identity/number, title/body and open/closed outcome. | Aggregate | Issue Management | has comments、labels、milestone、assignees、type/field values | Repository child Entity、Project Item | I1 | Confirmed |
| Issue Number | Human-readable identifier unique only within one Repository. | Value Object | Issue Management | combined with Repository reference | global Issue identity | I1 | Confirmed |
| Issue Comment | Ordered conversation contribution attached to one Issue. | Entity | Issue Management | authored by Principal; receives reactions/mentions | Discussion Comment、Notification | I1 | Confirmed |
| Label | Repository-scoped categorization definition assignable to Issues. | Aggregate / Entity | Issue Management | many-to-many with Issues | Project field、global taxonomy | I1 | Confirmed |
| Milestone | Repository-scoped date/goal grouping that tracks progress from associated Issues. | Aggregate | Issue Management | groups Issues | Release、Project status | I1 | Confirmed |
| Assignment | Responsibility relationship between eligible user and Issue; multiple assignees are bounded. | Entity / relationship | Issue Management | references Principal eligibility | Repository collaborator entity、Role Assignment | I2 | Confirmed |
| Parent/Sub-issue Relationship | Directed Issue hierarchy; one child has at most one parent and official depth/count limits apply. | Aggregate relationship / Policy | Issue Management | may cross repositories | Project hierarchy ownership | I3 | Confirmed |
| Issue Dependency | Directed blocking/blocked-by relationship between Issues. | Aggregate relationship | Issue Management | references two Issues | Project workflow edge | I1 | Confirmed |
| Issue Type | Organization-level work classification applied to Issues; defaults can be edited/disabled/deleted. | Aggregate definition | Issue Management | scoped to Organization and applied to its Issues | Repository label、Project field | I4 | Confirmed |
| Issue Field Definition / Value | Organization-level typed metadata available across its Issues; definition lifecycle differs from individual Issue values. | Aggregate definition + Entity value | Issue Management | visible in Projects without transfer of ownership | Project custom field | I5 | Confirmed |
| Issue Dashboard / Saved View | Viewer-aware cross-Repository projection and saved filtering state. | Read Model / user preference | Issue Management | queries accessible Issues | Aggregate or Repository collection owner | I1 | Partial |

## Discussions, knowledge and community

| Concept | Definition and lifecycle / invariant | Classification | Unique owner | Allowed relations | Forbidden attribution | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Discussion | Open forum conversation scoped to Repository or Organization. | Aggregate | Discussion Management | belongs to Category; has comments/reactions/poll/answer semantics | Issue、Repository child Entity | D1, D2 | Confirmed |
| Discussion Scope | Repository or Organization reference determining category set and visibility. | Value Object | Discussion Management | references scope owner | ownership transfer to Repository/Organization | D1 | Confirmed |
| Discussion Category | Scope-local classification with unique name/emoji and format: open、Q&A、announcement or poll. | Aggregate / Entity | Discussion Management | classifies Discussions | Label、Project field | D1 | Confirmed |
| Discussion Comment / Reply | Conversation contribution attached to Discussion or another comment under documented nesting rules. | Entity | Discussion Management | authored by Principal; receives reactions | Issue Comment、Notification | D2 | Partial |
| Answer | One Discussion comment marked as accepted answer in Q&A semantics. | Relationship / state transition | Discussion Management | requires Q&A category | generic reaction、Issue closure | D1 | Confirmed |
| Reaction | Actor-to-content response relationship. | Entity / relationship | source conversation Context | references Discussion/Issue comment | Social Graph follow/star | D1 | Partial |
| Poll / Vote | Poll-format Discussion choices and actor votes. | Entity + relationship | Discussion Management | exists only for poll category | Project field | D1 | Confirmed |
| Wiki | Repository-scoped long-form knowledge space with independent page/access lifecycle. | Aggregate | Knowledge | references Repository scope and access facts | Repository Profile、source-code directory | K1 | Confirmed |
| Wiki Page | Named long-form content with navigation and history; Git-backed storage details are excluded. | Entity | Knowledge | belongs to Wiki | Repository file、Issue Comment | K1 | Confirmed |
| Conversation Moderation | Lock、hide、report and enforcement actions on conversations. | Policy / process | Community Safety | references source content without owning it | source Comment state owner、Authorization Role | D2, A4 | Partial |

## Projects

| Concept | Definition and lifecycle / invariant | Classification | Unique owner | Allowed relations | Forbidden attribution | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Project | User- or Organization-owned planning resource supporting table、board and roadmap views. | Aggregate | Project Management | contains Items/Views/Fields/Workflows; references Issues | Repository child、Issue collection | P1 | Confirmed |
| Project Item | Membership/reference of Issue or Draft Issue in Project; referenced Issue truth remains upstream. | Entity / relationship | Project Management | points to Issue contract or Draft Issue | duplicate Issue Aggregate | P1 | Confirmed |
| Draft Issue | Project-local idea/work item that is not yet a Repository Issue. | Entity | Project Management | may be converted to Issue under explicit process | Issue before conversion | P1 | Confirmed |
| Project Field | Project-local typed metadata definition/value except upstream Issue fields. | Aggregate component | Project Management | applies to Project Items | Organization Issue Field | P1, I5 | Confirmed |
| Project View | Saved filter/sort/group/layout configuration over Project Items. | Read Model configuration | Project Management | table/board/roadmap layouts | Aggregate source truth | P1 | Confirmed |
| Project Workflow | Built-in rule reacting to Project/Item facts to update fields/archive/add items. | Policy / process manager | Project Management | consumes Project events and repository query criteria | CI/CD workflow、Actions | P1 | Confirmed non-Code subset |
| Project Template | Reusable Project configuration snapshot including views/fields/drafts/workflows/insights under documented exclusions. | Aggregate / template | Project Management | creates Projects | live Project clone identity | P1 | Confirmed |
| Project Status Update | Dated high-level project health/message with start/target dates. | Entity | Project Management | belongs to Project | Issue state、Milestone | P1 | Confirmed |
| Project Insight | Chart definition and projection over Project Items. | Read Model | Project Management | consumes Project data | Audit/analytics source truth | P1 | Confirmed |

## Subscription, notification, activity and social relationships

| Concept | Definition and lifecycle / invariant | Classification | Unique owner | Allowed relations | Forbidden attribution | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Watch Subscription | User preference to subscribe to selected Repository activity categories, with watch/custom/ignore states. | Aggregate relationship | Subscription | references Repository and event preferences | Repository field、Notification | N1 | Confirmed |
| Conversation Subscription | Automatic/manual subscription to Issue/Discussion conversation; participation and mention can establish it. | Aggregate relationship | Subscription | references source conversation | source Comment、Inbox state | N1, N3 | Confirmed |
| Notification Thread | Recipient-specific update thread created from source activity and subscription/mention reasons. | Aggregate | Notification | references source resource and reason | source Issue/Discussion state | N1 | Confirmed |
| Notification Reason | Why recipient received update: assignment、author、comment、participation、invitation、manual、mention、team mention or state change in included domains. | Value Object | Notification | derived from source facts/subscription | authorization reason、Domain Event type | N2 | Confirmed non-Code subset |
| Inbox Triage State | Recipient state such as unread/read、saved、done and unsubscribe action. | Entity / Value | Notification | belongs to Notification Thread | source resource lifecycle | N1, N2 | Confirmed |
| Delivery Preference / Attempt | On-GitHub/mobile/email channel preference and actual delivery/synchronization attempt. | Configuration + Entity | Notification | consumes Notification Thread | Subscription、webhook delivery | N1 | Confirmed |
| Activity Event | Published occurrence owned by source Context; only non-Code events enter this model. | Domain Event | source Context | consumed by Activity/Audit/Notification | Activity Feed source truth | ACT1 | Confirmed |
| Feed Item | Recipient/viewer-specific projection of visible Activity Events. | Read Model | Activity & Reputation | references source event/resource | source Aggregate、authorization grant | ACT1, ACT2 | Confirmed |
| Contribution / Achievement Projection | Privacy- and access-filtered profile projection derived from qualifying events; code-derived contribution kinds are excluded. | Read Model | Activity & Reputation | references Account/Profile and non-Code events | Account lifecycle、Domain Event owner | ACT1, ACT2 | Partial |
| Star | User-to-Repository interest/bookmark relationship. | Aggregate relationship | Social Graph | references Repository | Repository field、Watch Subscription | ACT1 | Confirmed |
| Follow | User-to-user social relationship affecting discovery/activity visibility. | Aggregate relationship | Social Graph | references Accounts | Membership、authorization grant | ACT2 | Confirmed |

## Audit, applications, webhooks and search

| Concept | Definition and lifecycle / invariant | Classification | Unique owner | Allowed relations | Forbidden attribution | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Audit Entry | Immutable administrative evidence containing action category/operation, actor, scope, subject and timestamp. | Aggregate / immutable record | Audit & Compliance | references source facts and request metadata | source Domain Event、operational log | AU1 | Confirmed |
| Audit Query / Export / Stream | Access-controlled retrieval or delivery of Audit Entries with retention/export semantics. | Query service / read model / process | Audit & Compliance | reads Audit store | mutation of source Aggregate | AU1 | Partial |
| App Registration | Definition and ownership of GitHub App or OAuth App, requested permissions and presentation/callback configuration. | Aggregate | App Registry | installed or authorized separately | Installation、authorization token | INT1, INT2 | Confirmed |
| App Installation | Account-scoped grant installing one GitHub App with repository selection and granted permissions; suspend/uninstall lifecycle. | Aggregate | App Installation & Authorization | references Personal Account/Organization、App、Repository selection | Repository Membership、App definition | INT1, INT2 | Confirmed |
| App User Authorization | User consent allowing App to identify/act on behalf of user; independent from installation and revocable. | Aggregate relationship | App Installation & Authorization | references App、Principal and granted account permissions | Session、Installation synonym | INT1, INT2 | Confirmed |
| OAuth App Authorization | User-to-OAuth-App consent constrained by scopes and user's own permissions; revocable. | Aggregate relationship | App Installation & Authorization | references App and organizations subject to policy/SSO | GitHub App Installation | INT3 | Confirmed |
| App Permission Set | Named account/repository permissions requested/granted to App; changes require approval. | Value collection / Policy input | App Registry for requested; Installation for granted snapshot | evaluated with actor/resource access | Repository Role、OAuth scope synonym | INT1, INT2 | Confirmed |
| Repository Selection | All or selected repositories available to one App Installation. | Value Object / relationship set | App Installation & Authorization | references Repository identities | Repository child、collaborator grant | INT2 | Confirmed |
| Webhook Subscription | Resource-scoped event subscription created for Repository、Organization、Marketplace、Sponsors or GitHub App; no user-account webhook. | Aggregate | Webhook Delivery | references source scope and event types | Repository/App child Aggregate | W1 | Confirmed |
| Webhook Delivery | One emitted payload delivery for subscribed event. | Aggregate / Entity | Webhook Delivery | references Subscription and source event envelope | source Domain Event | W1 | Confirmed |
| Delivery Attempt / Redelivery | Retryable attempt lifecycle for one Webhook Delivery. | Entity / process | Webhook Delivery | belongs to Delivery | Notification delivery | W1 | Partial |
| Search Query | User expression with scope、qualifiers and filters over included product types. | Value Object | Search & Discovery | selects repositories/users/issues/discussions/wikis as officially supported | SQL/API request type、Code Search query | S1 | Partial |
| Search Document | Access-filtered denormalized projection of provider-published facts. | Read Model | Search & Discovery | references source identity/version | source of truth、shared entity | S1 | Confirmed architectural interpretation |
| Search Result Set | Ranked/paginated viewer-specific projection; must not reveal inaccessible resources. | Read Model | Search & Discovery | consumes Query、index and authorization facts | authorization grant、Aggregate | S1 | Partial |

## Programs product family

| Concept | Definition and lifecycle / invariant | Classification | Unique owner | Allowed relations | Forbidden attribution | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Education Application | Student or teacher request that must carry current eligibility/affiliation evidence and reach an approval decision before benefits become available. | Aggregate / process | Education Eligibility | references Personal Account and evidence | generic Account status、Support Ticket | EDU1, EDU2 | Confirmed |
| Education Benefit Grant | Time-bounded access granted after successful verification; student status requires later revalidation. | Aggregate relationship | Education Eligibility | references approved application and product offers | Authorization Role、Classroom membership | EDU1 | Confirmed |
| Campus Program Partnership | Institution-level program participation subject to eligibility, accepted terms, designated administration and recurring program conditions. | Aggregate / process | Campus Program | references institution and Enterprise/Organization facts | Enterprise Account subtype、Education Application | EDU3 | Confirmed |
| Campus Expert Membership | Student-leader program state reached through eligibility, application, training and a community impact proposal. | Aggregate / process | Campus Experts | references verified student Account and training progress | Campus Program partnership、Profile badge truth | EDU5 | Confirmed |
| Community Exchange Submission | Eligible student/faculty submission of a public personal-account Repository for learn/collaborate discovery, with editable listing metadata and community moderation. | Aggregate / process | Community Exchange | references Repository and Education eligibility facts | Repository content、generic Search Document | EDU6 | Confirmed non-Code subset |
| Classroom | Teacher/admin-managed virtual course container with roster and LMS linkage. | Aggregate | Classroom Management | references Organization, teacher and roster identities | Organization Account、Repository | EDU4 | Confirmed non-Code subset |
| Classroom Assignment | Individual/group coursework definition with deadline and progress projection; repository template, submission content, autograding and PR feedback are excluded adapters/integrations. | Aggregate / process | Classroom Management | belongs to Classroom; references roster members | Repository content、Pull Request、autograding workflow | EDU4 | Partial non-Code subset |
| Certification Program / Exam | Named certification offering with registration, appointment and external exam delivery lifecycle. | Aggregate / process | Certification | references candidate Account and exam provider | training content、Account credential | CERT1, CERT2 | Partial |
| Certification Credential | Badge/certificate awarded after successful exam completion and presented through Profile by reference. | Aggregate / issued credential | Certification | references certification result and Account | Profile-owned badge truth、Authorization Grant | CERT1 | Confirmed |
| Developer Program Membership | Individual/company membership requiring an integration in production or development plus a user-facing support contact. | Aggregate / relationship | Developer Program | references applicant and integration evidence | App Registration、App Installation、Support Ticket | DEV1 | Confirmed |

Programs are optional product families rather than prerequisites for the core collaboration platform. Their official existence
does not approve a local Context. Each candidate requires an explicit product outcome, source of truth and first use case;
Classroom must additionally prove that its first slice is useful without repository content, Pull Requests or autograding.

## Explicit exclusions and unresolved questions

| Item                                                               | Disposition                    | Reason / verification needed                                                                                                                                      |
| ------------------------------------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Git repository contents、Commit、Branch、Tag、Fork network         | Excluded                       | Version-control/source-code semantics are outside product scope.                                                                                                  |
| Pull Request、Review、Merge、code review assignment                | Excluded                       | Code-change review lifecycle is explicitly excluded.                                                                                                              |
| Actions workflow/runner/check、deployment、Codespaces、Copilot     | Excluded                       | CI/CD、hosted development and AI coding capabilities are excluded.                                                                                                |
| SSH key、deploy key、Git credential、PAT used for Git              | Excluded                       | Git transport and credential mechanics are excluded; account recovery using such factors is recorded only as official external behavior and not implemented.      |
| Packages、Release、artifact、code/security scanning                | Excluded                       | Package/release and code-centric security lifecycles are excluded.                                                                                                |
| Complete Ruleset Aggregate                                         | Excluded pending decomposition | Official rulesets primarily target branch/tag/push. Only independently evidenced non-Code constraints may become owning policy facts.                             |
| Repository owner-controlled disabled transition                    | External observation only      | REST/GraphQL expose `disabled`/`isDisabled`, but official product docs publish no owner/admin disable or enable command; keep it outside the live lifecycle enum. |
| Discussion comment nesting、reaction ownership shared primitive    | Pending verification           | Must avoid global Comment/Reaction types; verify lifecycle per source Context.                                                                                    |
| Global Search saved searches                                       | Pending verification           | Current official evidence supports queries/filters but not a universal durable Saved Search aggregate.                                                            |
| Activity Feed ranking/recommendation                               | Pending verification           | Profile contribution and dashboard projections do not prove one ranking policy.                                                                                   |
| Audit retention and exactly immutable storage guarantees           | Pending verification           | Public event reference proves fields/categories, not local persistence/retention implementation.                                                                  |
| Classroom template/submission Repository、autograding、PR feedback | Excluded                       | These lifecycles require Repository content、push/test or Pull Request semantics outside this product boundary.                                                   |
| Certification training content and Code-specific exam taxonomy     | Excluded from first slice      | Certification registration/credential lifecycle is non-Code; course material and Code-specific subject models are not required for that owner.                    |
| Developer integration implementation                               | Excluded                       | Program membership may reference evidence that an integration exists, but App/API implementation remains owned elsewhere.                                         |

## Official evidence ledger

| ID    | GitHub official source                                                                                                                                                                                       | Evidence used                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| A1    | [Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)                                                                                            | personal、organization、enterprise account distinctions                       |
| A2    | [Managing membership in your organization](https://docs.github.com/en/organizations/managing-membership-in-your-organization)                                                                                | invite/remove/reinstate membership lifecycle                                  |
| A3    | [About organization teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams)                                                                                               | team membership、visibility、nesting、access and mention semantics            |
| A4    | [Roles in an organization](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization)                                                        | permission and role definitions、outside collaborator distinction             |
| A5    | [Abilities of roles in an enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-roles-in-your-enterprise/abilities-of-roles)                      | enterprise role scope and limits                                              |
| A6    | [Identity and access management fundamentals](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/understanding-iam-for-enterprises/about-identity-and-access-management)                  | personal-account SAML and managed-user federation/provisioning distinctions   |
| A7    | [About two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/about-two-factor-authentication)                                        | factor, passkey and recovery semantics                                        |
| A8    | [Recovering an account without 2FA credentials](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/recovering-your-account-if-you-lose-your-2fa-credentials) | recovery lifecycle and terminal loss condition                                |
| R1    | [Managing repository settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings)                                                         | Repository settings、visibility、access surface and mixed-scope caution       |
| R2    | [Enabling features for a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository)                                          | optional feature toggles without ownership transfer                           |
| R3    | [Managing custom properties for repositories](https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization)                      | Organization schema、Repository values、required/default semantics            |
| R4    | [Managing rulesets for a repository](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)                                                           | code-centric branch/tag/push purpose and ruleset lifecycle                    |
| R5    | [Archiving repositories](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories)                                                                                       | reversible read-only state and collaborator/Team mutation constraints         |
| R6    | [Deleting a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository)                                                                                    | deletion authority、policy constraints、fork and Team-permission effects      |
| R7    | [Restoring a deleted repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/restoring-a-deleted-repository)                                                                  | 90-day retention、fork-network constraint and incomplete relationship restore |
| R8    | [Repository GraphQL object](https://docs.github.com/en/graphql/reference/objects#repository)                                                                                                                 | provider-reported `isDisabled` fact without a documented owner transition     |
| I1    | [Using Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues)                                                                                                                | Issue capabilities、relations and dashboard                                   |
| I2    | [Assigning Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/assigning-issues-and-pull-requests-to-other-github-users)                                                   | assignee eligibility and bounded multiplicity                                 |
| I3    | [Adding sub-issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues)                                                                                         | hierarchy、cross-Repository relation and limits                               |
| I4    | [Managing Issue types](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-types-in-an-organization)                                                                | Organization-level Issue Type lifecycle                                       |
| I5    | [About Issue fields in Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/understanding-fields/about-issue-fields)                                                              | Organization Issue Field ownership distinct from Project field                |
| D1    | [Managing Discussion categories](https://docs.github.com/en/discussions/managing-discussions-for-your-community/managing-categories-for-discussions)                                                         | scope、category format、uniqueness and limit                                  |
| D2    | [Communicating on GitHub](https://docs.github.com/en/get-started/using-github/communicating-on-github)                                                                                                       | Issue versus Discussion purpose                                               |
| P1    | [About Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)                                                                               | owner、items、fields、views、workflows、templates、status and insights        |
| K1    | [About wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis)                                                                                                        | Wiki purpose、scope、visibility and editing access                            |
| N1    | [Configuring notifications](https://docs.github.com/en/subscriptions-and-notifications/get-started/configuring-notifications)                                                                                | Watch/participation、delivery channels and Inbox states                       |
| N2    | [Inbox filters](https://docs.github.com/en/subscriptions-and-notifications/reference/inbox-filters)                                                                                                          | notification reasons and triage filters                                       |
| N3    | [Viewing subscriptions](https://docs.github.com/en/subscriptions-and-notifications/how-tos/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions)                                         | Subscription lifecycle distinct from Notification                             |
| ACT1  | [Contributions on your profile](https://docs.github.com/en/account-and-profile/concepts/contributions-on-your-profile)                                                                                       | contribution/activity projection and visibility filtering                     |
| ACT2  | [About your profile](https://docs.github.com/en/account-and-profile/concepts/personal-profile)                                                                                                               | profile、activity、follow/star visibility distinctions                        |
| AU1   | [Audit log events for an organization](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/audit-log-events-for-your-organization)    | audit action/category/actor/scope/subject fields                              |
| INT1  | [About using GitHub Apps](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps)                                                                                                         | App、Installation、Authorization and permission distinctions                  |
| INT2  | [Reviewing installed GitHub Apps](https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps)                                                                           | repository selection、suspend/uninstall lifecycle                             |
| INT3  | [Authorizing OAuth Apps](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps)                                                                                                 | user consent、scope、organization policy and revocation                       |
| W1    | [Types of webhooks](https://docs.github.com/en/webhooks/types-of-webhooks)                                                                                                                                   | scope types、subscription limits and ownership requirements                   |
| S1    | [Getting started with a GitHub account](https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account)                                                                          | integrated global/repository/organization search; Code Search excluded        |
| EDU1  | [Apply to GitHub Education as a student](https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student)                                   | eligibility、evidence、application、approval and benefit access               |
| EDU2  | [Apply to GitHub Education as a teacher](https://docs.github.com/en/education/about-github-education/github-education-for-teachers/apply-to-github-education-as-a-teacher)                                   | educator affiliation evidence and application lifecycle                       |
| EDU3  | [About GitHub Campus Program](https://docs.github.com/en/education/about-github-education/use-github-at-your-educational-institution/about-github-campus-program)                                            | institution eligibility、partnership terms and annual program lifecycle       |
| EDU5  | [Applying to be a GitHub Campus Expert](https://docs.github.com/en/education/about-github-education/use-github-at-your-educational-institution/applying-to-be-a-github-campus-expert)                        | student eligibility、application and program entry lifecycle                  |
| EDU6  | [Getting started with GitHub Community Exchange](https://docs.github.com/en/education/contribute-with-github-community-exchange/getting-started-with-github-community-exchange)                              | eligible access、Repository discovery、submission and moderation surface      |
| EDU4  | [About GitHub Classroom](https://docs.github.com/en/education/manage-coursework-with-github-classroom/get-started-with-github-classroom/about-github-classroom)                                              | Classroom、roster/assignment surface and Code-dependent exclusions            |
| CERT1 | [About GitHub Certifications](https://docs.github.com/en/get-started/showcase-your-expertise-with-github-certifications/about-github-certifications)                                                         | certification offerings、completion、badge and certificate                    |
| CERT2 | [Registering for a GitHub Certifications exam](https://docs.github.com/en/get-started/showcase-your-expertise-with-github-certifications/registering-for-a-github-certifications-exam)                       | registration、appointment window、identity and external provider lifecycle    |
| DEV1  | [GitHub Developer Program](https://docs.github.com/en/integrations/concepts/github-developer-program)                                                                                                        | applicant types、integration evidence、support contact and membership         |
| BILL1 | [How billing works](https://docs.github.com/en/billing/get-started/how-billing-works)                                                                                                                        | billing responsibility、account scope and payment lifecycle                   |
| BILL2 | [Impact of plan changes](https://docs.github.com/en/billing/concepts/impact-of-plan-changes)                                                                                                                 | primary plan changes remain distinct from add-on subscriptions and usage      |
| BILL3 | [Budgets and alerts](https://docs.github.com/en/billing/concepts/budgets-and-alerts)                                                                                                                         | budget scope、threshold and alert semantics                                   |
| BILL4 | [Cost centers](https://docs.github.com/en/billing/concepts/cost-centers)                                                                                                                                     | cost-center assignment and cost-allocation scope                              |
| MKT1  | [About GitHub Marketplace for apps](https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/about-github-marketplace-for-apps)                                                        | Marketplace discovery、publisher and listing purpose                          |
| MKT2  | [Requirements for listing an app](https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/requirements-for-listing-an-app)                                                   | listing eligibility、review and publication constraints                       |
| MKT3  | [Handling new purchases and free trials](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-new-purchases-and-free-trials)                             | purchase、subscription and free-trial lifecycle                               |
| MKT4  | [Handling plan changes](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-plan-changes)                                                               | Marketplace plan-change lifecycle                                             |
| MKT5  | [Handling plan cancellations](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-plan-cancellations)                                                   | Marketplace cancellation lifecycle                                            |
| SP1   | [About GitHub Sponsors](https://docs.github.com/en/sponsors/getting-started-with-github-sponsors/about-github-sponsors)                                                                                      | sponsor and sponsored-account product purpose                                 |
| SP2   | [Managing sponsorship tiers](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors/managing-your-sponsorship-tiers)                                                             | tier、benefit and recurring sponsorship configuration                         |
| SP3   | [Managing payouts](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors/managing-your-payouts-from-github-sponsors)                                                            | sponsored-account payout lifecycle                                            |
| SP4   | [Tax information for GitHub Sponsors](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors/tax-information-for-github-sponsors)                                                | tax-information obligations distinct from ordinary profile data               |
| SUP1  | [About GitHub Support](https://docs.github.com/en/support/learning-about-github-support/about-github-support)                                                                                                | support availability and account/product support scope                        |
| SUP2  | [Creating a support ticket](https://docs.github.com/en/support/contacting-github-support/creating-a-support-ticket)                                                                                          | ticket creation、priority and interaction lifecycle                           |

## Runtime gate

This inventory approves language and unique ownership only. It does not create runtime status. A Context or artifact becomes
Current only after its first use case, source of truth, invariant, Context path, contracts/Ports, implementation and dated
verification independently pass G1-G7.
