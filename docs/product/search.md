# Search

狀態：Current in-memory viewer-scoped index/query vertical slice / verified 2026-07-14

```text
Search Result Set
= Indexed Objects
∩ Query Domain／Scope
∩ Viewer-visible Objects
ordered by Ranking／Sort
```

| Operation                    | Meaning                  |
| ---------------------------- | ------------------------ |
| Search                       | 從索引尋找可能未知的物件 |
| Filter                       | 從已知集合縮小顯示範圍   |
| Navigation / Command palette | 找到已知目標並直接進入   |
| Audit query                  | 對結構化治理事件欄位查詢 |

一般整合搜尋可有 Global、Organization、Repository scopes；Enterprise People、Audit、Billing、
Notification 各自的 Search／Filter 不應被建模成 universal enterprise index。Search 不授予存取權，
indexing 與 result filtering 都必須 access-aware。

GitHub 官方 Search 可跨全域、Organization 或 Repository scope，並以 suggestions/completions 直接導向使用者
可存取的 Repository、Team 或 Project。非 Code 類型包含 Repository、Topic、Issue、Discussion、User 與 Wiki。
官方也明確指出 index 會在來源變更時更新，且 private Repository 只會出現在有權存取者的結果中。

本 repository 已核准第一個 in-memory use case：

> 為 authenticated viewer 建立只含該 viewer 可見資源的 Search Document Projection replacement snapshot，
> 並從 command palette 以非空 Query 導航至 matching Account、Repository、Issue、Project 或 Discussion。

Ownership：

- Search & Discovery owns `SearchDocumentProjection`、viewer snapshot freshness and Search Query normalization.
- Account、Repository、Issues、Projects、Discussions remain source truth owners.
- Search Result Set is derived Application output, not source truth or Aggregate.
- App composition maps access-filtered provider results into the viewer snapshot; Search cannot widen that set.
- Qualifiers、ranking、pagination、saved searches、recent searches、Topic／User／Wiki indexing and asynchronous
  producer events remain Research.

官方來源：

- <https://docs.github.com/en/search-github/getting-started-with-searching-on-github/about-searching-on-github>
- <https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories>
