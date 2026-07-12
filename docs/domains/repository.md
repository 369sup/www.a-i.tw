# Repository 策略

狀態：Accepted non-code Repository governance baseline

Runtime Context：`repository`
Subdomain：Core candidate

## 任務

Repository 管理由 Account namespace 擁有的受控協作工作空間：其穩定 identity、可見性、
repository-scope access policy、非程式碼協作功能與 lifecycle。它是資源邊界，不是檔案系統
目錄、Git adapter、Account 或 Principal 的同義詞。

本策略刻意排除 commits、branches、tags、pull requests、merge、Git transport、code search、
release、Actions、package、security scanning 與任何程式碼內容／版本歷史能力。這些功能如有
需求，必須以獨立 bounded context 或明確 ADR 決定，不能預先塞進 Repository aggregate。

## 擁有的模型與不變條件

| 模型                 | 說明與不變條件                                                                                                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository           | 穩定 `RepositoryId`、owner `AccountId`、名稱、metadata 與 lifecycle；人類可讀 address 不得作為主識別。                                                                             |
| Repository Address   | `owner namespace + name` 的可路由地址；rename 改變 address，不建立新資源。                                                                                                         |
| Visibility           | `private`、`internal`、`public` 的資源發現／基線讀取邊界；`internal` 僅在 Account 已發布 enterprise governance eligibility 時可用；不是 membership、role 或 authentication state。 |
| Repository Role      | 資源 scope 的 capability bundle；標準候選為 `read`、`triage`、`write`、`maintain`、`admin`，實際 capability matrix 必須經產品核准。                                                |
| Access Grant         | direct principal、Team 或基線 grant 對 Repository Role 的授與來源、狀態與效期；不保存 credential。                                                                                 |
| Collaboration Policy | 功能開關、interaction limit 與 resource policy；它收窄或解釋 repository action，不能驗證 Principal。                                                                               |
| Lifecycle            | active、archived、deleted（若符合 restore eligibility）的狀態；archive 是保留且唯讀，delete 是破壞性終止。                                                                         |
| Transfer             | 同一 Repository 在兩個 Account owner 間的受控 migration；保留 `RepositoryId`，重新檢查名稱、owner eligibility 與 grants。                                                          |

在同一 owner namespace 中 Repository name 必須唯一。visibility change 是 security boundary，
不是一般 presentation edit；它需要重新計算 discovery、baseline access 及受影響的 grant／policy。
由 enterprise 或 organization policy 收窄時，Repository 仍保有最終 resource action decision。
Repository Admin 只代表單一 resource scope 的最高角色，不代表 Account 或 enterprise
governance authority。

## In scope

- create、rename、metadata update、transfer、archive、unarchive、delete 與有條件 restore。
- owner／namespace reference validation、visibility、feature switches、topics／presentation metadata。
- direct collaborator、Team grant、outside collaborator、base access 與 repository roles 的資源範圍規則。
- repository-scoped authorization decision 及可解釋的 grant／policy reason。
- 與非程式碼 collaboration capability 的 policy boundary；Issue、Discussion、Wiki 等是否成為子能力，必須另行核准。

## Explicitly out of scope

- Account identity、namespace allocation、organization Membership、Team roster 與 enterprise governance。
- Principal authentication、session、credential、token validation 或 provider-specific claims。
- Git data、source code、commit graph、ref／branch protection、PR／merge、release、Actions、package、webhook delivery、deploy key 或 code security。
- Project ownership；Project 是可與 Repository 關聯的獨立規劃資源，不是 Repository child aggregate。

## Authorization and effective access

Repository 是 `repository:*` action 的 policy decision point。當 owner 為 organization 且其受 enterprise governance 約束時，Repository 只消費由 Account 發布的最小 policy eligibility 或 restriction fact；它不得讀取 enterprise roster、billing 或 IdP 資料，也不得將 enterprise membership 推論成 Repository Role。它消費 Account 和 Identity &
Access 發布的事實，並保有角色、grant、visibility 和 resource policy 的語意：

```text
Identity & Access ──authenticated principal / credential constraints──┐
Account ───────────membership / team / owner eligibility─────────────┼─> Repository decision
Repository ────────visibility / role / grant / lifecycle / policy────┘
```

概念上的 effective access 不是單一 role，而是：

```text
repository action allowed =
  authenticated principal is valid
  ∧ owner / membership / direct / team grant establishes a candidate role
  ∧ candidate role permits the action
  ∧ visibility and lifecycle permit the action
  ∧ repository policy permits the action
```

多個 grant 的合併與 deny／restriction precedence 必須在角色矩陣與 application contract 中
明確定義；不可由 UI 或 database query 隱式決定。上式為策略模型，不是已實作演算法。

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
| `RepositoryAccessDecisionV1` | action 的 allow／deny、reason code、policy version       | internal grant graph 或 secret       |
| `RepositoryLifecycleEventV1` | rename、transfer、archive、delete 等已發生事實           | 內部 transaction／persistence detail |

Repository 可透過 ACL 將 Account membership 和 Identity authentication context 轉成自己的語言；
其他 context 不可反向讀取 Repository grant table 或依賴 internal role enum。

## 首批 use case 候選

1. 在 eligible Account namespace 建立、rename、archive、unarchive Repository。
2. 設定 visibility、非程式碼 feature switches 與 resource collaboration policy。
3. 對 principal／Team 指派或撤銷 Repository Role，並產生可解釋 decision。
4. 在核准的 Account 間 transfer Repository，保留 identity 並重新驗證 policy。
5. 查詢最小 Repository metadata，依 discovery 和 access decision 過濾結果。

## 延後與拆分觸發條件

Issues、Discussions、Wiki、labels、milestones 與 moderation 初期只能是 Repository 的 capability
候選；當它們有獨立 owner、專屬語言、跨 Repository lifecycle、擴展需求或 contract consumer
時，應分別由 Issues、Discussions 或 Knowledge 候選 Context 擁有。Project 保持獨立候選。

## 參考與非目標

本策略借鑑 GitHub 將 Repository ownership、visibility、role 與 lifecycle 分開描述的產品
語意，並刻意不採用 GitHub 的 code-related 功能。參考：
[Repository roles for an organization](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)。
