# Repository 策略

狀態：Accepted non-code Repository governance baseline

Runtime Context：`repository`
Subdomain：Core candidate

## 任務

Repository 是由 Personal Account 或 Organization 擁有的產品資源容器。它管理穩定 identity、
Name With Owner、profile、visibility、state、feature configuration、community／moderation configuration 與
lifecycle。產品 UI 使用 `Repository`、`Repositories` 或 `Repository management`；`Workspace` 不是 GitHub
產品資源或 Domain 語言，也不得成為 runtime／presentation 命名。

本策略刻意排除 commits、branches、tags、pull requests、merge、Git transport、code search、
release、Actions、package、security scanning 與任何程式碼內容／版本歷史能力。這些功能如有
需求，必須以獨立 bounded context 或明確 ADR 決定，不能預先塞進 Repository aggregate。

## 擁有的模型與不變條件

| 模型                     | 說明與不變條件                                                                                                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository               | 穩定 `RepositoryId`、owner `AccountId`、名稱、metadata 與 lifecycle；人類可讀 address 不得作為主識別。                                                                             |
| Repository Address       | `owner namespace + name` 的可路由地址；rename 改變 address，不建立新資源。                                                                                                         |
| Visibility               | `private`、`internal`、`public` 的資源發現／基線讀取邊界；`internal` 僅在 Account 已發布 enterprise governance eligibility 時可用；不是 membership、role 或 authentication state。 |
| Profile                  | Description、Homepage URL、Social Preview 與 Topics；只擁有 Repository 展示資料。                                                                                                  |
| Feature Configuration    | Issues、Discussions、Wiki、Projects 與 Sponsorships 是否啟用；開關不轉移各能力的資料所有權。                                                                                       |
| Community Configuration  | Code of Conduct、Contributing Guide、Support Resources、Issue Templates 與 Discussion Guidelines 的 Repository 設定。                                                              |
| Moderation Configuration | Interaction Limit 等 Repository 互動限制；Ruleset 與跨 scope governance 另有 owner。                                                                                               |
| Lifecycle                | active、archived、disabled 及 create、rename、visibility change、archive、unarchive、transfer、delete、restore 流程。                                                              |
| Transfer                 | 同一 Repository 在兩個 Account owner 間的受控 migration；保留 `RepositoryId`，重新檢查名稱、owner eligibility 與 grants。                                                          |

在同一 owner namespace 中 Repository name 必須唯一。visibility change 是 security boundary，
不是一般 presentation edit；它需要重新計算 discovery、baseline access 及受影響的 grant／policy。
由 enterprise 或 organization policy 收窄時，Repository 仍保有最終 resource action decision。
Repository Admin 只代表單一 resource scope 的最高角色，不代表 Account 或 enterprise
governance authority。

## In scope

- create、rename、metadata update、transfer、archive、unarchive、delete 與有條件 restore。
- owner／namespace reference validation、visibility、feature switches、topics／presentation metadata。
- 與非程式碼 collaboration capability 的 policy boundary；Issue、Discussion、Wiki 等是否成為子能力，必須另行核准。

## Explicitly out of scope

- Account identity、namespace allocation、organization Membership、Team roster 與 enterprise governance。
- Principal authentication、session、credential、token validation 或 provider-specific claims。
- Git data、source code、commit graph、ref／branch protection、PR／merge、release、Actions、package、webhook delivery、deploy key 或 code security。
- Project ownership；Project 是可與 Repository 關聯的獨立規劃資源，不是 Repository child aggregate。
- Repository Access Grant、Repository Role、Repository Permission、Collaborator Relationship 與 Team Repository
  Access；它們屬於 Authorization & Policy／Identity and Access 的存取關係模型。
- Ruleset、Custom Property Definition、Webhook Subscription、GitHub App Installation、Audit Entry、Watch
  Subscription、Repository Notification 與 Star。

## Scoped but externally owned models

出現在 Repository 頁面不代表屬於 Repository Aggregate；以 Repository 為 scope 也不代表由 Repository
Context 擁有：

| 模型                                                                 | Owner                            |
| -------------------------------------------------------------------- | -------------------------------- |
| Issue、Comment、Label、Milestone、Assignee                           | Issue Management                 |
| Discussion、Category、Answer、Reaction                               | Discussion Management            |
| Project、Project Item、Project Repository Association                | Project Management               |
| Repository Access Grant、Role、Permission、Collaborator／Team access | Authorization & Policy           |
| Ruleset、Custom Property Definition／Value、Moderation Rule          | Repository Governance target     |
| GitHub App Installation                                              | App Installation & Authorization |
| Webhook Subscription／Delivery                                       | Webhook Delivery                 |
| Audit Entry                                                          | Audit & Compliance               |
| Watch Subscription                                                   | Subscription                     |
| Repository Notification                                              | Notification                     |
| Star                                                                 | Social Graph                     |

## Authorization and effective access

Repository 提供 identity、owner、visibility、state 與 configuration facts；Authorization & Policy 才組合
Principal、Membership、Team relationship、Repository Access Grant、Role、Permission 與 Repository facts，形成
resource-scoped access decision。Repository 不得自行擁有 Principal／Team grant graph。

```text
Identity ─────────authenticated principal facts──────────────────────┐
Account ──────────membership / team / owner facts────────────────────┼─> Authorization & Policy decision
Repository ───────identity / owner / visibility / state facts────────┘
```

概念上的 effective access 不是單一 role，而是：

```text
repository action allowed = Authorization & Policy decision permits action
  ∧ Repository lifecycle invariant permits transition
```

`repository` runtime 已移除早期 grant store、role enum 與 decision policy。Repository 透過自己的
`RepositoryAuthorization` Port／ACL 消費 `AuthorizationPolicyApiV1`；Issues participation contract 保留為
不暴露 grant graph 的相容 facade。

## Lifecycle semantics

| 操作             | 保持不變                              | 必須重新評估                                                                   |
| ---------------- | ------------------------------------- | ------------------------------------------------------------------------------ |
| Rename           | `RepositoryId`、owner                 | address uniqueness、redirect／reservation policy                               |
| Transfer         | `RepositoryId`                        | target owner eligibility、namespace uniqueness、grant and policy compatibility |
| Archive          | identity、歷史 metadata               | 所有 mutation；資源進入唯讀保留狀態                                            |
| Unarchive        | `RepositoryId`                        | active policy 和後續 mutation eligibility                                      |
| Delete / restore | delete 前 identity 可作歷史 reference | restore eligibility、name conflict、retention 與 grant 重建 policy             |

## Published language 候選

| 名稱                         | 用途                                                     | 不得包含                             |
| ---------------------------- | -------------------------------------------------------- | ------------------------------------ |
| `RepositoryRefV1`            | 資源的穩定 reference 與 address                          | Account／Principal aggregate         |
| `RepositoryScopeV1`          | 提供 authorization 的 owner、visibility、lifecycle facts | credential、session、Account roster  |
| `RepositoryLifecycleEventV1` | rename、transfer、archive、delete 等已發生事實           | 內部 transaction／persistence detail |

Authorization & Policy 透過 consumer-owned ACL 將 Account membership、Identity Principal 與 Repository resource
facts 轉成自己的語言；其他 Context 不可讀取其 grant store 或依賴 internal role enum。

## 首批 use case 候選

1. 在 eligible Account namespace 建立、rename、archive、unarchive Repository。
2. 設定 visibility、非程式碼 feature switches 與 resource collaboration policy。
3. 設定 Profile、Topics、Feature Configuration 與 Community／Moderation Configuration。
4. 在核准的 Account 間 transfer Repository，保留 identity 並重新驗證 owner 與名稱。
5. 查詢最小 Repository facts，交由外部 owner 進行 discovery、authorization 與 projection。

## 延後與拆分觸發條件

Issues、Discussions、Wiki、labels、milestones 與 moderation 初期只能是 Repository 的 capability
候選；當它們有獨立 owner、專屬語言、跨 Repository lifecycle、擴展需求或 contract consumer
時，應分別由 Issues、Discussions 或 Knowledge 候選 Context 擁有。Project 保持獨立候選。

## 參考與非目標

本策略借鑑 GitHub 將 Repository ownership、visibility、role 與 lifecycle 分開描述的產品
語意，並刻意不採用 GitHub 的 code-related 功能。參考：
[Repository roles for an organization](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)。
