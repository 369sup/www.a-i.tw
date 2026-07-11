# Standard Bounded Context tree

狀態：Accepted / machine enforced

所有產品 Bounded Context 必須位於單一 deployable application 內，並遵守以下結構：

```text
apps/web/
├── src/
│   ├── app/                                  # Next.js inbound adapters only
│   ├── server/
│   │   └── composition/                      # only concrete-adapter wiring root
│   ├── presentation/
│   │   └── <experience>/                     # cross-context inbound adapters
│   └── modules/
│       └── <bounded-context>/
│           ├── AGENTS.md                     # context-local rules and owner
│           ├── README.md                     # purpose, scope and public language
│           ├── context.json                  # Context Map manifest
│           ├── src/
│           │   ├── domain/                   # aggregates, value objects, policies, events, errors
│           │   ├── application/              # use cases and owned inbound/outbound Ports
│           │   ├── contracts/
│           │   │   └── public.ts             # versioned Published Language only
│           │   ├── infrastructure/           # outbound adapter implementations
│           │   ├── presentation/             # optional context-owned inbound adapters
│           │   ├── public.ts                 # application facade
│           │   └── composition.ts            # adapter exports for app composition root
│           └── tests/                        # domain and application tests
└── package.json                              # the one @a-i/web package boundary
```

## Dependency direction

```text
Next.js routes / UI / Server Actions
                 │ inbound
                 ▼
           Application use cases ──owned outbound Ports──┐
                 │                                      │
                 ▼                                      ▼
              Domain                         Infrastructure adapters

Cross-context consumer ──consumer-owned Port / ACL──> provider contracts/public.ts
```

- Domain 只可依賴同一 Context 的 Domain。
- Application 可依賴同一 Context 的 Domain 與其他 Context 的 published contracts，不可依賴 Infrastructure。
- Contracts 必須獨立，不可輸出 Domain、Application 或 Infrastructure 型別。
- Infrastructure 實作 Application 擁有的 outbound Ports。
- Context `src/presentation` 可包含 context-owned page、form 與 Server Action adapter；
  跨 Context Experience 放在 app-owned `src/presentation/<experience>`。兩者只能經 server
  composition root 取得 application facade。Route 只組合或轉交 presentation。
- 跨 Context 禁止引用 Domain、Application、Infrastructure 或 Composition。
- Context 不得擁有自己的 `package.json`、`tsconfig.json`、lint 或 test runner 設定；它們繼承 `@a-i/web`。
- 禁止新增 root `modules/<context>` runtime 位置或依技術 layer 建立全域 `services`、`models`、`repositories`。

## Enforcement

`pnpm arch:manifests` 驗證必備結構、禁止檔案、owner、subdomain、app package 與 Context Map
一致性；dependency-cruiser、cross-context import checker、Semgrep 與 architecture fixture tests
驗證依賴方向。新 Context 只能透過 `pnpm generate:context` 建立。
