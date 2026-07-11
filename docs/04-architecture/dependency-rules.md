# Dependency rules

狀態：Enforced scaffold

依賴方向為 `Presentation → Application → Domain`，`Infrastructure → Application Port → Domain`。Domain 不依賴 Next.js、React、資料庫、Vercel 或外部 SDK；跨 Bounded Context 只能經由公開 contract、port、event 或 published language。

目前尚未建立正式 bounded context；`modules/` 只提供受驗證的生成器。生成後，每個
Context 必須有 `context.json`，並與 `docs/maps/context-map.json` 的同一筆資料完全一致。

自動驗證責任如下：

- pnpm workspace 與 `workspace:*`：明確 package dependency。
- `package.json#exports`：只公開 application facade、published contracts 與 composition。
- dependency-cruiser：`modules/*` 內的 layer direction、cross-context internals 與 circular dependency。
- architecture scripts：exports、Context Map 與 package manifest 一致性。
- Semgrep：高訊號 framework import pattern。

這些工具驗證結構，不能替代 Aggregate、owner 或 ubiquitous language 的設計判斷。
