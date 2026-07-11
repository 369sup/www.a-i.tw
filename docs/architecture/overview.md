# 架構總覽

本專案採 Domain-Driven Modular Monolith with Hexagonal Architecture。每個 Bounded Context
都有 Domain、Application、Infrastructure、Contracts 與 Composition 的清楚責任；正式產品
Context 一律位於 `apps/web/src/modules/<bounded-context>`。現存的 `master-template`
與產品 Context 使用相同 app-local 邊界：它不作為
跨 Context package 發佈，仍遵守相同的依賴方向。`apps/web` 是目前唯一部署入口；route
與 UI 只負責 inbound adapter 與 rendering。

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
