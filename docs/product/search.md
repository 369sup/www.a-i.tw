# Search

狀態：Accepted research baseline / runtime not approved

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

Search 需要獨立 index ownership、freshness、visibility filtering、query language 與 ranking；本
repository 尚未核准 Search Context 或 runtime。

官方來源：

- <https://docs.github.com/en/search-github/getting-started-with-searching-on-github/about-searching-on-github>
- <https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories>
