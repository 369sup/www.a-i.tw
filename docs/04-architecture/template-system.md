# Master and sub templates

狀態：Current — architecture-only reference, not a product runtime declaration.

本專案有兩種腳手架。它們協助實作，但不取代 bounded-context 的 owner gate：`modules/`
仍只容納有正式 owner、Context Map manifest 與 public-language 決策的 runtime context。

| Template          | Location                                                              | Purpose                                      | Runtime status             |
| ----------------- | --------------------------------------------------------------------- | -------------------------------------------- | -------------------------- |
| `master-template` | `apps/web/src/master-template` and `app/architecture/master-template` | 可執行的完整 Ports & Adapters vertical slice | architecture showcase only |
| `sub-template`    | `templates/sub-template`                                              | 已核准 Context 內子能力的最小起點            | copy-only, never loaded    |

## Master template

Master template 的 `Resource` 是範例語言，不是本產品的 Repository、Account 或其他
正式 Domain 模型。它保留完整的依賴方向與 UX 證據：

```text
Parallel / Intercepting Route + shared form
  → Server Action (parse, authenticate boundary, map result)
  → application use case + consumer-owned ports
  → Domain Resource + ResourceName invariant
  → in-memory adapter
  → app-local server composition root
```

入口為 `/architecture/master-template/acme/resources`：soft navigation 到 `new` 時，
root-level `@modal/(...)architecture/.../new` 顯示 Dialog 並保留列表；hard navigation 或
refresh 到同一 URL 時，`new/page.tsx` 顯示完整表單頁。`@modal/default.tsx` 與 catch-all
null route 是 Parallel Route 的必要恢復/關閉行為。

示範 adapter 是 process-local in-memory store，僅用來證明 port wiring 與 race-condition
result mapping；不得作為 production persistence 設計。`server-only` app-local composition
root 也刻意展示 Client Component 不得 import adapter 或 composition 的邊界。

## Sub-template

當產品 owner 核准一個 Context 後，從 `templates/sub-template` 複製所需 capability 形狀，
再以 `pnpm generate:context` 建立正式 workspace。它不能自行產生 `context.json`、package
exports 或 cross-context contract；這些都屬於 owner context。

## Adoption checklist

- 在複製前記錄 actor、business outcome、owner、aggregate boundary 與資料分類。
- 先定義 Domain invariant，再定義 use-case input/result 和 outbound ports。
- 用 fake/in-memory adapter 完成 application tests，再加入真實 adapter integration tests。
- 由 `apps/<app>/src/server/composition/` 接線，並以 `server-only` 保護。
- 若 UX 需要可分享的 overlay，使用 Parallel + Intercepting Routes；其 slot 是 presentation
  responsibility，不是 bounded context。
- 建立正式 Context 前，更新 Context Map、ADR、contract、architecture gates 與 E2E evidence。
