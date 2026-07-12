# GitHub non-code route semantics

狀態：Accepted semantic baseline / runtime partially current

本文件採用 GitHub Published Language。除了 Git、Commit、Branch、Diff、Pull Request、Actions、
Code Search、Codespaces 與程式碼安全等程式碼相關能力外，產品名稱、關係、狀態與操作語意
直接對照 GitHub，不為相同功能另造本地同義詞。

## Route ownership

| Route | GitHub product language | Owner | Runtime status |
| --- | --- | --- | --- |
| `/notifications` | Notifications inbox | Notifications | Proposed |
| `/repos` | Repositories list | Repository | Current via `listVisible` |

下列 routes 是 GitHub Pull requests 功能，屬於本專案目前排除的程式碼協作範圍：

```text
/pulls
/pulls/inbox
/pulls/authored
/pulls/assigned
/pulls/involves
/pulls/reviews
```

不得把 `pulls` 重新定義成泛用「資料拉取」，也不得建立 `PullQuery`、`ListPulls` 或
`PullResultItem` 來模擬另一套產品語言。未來若納入 Pull requests，必須依 GitHub Pull
requests 的既有語意另行通過 G0-G7。

## Issues

GitHub `Issues` 對應 `apps/web/src/modules/issues`；正式 Domain 與 Bounded Context 名稱
都是 `Issues`。

```text
Issues
├── Issue
├── Issue number
├── State: open | closed
├── Label
├── Assignment
└── Assignee
```

目前 runtime 擁有 Issue、Label 與 Assignment lifecycle。Milestone、Issue type、Sub-issue、
Dependency、Comment、Template、Form 與 Project integration 仍須逐項確認 runtime status；
不得因 GitHub 存在就將尚未實作的能力標成 Current。

## Notifications

直接採用 GitHub 語意：

```text
Subscription
    matches Activity
        → Notification
        → Inbox
```

第一批 use cases：

```text
List notifications
Mark as read
Mark as unread
Save
Mark as done
Unsubscribe
```

`read`、`saved`、`done` 與 `subscribed` 是不同狀態維度。Notifications 不是 Repository 或
Account 的子物件；其事件來源、subscription ownership、retention 與 delivery policy 通過
G1-G3 前，runtime 維持 Proposed。

## Repositories

`/repos` 使用 GitHub `Repositories` 語意，不建立 `Repository projection` 產品概念：

```text
RepositoryService.listVisible(actor)
    → visible repositories
    → /repos
```

Application query 可以回傳 UI 所需資料，但該資料型別只叫 query result／view model，不是
Domain object、Bounded Context 或 Published Language。Repository 的 ownership、visibility、
role、access 與 lifecycle 決策仍由 Repository Context 擁有。

## Architecture mapping

GitHub 語意與 Hexagonal Architecture 的對應如下：

```text
GitHub product term
    → owning Bounded Context
    → Domain invariant
    → Application use case and Port
    → Infrastructure / Presentation adapter
    → server-side composition root
```

`query result`、`view model`、`adapter`、`port` 與 `composition root` 是架構語言，不得升格為
GitHub 產品語意。跨 Context 只能使用 owner 發布的 contract、Port、event 或 consumer ACL。

## Boundary rules

1. Identity & Access owns Actor、Principal、Credential 與 authentication facts。
2. Account owns User account、Organization account、Enterprise account、Membership 與 Team facts。
3. Repository owns Repository ownership、visibility、role、grant、access decision 與 lifecycle。
4. Issues owns Issue、Issue number、Label、Assignment 與 Assignee rules。
5. Notifications owns Notification、Subscription、Inbox state 與 delivery preference。
6. Search、Entitlement、Audit 與 Enterprise policy 保留各自 GitHub 語意，不合併成通用 read-model Context。
7. Presentation routes 只映射 transport 與 view；不得發明或重新定義 Domain language。
8. `master-template` 只作工程模板，不列入產品世界模型或 Bounded Context 計數。

## Out of scope

- Git、Commit、Branch、Diff、Pull Request、merge、checks、Actions 與 deployment。
- Code Search、Codespaces、程式碼安全與其他程式碼分析能力。
- Agents 與 Copilot。
- Central Context Service、global relationship table 或通用 read-model Context。
