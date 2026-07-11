# 架構總覽

本專案採 Domain-Driven Modular Monolith with Hexagonal Architecture。每個模組以 bounded context 組織，內部維持 Domain、Application、Infrastructure 與 UI/composition 的清楚責任。

```text
UI / Next.js routes / shadcn
              ↓ application contract / port
Application: use cases, commands, queries
              ↓ domain API
Domain: entities, value objects, policies, invariants
              ↑ adapters
Infrastructure: persistence, external services, framework wiring
```

Domain 不依賴框架；Application 不依賴具體資料庫或第三方 SDK；Infrastructure 在 composition root 綁定 adapter。這份文件描述方向，實際模組變更須有 code/test 證據。
