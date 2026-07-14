# GitHub 官方非程式碼 URL Inventory

狀態：Current inventory；Semantic review in progress；不得作為完整 runtime implementation approval

快照日期：2026-07-12

## 目的

> URL 和文件導覽只屬研究 inventory，不決定 containment、Aggregate ownership 或 Bounded
> Context 數量。每筆資料必須先經
> [`github-official-research-map.md`](github-official-research-map.md) 分類。

`apps/web/src/app/` 的 route tree 必須從已研究的產品 surface、use case 與 ownership 推導，不能只看少數
GitHub 頁面後模仿 UI。為避免漏掉真正的產品語意，本研究先取得 GitHub Docs 官方 Pagelist 的完整英文
GitHub.com URL 集合，再逐條分類、研究與映射。

官方 discovery mechanism：

- [GitHub Docs API](https://docs.github.com/en/get-started/using-github-docs/github-docs-api)
- `GET https://docs.github.com/api/pagelist/en/free-pro-team@latest`
- `GET https://docs.github.com/api/article/meta?pathname=<path>`
- `GET https://docs.github.com/api/article?pathname=<path>`

## Inventory snapshot

| Artifact                                                               | 說明                                                                |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `docs/evidence/github-docs/pagelist-en-free-pro-team-2026-07-12.txt`   | 官方 Pagelist 原始快照，共 3,152 paths                              |
| `docs/evidence/github-docs/url-triage-en-free-pro-team-2026-07-12.tsv` | 每個 path 的 product area、初步 triage 與 review status             |
| `docs/product/github-official-research-map.md`                         | top-level 官方來源路由、include／exclude 原則與 extraction contract |

初步 triage 統計：

| Triage                           |  數量 | 意義                                                                                      |
| -------------------------------- | ----: | ----------------------------------------------------------------------------------------- |
| `include-candidate`              |   581 | Top-level area 以非程式碼產品語意為主，仍需逐頁確認                                       |
| `mixed-review-required`          |   566 | 同一 area 混合產品與程式碼內容，必須逐頁閱讀                                              |
| `exclude-code-or-implementation` | 2,005 | Top-level area 主要是程式碼、開發工具或 API implementation；保留 URL 紀錄但不納入產品模型 |
| Total                            | 3,152 | 與官方 Pagelist 完整對應                                                                  |

初步分類不是最終判決。例如 `repositories` 同時包含 ownership、visibility、access、moderation 與 Git、
Branch、Merge、source code；因此整個 area 必須標成 `mixed-review-required`，再逐頁決定。

## 每個 URL 的最終紀錄契約

每個 `include-candidate` 與 `mixed-review-required` URL 完成研究後，至少必須具有：

```text
path
canonical_url
title
intro
breadcrumbs
product_area
document_type
include_status: included | excluded | partial
include_reason
excluded_sections
official_terms[]
entities[]
relationships[]
states[]
actions[]
policies[]
projections[]
actors[]
target_resources[]
owner_candidate
context_map_implication
route_implication
runtime_status: external-reference-only | proposed | current
last_verified_at
```

`included` 不代表本專案要照抄功能；只表示此頁具有可用的非程式碼產品證據。`current` 仍必須由本地
manifest、source 與 tests 證明。

## Review batches

URL review 依產品 owner 分批，不能把所有內容塞進一份文件：

1. Identity、Authentication、Account、Profile、Dashboard。
2. Organization、Enterprise、Team、Membership、Role、Policy、Audit。
3. Repository 的非程式碼 ownership、access、visibility、collaboration、moderation、lifecycle。
4. Issue、Discussion、Project、Label、Milestone 與 work planning。
5. Star、Follow、Watch、Subscription、Notification 與 social／curation relationships。
6. Search、Filter、Navigation、Discovery、Explore 與 projection semantics。
7. Billing、Plan、Subscription、License、Seat、Entitlement、Budget、Cost center。
8. App installation、OAuth authorization、Webhook、Marketplace 與 Integration governance。
9. Sponsors、Support、Education、Nonprofit、Community 與 Site policy。

每批產出自己的 canonical semantic owner；本 inventory 只保存 discovery、coverage 與 review status。

## Route derivation gate

官方 URL 不直接等於本地 route。只有以下資料完整後，才能決定 `apps/web/src/app/`：

```text
Reviewed official URL evidence
  + approved Ubiquitous Language
  + Bounded Context owner
  + use case and capability
  + visibility / authorization rules
  + projection ownership
  + local URL contract
  -> App Router route decision
```

任何 route implementation 都必須回答：

- 這是 Resource route、Account／governance scope，還是 Projection surface？
- Dynamic segment 表示哪個 stable identity？
- Query parameter 是 filter、sort、pagination、tab，還是錯誤地隱藏 Domain state？
- Viewer 與 target Actor 是否不同？
- 哪個 Context 提供資料，透過哪個 Port／published contract？
- URL 是否需要獨立 metadata、loading、error 或 authorization boundary？

## Profile URL example

`/369sup?tab=repositories` 與 `/369sup?tab=stars` 只是 inventory 到 route decision 的一個範例，詳見
`docs/product/profile-surface.md`。它們不能代表完整 GitHub route model，也不能在其他 URL 尚未研究前被
當作 `apps/web/src/app/` 的整體設計。

## Completion gate

在下列條件滿足前，不宣稱「已摸清 GitHub 官方非程式碼 URL」：

- 3,152 paths 全部存在 inventory，且無遺漏或重複。
- 所有 `include-candidate` 與 `mixed-review-required` paths 都不再是 `unreviewed`。
- `partial` 頁面已記錄被排除的 code-related sections。
- Included URLs 都有 semantic owner 與 source-backed extraction。
- Route implication 與 Domain ownership 分開記錄。
- GitHub Docs 版本或 Pagelist 變更時可以重做 diff 與增量 review。

目前只完成全量 discovery 與 top-level triage；逐頁 semantic review 尚未完成，因此 runtime 開發維持停止。
