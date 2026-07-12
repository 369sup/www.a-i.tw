# Platform world model

狀態：Accepted semantic baseline / runtime scope annotated

## Purpose

本模型取代 `Identity & Access > Account > Repository` 的錯誤父子樹。產品世界由不同 owner
持有的節點、關係與決策共同構成；它是跨 Context 的建模語彙，不是新的 Platform Bounded
Context、中央資料庫、中央 Relationship Graph 或 `ContextService`。

```text
Identity → Credential → Principal → Actor

Relationships + Grants + Constraints + Credential + Request Facts
                              ↓
                     Effective Authority
                              ↓
                     Capability Relation

Command(Action, Resource, Boundary) × Capability Relation
                              ↓
                  owner-owned Authorization Decision
                              ↓ allow
                     Domain Preconditions
                              ↓ valid
                  State Transition + Domain Events
                              ↓
          Audit / Webhook / Notification / Consumer Read Models
```

## Semantic primitives

| Primitive    | 核心問題                                           | Owner 原則                            | Current runtime                               |
| ------------ | -------------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| Principal    | 誰可以被驗證或授權？                               | Identity & Access 發布最小 reference  | User Principal                                |
| Actor        | 這次行為歸屬於誰？                                 | Identity & Access／Session 解析       | 單一 Personal Actor                           |
| Boundary     | Resource 位於哪個 ownership／governance boundary？ | Account／Resource owner               | Personal／Organization                        |
| Active Scope | UI／Use Case 目前選取哪個 Boundary reference？     | Account owns fact; Experience selects | Personal／Organization                        |
| Resource     | 哪個具 identity 與 lifecycle 的物件被操作？        | 各 Resource Context                   | Repository、Issue 等                          |
| Action       | 對 Resource 要執行什麼？                           | Resource owner 定義 canonical action  | Repository participation actions              |
| Relationship | Subject 與 Object 有何有向關係？                   | 關係語意的 Context owner              | Membership、Team membership、grant、ownership |
| Decision     | 此 Actor 能否執行 Action？                         | 被操作 Resource 的 Context owner      | Repository allow／deny                        |
| Event        | 已發生什麼 Domain fact？                           | 發生狀態變更的 Context owner          | None approved                                 |
| Read Model   | 哪個 consumer-shaped query result 需要 facts？     | Query consumer                        | Dashboard／capability context baseline        |

`Actor` 是實際行為者；`Principal` 是可被授權的主體。Team 可以是 Principal，但不是登入
Actor。Organization 與 Enterprise 是 Account／Scope，不會取代 User Actor。

## Relationship graph

關係是 owner-published fact，不是可由任意 consumer 寫入的通用 tuple store。

```text
Enterprise ──governs────────▶ Organization        Planned
Organization ──owns─────────▶ Repository          Current
Organization ──contains─────▶ Team                Current
User Principal ──member_of──▶ Organization        Current
User Principal ──member_of──▶ Team                Current
User/Team ──has_role_on─────▶ Repository          Current
Repository ──scopes─────────▶ Issue               Current
Repository ──linked_to──────▶ Project             Not approved
User ──follows/stars/watches▶ Resource/Account    Not approved
```

每條跨 Context edge 都必須在 Context Map 指定 upstream、downstream、Published Language、
consumer-owned ACL、freshness 與 fail-closed semantics。`governs`、`owns`、`contains`、
`member_of`、`has_role_on`、`scopes` 與 `linked_to` 不得互換。

## Authority and decision order

`Capability` 必須區分兩種語意：

- **Product Capability Descriptor**：Experience 對 resource type 與 canonical action 的註冊描述；不授權。
- **Effective Capability Relation**：`can(Actor, Action, Resource, current facts)`；由 owner 對 grants、
  relationships、constraints、credential 與 request facts 求值。

因此 effective capability 是 Authorization Decision 的輸入，不是 decision 之後才產生的權限。
Decision allow 後仍必須驗證 Domain Preconditions；「有權嘗試」不代表目前 resource state 允許成功。

```text
Grant candidates
  = direct binding + Team binding + base permission + delegated credential grant

Constraints
  = visibility + lifecycle + upper-boundary policy + credential restriction + request condition

Effective Authority
  = grants reduced by constraints
```

`Scope` 不得混用：Account／governance 使用 `Boundary`；App 或 token 可觸及的物件使用
`Resource Set`；credential 能力使用 `Credential Grant`；policy 適用對象使用 `Policy Target`；
只有目前 UI／Use Case 選擇才稱為 `Active Scope`。

## Cross-cutting control planes

Control plane 是橫切責任分類，不等於中央服務或新的 product Context。

| Plane                     | 責任                                         | 實作原則                              | Current status             |
| ------------------------- | -------------------------------------------- | ------------------------------------- | -------------------------- |
| Identity & Authentication | Credential → authenticated Actor             | Identity & Access owns truth          | Mock browser Session       |
| Authorization             | Actor × Action × Resource → Decision         | Resource owner decides                | Repository current         |
| Governance & Policy       | 上層 Scope 的限制                            | Account／future owner publishes facts | Enterprise deferred        |
| Entitlement               | 方案是否提供 capability                      | Commercial owner required             | Not approved               |
| Capability                | 對 UI／Application 投影目前操作              | Consumer-shaped, request-scoped       | Repository context current |
| Event                     | 發布已發生的 Domain fact                     | Context-owned event contract          | None approved              |
| Notification              | 將 Event 轉為注意力項目                      | Independent future owner              | Not approved               |
| Search                    | 建立 access-aware index、query 與 ranking     | Search owner required                 | Not approved               |
| Consumer Read Models      | 組合 purpose-specific query result            | Each consumer owns its view model     | Dashboard baseline         |
| Audit & Compliance        | 保存可稽核 Actor／Action／Resource facts     | Separate from notification            | Not approved               |
| Integration               | App／Webhook 的 delegated access 與 delivery | Explicit installation scope           | Not approved               |

## Runtime composition rule

```text
Authentication adapter
  → minimal RequestEnvelope (viewer, actor, safe credential facts, correlation, active scope)
  → capability-owned resolver
  → owner-published resource／relationship facts through consumer ACLs
  → resource-owner authorization decision
  → purpose-specific read model or command
```

`RequestEnvelope` 不包含完整 Account、Repository、Team、permission set、policy graph、billing、
feature flags、services 或預先快取的決策。Resource／relationship truth 只在當前 use case 需要時，
透過其 owner contract 解析。

## Invariants

1. Identity 辨識 Actor；Account 定義 ownership／governance Scope；Resource Context 擁有行為規則。
2. UI 導覽層級不證明 Domain containment 或 ownership。
3. ACL／Access Binding 是 resource-scoped grant；RBAC 展開 Role；ReBAC 使用 owner-published
   relationship facts；Policy 只能限制或要求條件，四者不可折疊為單一 `role` 欄位。
4. Product Capability Descriptor 不授權；Effective Capability 是具體 Decision 的輸入；UI projection
   不能取代 command-side authorization。
5. Authorization allow 後仍須通過 Domain Preconditions，才可進行 State Transition。
6. Domain Event、Audit Event、Webhook Event、Notification 與 consumer read model 不得視為同一型別，
   且不反向擁有交易 Aggregate。
7. 未核准或無 runtime evidence 的 plane 必須標為 Planned／Not approved，不得加入空欄位假裝存在。

## Out of scope

- 推測 GitHub 未公開的內部微服務或資料庫拓撲。
- 建立全域 `Entity` Aggregate、通用 mutable `Relationship` table 或中央 Policy owner。
- 在本 gate 實作 Enterprise、Commercial、Notification、Search、Audit、Integration 或社交能力。
- 將 Git／code hosting 語意加入 Repository Governance。

## Official research boundary

本模型是基於 GitHub 公開產品行為建立的分析語彙，不宣稱 GitHub 內部服務拓撲。官方證據入口：

- [Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)
- [Enterprise accounts](https://docs.github.com/en/admin/concepts/enterprise-fundamentals/enterprise-accounts)
- [Teams in an enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/enterprise-fundamentals/teams-in-an-enterprise)
- [About organization teams](https://docs.github.com/en/enterprise-cloud@latest/organizations/organizing-members-into-teams/about-teams)
- [Repository roles for an organization](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)
- [Creating a project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project)
- [Cost centers](https://docs.github.com/en/billing/concepts/cost-centers)
