# 架構總覽

本專案採 Domain-Driven Modular Monolith with Hexagonal Architecture。每個業務模組是
`modules/<bounded-context>` 下的 pnpm workspace，內部維持 Domain、Application、
Infrastructure、Contracts 與 Composition 的清楚責任。`apps/web` 是唯一目前已存在的
部署入口；它的 route 與 UI 只負責 inbound adapter 與 rendering。

```text
UI / Next.js routes / shadcn
              ↓ application contract / port
Application: use cases, commands, queries
              ↓ domain API
Domain: entities, value objects, policies, invariants
              ↑ adapters
Infrastructure: persistence, external services, framework wiring
```

Domain 不依賴框架；Application 不依賴具體資料庫或第三方 SDK；Infrastructure 在 app-local
composition root 綁定 adapter。跨 Context 只可使用發布方的 `./contracts` package
entrypoint。`pnpm arch:check` 將 package exports、manifest、workspace dependencies 與
實際 import graph 視為硬性 gate。
