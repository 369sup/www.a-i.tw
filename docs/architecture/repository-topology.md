# Repository topology

狀態：Accepted / machine enforced

本 repository 只有一套 ownership topology。目錄不是分類偏好，而是責任與變更邊界。

| Root       | 唯一責任                                                     | 不得承載                           |
| ---------- | ------------------------------------------------------------ | ---------------------------------- |
| `.agents`  | repository-owned Codex skills、scaffold 與 skill overlays    | canonical product truth            |
| `.codex`   | Codex prompts、profiles、command rules 與 local MCP policy   | Domain model 或 runtime code       |
| `.github`  | CODEOWNERS、issue/PR templates、CI 與 security workflows     | application behavior               |
| `.semgrep` | repository static-analysis rules                             | duplicated architecture docs       |
| `.serena`  | semantic navigation memories 與 project configuration        | authoritative or speculative facts |
| `apps`     | deployable app、app-local Context、composition 與 Experience | reusable context-neutral packages  |
| `docs`     | canonical internal product、domain、architecture 與 ops      | public Fumadocs source             |
| `packages` | context-neutral technical packages                           | Domain、Application、Contracts     |
| `plugins`  | Codex plugin manifests 與 plugin-owned resources             | product runtime                    |
| `scripts`  | deterministic architecture、validation 與 migration          | business policy                    |
| `tests`    | cross-cutting architecture fixtures 與 end-to-end flows      | owner-local unit or Context tests  |

以上 root 與 `apps/web/src/app` 的直接子項目均為 closed topology，由
`pnpm arch:topology` 與 architecture tests 機械驗證。不得採用替代結構、不得自行簡化、不得自行增加平行架構層、不得繞過檢查，也不得以 prototype、migration 或暫時性實作為由破壞 ownership 與依賴邊界。任何合法調整都必須同步修改 canonical owner、checker、正反向測試及 CI 可到達的驗證入口。

公開文件位於 `apps/web/content/docs`，由 Fumadocs 發布；內部 canonical governance 位於 `docs`。兩者可互相連結，但不可複製成兩份 owner 相同的規範。

`apps/web/src/app` 只允許兩種 audience route group：`(public)` 與 `(console)`。
公開網站、Fumadocs 與公開 transport adapter 屬於 `(public)`；產品工作區、平行路由、
intercepted modal 與內部可操作工具屬於 `(console)`。不得以 Bounded Context、產品來源或
template 名稱建立第三種 root audience group；兩個 audience group 之下可使用 organizational route group。

允許的 route segment directory conventions：

| Convention         | 語意                        |
| ------------------ | --------------------------- |
| `folder/`          | 普通靜態路由                |
| `@slot/`           | 平行路由                    |
| `(group)/`         | 路由群組                    |
| `[param]/`         | 動態路由                    |
| `[...param]/`      | Catch-all 動態路由          |
| `[[...param]]/`    | Optional Catch-all 動態路由 |
| `(.)segment/`      | 攔截同層路由                |
| `(..)segment/`     | 攔截上一層路由              |
| `(..)(..)segment/` | 攔截上兩層路由              |
| `(...)segment/`    | 從根路由攔截                |

Next.js 的 `_folder/` 私有資料夾 convention 在本 repository 明確禁用。`app/**` 任意深度只要目錄名稱以 `_`
開頭即由 `pnpm arch:topology` 拒絕；不得以 `_lib`、`_actions`、`_components` 或其他別名規避 ownership。

`apps/web/src/presentation` 已禁止。產品 UI 與 transport mapping 必須下沉到 owning Bounded Context 的 inbound
adapter；Application orchestration 下沉到 owning Context Application。`app/**` 僅保留 final route assembly；
非 JSX wiring 使用責任命名的 `*-composition.ts`，JSX 只存在於核准的 Next.js file conventions。`app/**`
任意深度的 underscore-prefixed private folder 與 `actions.ts` 均由 `pnpm arch:topology` 遞迴拒絕。

`app/**` 內 `.tsx` 只允許以下 Next.js App Router file conventions：

```text
page.tsx
layout.tsx
template.tsx
loading.tsx
error.tsx
global-error.tsx
not-found.tsx
global-not-found.tsx
default.tsx
unauthorized.tsx
forbidden.tsx
icon.tsx
apple-icon.tsx
opengraph-image.tsx
twitter-image.tsx
```

`default.tsx` 只允許直接服務平行路由 slot，或位於擁有平行 route slots 的 segment。`global-error.tsx` 與
`global-not-found.tsx` 必須遵守 Next.js root placement；`global-not-found.tsx`、`unauthorized.tsx`、
`forbidden.tsx` 若目前版本仍要求 experimental configuration，未啟用設定時不得使用。其他 React component
必須位於 owning Context inbound adapter，或在完全 context-neutral 時位於 `@a-i/shadcn/custom`；自訂
composition/component `.tsx` 檔名仍禁止。

`icon.tsx`、`apple-icon.tsx`、`opengraph-image.tsx` 與 `twitter-image.tsx` 是 metadata image conventions，
可用 JSX 產生圖像，但不得作為一般 UI component 或 product behavior 的容器。

Root `manifest.ts`、`robots.ts` 與 `sitemap.ts` 是 Next.js metadata Route Handlers，只描述 web delivery metadata
與公開 crawl surface；不得承載 product ownership、legal policy、visibility rule 或 authorization decision。

## Forbidden parallel structures

- root `modules/`：產品 Context 唯一位置是 `apps/web/src/modules/`。
- root 或 `packages/` 下的 `application`、`contracts`、`domain`、`foundation`、`infrastructure`。
- `packages/tooling` umbrella：工具以精確 package capability 命名並維持 flat。
- 全域 `shared`、`common`、`core`、`utils`、`helpers`。
- 第二份 Context Map、第二套 module generator 或未連到 root validation 的架構規則。

## Change protocol

Context-internal topology is governed by `context-internal-topology.md` and
`context-topology-migration.json`. Horizontal business-layer packages remain forbidden.

新增 root 或 package category 必須先有 owner、consumer、替代方案分析、ADR 與 `arch:topology` 更新。若一個概念帶有產品語意，預設放回 owning Context，而不是建立 technical package。
