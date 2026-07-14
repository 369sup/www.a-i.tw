# Profile surface：Repositories 與 Stars

狀態：Proposed（尚未授權進入 runtime）

## 問題

以下 URL 應被理解為同一個 Account Profile surface 的兩個可連結投影，而不是兩個互不相干的頁面：

```text
/369sup?tab=repositories
/369sup?tab=stars
```

GitHub 官方將 Profile 定義為其他人發現與了解 User 的公開呈現；Repository tab 顯示此 Account 所擁有、
且目前 viewer 可見的 Repository；Stars tab 則顯示 User 主動建立的收藏／興趣關係。Profile 只組合並呈現
這些資料，不取得 Repository 或 Star relationship 的所有權。

## 官方語意依據

- [About your profile](https://docs.github.com/en/account-and-profile/concepts/personal-profile)：Profile 是公開的
  identity presentation，並可呈現 pinned items、activity、achievements 與其他 profile elements。
- [Profile reference](https://docs.github.com/en/account-and-profile/reference/profile-reference)：Profile elements 有
  各自的 visibility 規則；private profile 會隱藏 Stars 等 social features。
- [Saving repositories with stars](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars)：
  Star 是 User 對 Repository／Topic 的收藏、興趣、appreciation 與 discovery signal；Stars page 支援 list、
  search、sort 與 filter，官方 URL 形式為 `/{username}?tab=stars`。
- [Repositories](https://docs.github.com/en/repositories)：Repository 是由 User 或 Organization Account 擁有的
  resource；visibility 與 access decision 仍由 Repository owner 管理。

以上只證明 GitHub 的公開產品語意，不證明本專案已具備同等 runtime。

## Ubiquitous Language

| 名詞                        | 定義                                                                           | Owner                                 |
| --------------------------- | ------------------------------------------------------------------------------ | ------------------------------------- |
| Profile surface             | 以 Account 為目標、依 viewer context 組合公開或可見資訊的 presentation surface | Account presentation                  |
| Profile tab                 | Profile surface 中可由 URL 直接定位的 projection selector                      | UI adapter                            |
| Owned repository projection | Account-owned 且 viewer 可讀的 Repository refs                                 | Repository 提供資料；Profile 組合呈現 |
| Star relationship           | User 對 Repository 或 Topic 建立的收藏／興趣關係                               | Proposed Curation Context             |
| Stars projection            | 依 viewer visibility 顯示 Star relationships 指向的 resources                  | Proposed Curation read model          |
| Star list                   | User 建立、可公開呈現的 Star relationship 集合                                 | Proposed Curation Context             |

`Star relationship` 不屬於 Repository aggregate。Repository 可以顯示 star count 或 stargazers projection，但
User 是否收藏某 Repository 的真實來源應由 Curation owner 管理。

## URL contract

```text
GET /{handle}?tab=repositories
GET /{handle}?tab=stars
```

規則：

1. `{handle}` 解析成目標 Account，不代表 active actor 切換。
2. `tab` 是 presentation selector，不是 authorization scope。
3. `repositories` 與 `stars` 必須可直接連結、重新整理並保留選擇狀態。
4. 未知、重複或非字串 `tab` 不得直接流入 Domain；adapter 應正規化成允許值或預設 tab。
5. Viewer 未登入時仍可查看公開 Profile 與公開 resources；私人資料必須在 projection 前經 visibility／access
   filtering。
6. Profile 不存在時回傳 not-found surface，不建立空白 Account。

Next.js App Router 的 `params` 與 `searchParams` 在目前安裝版本皆為 Promise；`searchParams` 是 request-time
API，使用後頁面採 request-time dynamic rendering。未來 adapter 必須先 `await` 並正規化，再呼叫 application
use case。

## Tab semantics

### Repositories

```text
Target Account
  -> owned Repository refs
  -> viewer access filtering
  -> optional query / type / sort projection
  -> Repository cards
```

最小功能：

- 顯示 Repository name、owner namespace、description、visibility 與 lifecycle state。
- 只顯示 viewer 可讀的 Repository。
- 空狀態區分「沒有可見 Repository」與「查詢沒有結果」。
- Profile adapter 不得直接讀 Repository infrastructure store。

建議 use case：

```text
ListProfileRepositories(targetAccountId, viewerPrincipalRef, query)
  -> RepositoryProfileItemV1[]
```

Repository Context 應提供窄化 query／published contract；Account Context 不複製 Repository entity。

### Stars

```text
Target User Account
  -> Star relationships
  -> referenced Repository / Topic refs
  -> viewer access filtering
  -> list / search / sort / filter projection
```

最小功能：

- 顯示已收藏的公開或 viewer 可讀 Repository／Topic。
- 支援依名稱搜尋；未來可增加最近收藏、最近活躍、最多 stars 等排序。
- Star／Unstar 是 relationship command；Stars tab 是 query projection，兩者不能混成 UI local state。
- Private Repository 即使存在 Star relationship，也只能對具有 read access 的 viewer 顯示。
- Star lists 屬後續 capability；在 owner 與 lifecycle 未核准前不可假裝已存在。

建議 use cases：

```text
ListStarredResources(targetAccountId, viewerPrincipalRef, query)
StarResource(actorPrincipalRef, resourceRef)
UnstarResource(actorPrincipalRef, resourceRef)
```

目前 repository 沒有 Curation Context、Star aggregate、Port、store、published contract 或 Context Map edge，
因此 Stars runtime 為架構缺口，不應直接在 `page.tsx` 寫假資料或以 component state 代替。

## Context ownership 與依賴

```text
UI adapter: apps/web/src/app/(public)/[handle]/page.tsx
  -> Profile query use case (Account presentation)
  -> Repository profile query Port
  -> Curation stars query Port (尚未建立)

Account Context
  owns Account identity and Profile attributes

Repository Context
  owns Repository identity, Account ownership, profile, visibility, state and lifecycle

Authorization & Policy Context
  owns Repository-scoped grant, permission and access decision

Proposed Curation Context
  owns Star relationship and Star list
```

跨 Context 只能使用核准的 published contract 或 Port。`page.tsx` 不得 import 其他 Context 的 Domain、
Infrastructure 或 composition internals；concrete adapters 只在 server-side composition root 組裝。

## 未來 App Router 結構

語意核准後，建議最小 route：

```text
apps/web/src/app/
└── (public)/
    └── [handle]/
        ├── page.tsx
        ├── loading.tsx          # 只有實際需要 streaming 時才加入
        ├── not-found.tsx        # 依本版本支援與既有慣例決定
        └── profile-composition.tsx # final route assembly only
```

Profile UI belongs to its owning Context inbound adapter. `_components`、`_lib`、`_actions` 與 `actions.ts` 即使
route-local 也禁止使用。

不為 `repositories` 與 `stars` 各建一個 route segment，因目前 URL contract 明確以 `tab` 選擇同一 Profile
surface。若未來需要獨立 layout、metadata 或 loading boundary，必須另做 route decision。

## 實作 Gate

進入 runtime 前必須依序完成：

1. 核准 Profile surface、Repository projection 與 Star relationship 的語意。
2. 決定 Star／Star list 的正式 Bounded Context owner。
3. 更新 Ubiquitous Language、Context Map 與 target `context.json`。
4. 定義版本化 Repository profile query contract，以及 Curation contracts／Ports。
5. 完成 Domain 與 Application tests，再建立 infrastructure adapter 與 composition wiring。
6. 最後建立 `apps/web/src/app/(public)/[handle]/page.tsx`，只做 route parsing、use-case invocation 與
   presentation composition。

## 驗收條件

- `/369sup?tab=repositories` 與 `/369sup?tab=stars` 可直接進入正確 tab。
- 切換 tab 不改變 active actor，只改變 target Profile projection。
- Repositories 不洩漏 viewer 無權讀取的資源。
- Stars 不洩漏 private Repository relationship 或 metadata。
- 未知 tab 有一致且可測試的 fallback。
- Route adapter 沒有 Domain policy、store access 或跨 Context internal import。
- 尚未實作的 Star capability 不以假資料宣稱為 Current。
