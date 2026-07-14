# Dependency rules

狀態：Enforced scaffold

依賴方向為 `adapters/inbound → Application → Domain` 與
`adapters/outbound → Application Port → Domain`。Domain 不依賴 Next.js、React、資料庫、Vercel 或外部 SDK。
跨 Context 只允許 consumer `adapters/outbound/integrations` 實作 consumer-owned Port，並指向 provider
`contracts/vN/public.ts`。

產品 Bounded Context 一律位於九個合法
`apps/web/src/modules/<domain-group>/<domain-area>/<bounded-context>/` 路徑之一。每個已建立的 Context 都必須由父層
`group.json` 登錄，且 `context.json` 必須宣告 `boundaryType: bounded-context`、目前的 `templateVersion`，並與
`docs/domains/context-map.json` 的同一筆資料完全一致。

自動驗證責任如下：

- pnpm workspace 與 `workspace:*`：明確 package dependency。
- Context entrypoints：peer 只用 Published Language；app server composition 才能使用 facade 與 composition。
- dependency-cruiser：`apps/web/src/modules/<domain-group>/<domain-area>/<bounded-context>` 內的 layer direction、cross-context
  internals 與 circular dependency。
- architecture scripts：entrypoints、importer layer、Context Map、manifest 與 exception registry 一致性。
- Semgrep：高訊號 framework import pattern。

這些工具驗證結構，不能替代 Aggregate、owner 或 ubiquitous language 的設計判斷。
