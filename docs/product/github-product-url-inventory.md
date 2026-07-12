# GitHub Product Surface URL Inventory

狀態：Current schema；Seed routes recorded；Full crawl incomplete；runtime implementation blocked

## 目的

本文件記錄 `github.com` 實際產品 routes，不記錄 `docs.github.com` 研究來源。兩者必須分開：

```text
github.com product URL
  -> observed product surface / command
  -> docs.github.com evidence
  -> local semantic owner
  -> local URL decision
  -> apps/web/src/app route
```

`docs/product/github-official-url-inventory.md` 管理官方 Docs URL coverage；本文件管理 GitHub 產品 surface
coverage。兩份 inventory 都完成前，不從少數畫面推導完整 App Router。

## Route record contract

每個 product URL 至少記錄：

```text
product_url
access_state: anonymous | authenticated | role-restricted
http_semantics: view | command-entry | confirmation | redirect
surface_type
target_entity
active_actor_effect
active_scope_effect
projection_or_command
navigation_parent
visible_capabilities[]
state_parameters[]
authorization_expectation
side_effect_risk
official_docs_evidence[]
local_owner_candidate
local_route_implication
observation_status: supplied | observed | docs-confirmed | unresolved
last_verified_at
```

## Seed routes supplied by product observation

| Product URL | Surface semantics | Target / state | Owner candidate | Observation status |
| --- | --- | --- | --- | --- |
| `https://github.com/369sup?tab=repositories` | Public Profile repository projection | target Account `369sup`; `tab` selects owned Repository projection | Account presentation + Repository query | supplied；docs-confirmed |
| `https://github.com/369sup?tab=stars` | Public Profile curation projection | target User; `tab` selects Star relationships and lists | Proposed Curation + Account presentation | supplied；docs-confirmed |
| `https://github.com/369sup?tab=achievements` | Public Profile reputation projection | target User; `tab` selects earned Achievement projection | Proposed Reputation + Account presentation | supplied；partially docs-confirmed |
| `https://github.com/settings/profile` | Authenticated self-service settings | active User Account Profile attributes | Account | supplied；docs-confirmed |
| `https://github.com/settings/admin` | Authenticated account administration／lifecycle settings | active User Account; sensitive account commands may require elevation | Account + Identity & Access | supplied；requires observed field inventory |
| `https://github.com/settings/appearance` | Authenticated personal preference settings | active User preference projection | Account Preferences | supplied；requires observed field inventory |
| `https://github.com/login` | Anonymous authentication entry | credential challenge; may redirect an authenticated actor | Identity & Access | supplied；docs-confirmed |
| `https://github.com/logout` | Session-termination command entry／confirmation | active Session; potentially destructive to current browser state | Identity & Access | supplied；do-not-execute during crawl |
| `https://github.com/notifications` | Authenticated cross-resource Notification Inbox | active actor; notification reasons、filters and triage state | Notification | supplied；docs-confirmed |
| `https://github.com/issues` | Authenticated cross-Repository work projection | active actor; viewer-visible Issues across scopes | Work Management read model | supplied；requires observed filter inventory |
| `https://github.com/dashboard` | Authenticated personal operating home | active actor; personalized activity、shortcuts、alerts and recommendations | Dashboard projection | supplied；docs-confirmed |
| `https://github.com/discussions` | Authenticated cross-scope Discussion dashboard | active actor; viewer-visible Discussions across Organization／Repository scopes | Discussion read model | supplied；requires observed filter inventory |
| `https://github.com/explore` | Public／personalized discovery surface | viewer context; topics、popularity、relationships and recommendation signals | Discovery／Recommendation | supplied；docs-confirmed |

這些 rows 是 inventory seed，不是完整 GitHub URL model。

## Route semantics

### Profile tab

```text
/{handle}?tab=<projection>
```

- `{handle}` 是 target Account，不是 active actor。
- `tab` 選擇 presentation projection，不是 Domain state 或 authorization scope。
- `repositories`、`stars`、`achievements` 分別由不同 semantic owner 提供資料。
- Profile route 組合 projections，但不取得 Repository、Star 或 Achievement 的 source-of-truth ownership。

### Settings

```text
/settings/<section>
```

- Target 通常是 active User Account 或其 Credential、Preference、Billing、App authorization。
- Settings navigation hierarchy 不等於單一 Account aggregate；每個 section 必須回到真正 owner。
- Sensitive command 可能要求 authentication elevation／sudo mode。
- Settings route 是 authenticated self-management surface，不是公開 Profile。

### Auth command routes

```text
/login
/logout
```

- `/login` 是 Authentication entry，不是 Profile route。
- `/logout` 可能終止 Session；crawler 只能記錄 link／confirmation semantics，不得實際提交。
- Login、logout、reauthentication、SSO 與 account switching 必須分開建模。

### Cross-resource projections

```text
/notifications
/issues
```

- 它們以 active actor 為中心聚合多個 Resource，不由單一 Repository 擁有。
- `/notifications` 是 Notification Inbox projection；Subscription relationship 與 Inbox triage state 仍分開。
- `/issues` 是 viewer-aware work read model，不等於某個 Repository 下的 Issue collection route。
- `/dashboard` 是登入後 personal operating home，不是公開 Profile。
- `/discussions` 是跨 scope Discussion read model，不等於單一 Repository／Organization collection。
- `/explore` 是 Discovery／Recommendation projection，不等於 Search，且不授予 resource access。

## Full product crawl coverage

完整 crawl 必須逐區盤點，而不是只收集容易看到的 URL：

1. Anonymous global navigation、signup、login、recovery 與 public discovery。
2. Authenticated global navigation、dashboard、switchers、command palette 與 recent resources。
3. Personal Profile 所有 tabs、subviews、visibility variants 與 owner／viewer differences。
4. Personal Settings 全部 sidebar sections、forms、commands、confirmation 與 elevation requirements。
5. Organization Profile、People、Teams、Repositories、Projects、Discussions、Settings、Audit、Billing。
6. Enterprise overview、People、Teams、Organizations、Policies、Identity、Apps、Audit、Billing、Licensing。
7. Repository 非程式碼 tabs、Settings、Access、Issues、Discussions、Projects、Insights、Moderation、Lifecycle。
8. Issue、Discussion、Project resource routes與其 query／filter／sort／view variants。
9. Notifications、Subscriptions、Watch、Star、Follow、Explore、Search 與 cross-resource dashboards。
10. App installation、OAuth authorization、Marketplace、Sponsors、Support 與 Billing surfaces。

每個 area 必須同時觀察：

- anonymous／authenticated 差異；
- resource owner／member／outside viewer 差異；
- Personal／Organization／Enterprise scope 差異；
- empty、populated、restricted、archived、suspended 等 state variants；
- query parameters、dynamic segments、redirects、confirmation pages；
- visibility filtering 與 capability-driven navigation。

## Read-only crawl safety

Crawler 可以：

- 讀取 URL、標題、導覽、label、field、filter、empty state、permission message。
- 記錄 link targets、form method／action 與 confirmation requirement。
- 比較不同 access state 的 presentation。

Crawler 不可以：

- 提交 `/logout`、delete、transfer、archive、billing purchase、membership removal 等 command。
- 修改 Profile、Appearance、Credential、Policy、Notification 或 Billing 設定。
- 讀取或保存 cookie、token、password、session storage 或其他 credential material。
- 為了觀察 denied state 而降低 security／authorization control。

## Mapping to local App Router

產品 URL 完成研究後，仍需經過 route decision：

```text
Observed GitHub route
  + official Docs semantics
  + local Ubiquitous Language
  + local Context owner and contracts
  + local product requirements
  -> adopt | adapt | split | merge | reject
```

不能假設 GitHub 的 URL 必須一對一複製。本地 route 只有在 use case、owner、access boundary 與 projection
一致時才採用；否則應適配或拒絕。

## Completion gate

在以下條件滿足前，不進入完整 `apps/web/src/app/` route implementation：

- Full product crawl coverage 的十個 area 都有 inventory。
- 所有 command routes 都標記 side-effect risk，且 crawl 未提交操作。
- 每個 included route 都連到至少一個 official Docs evidence。
- 每個 route 都有 owner candidate、access state、projection／command 分類與 local disposition。
- 未解析 owner 的 route 保持 `unresolved`，不得塞入 `page.tsx` 或 UI state。

