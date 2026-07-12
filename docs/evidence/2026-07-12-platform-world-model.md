# Platform world model verification

日期：2026-07-12

## Scope

- 將 `Identity & Access > Account > Repository` 父子樹修正為 Actor／Scope／Resource／Action／
  Relationship／Decision／Event／Projection 世界模型。
- 明確區分 relationship graph 的語意與 owner，不建立中央 Relationship Service。
- 登錄橫切 control planes，並標示 Current、Deferred 與 Not approved。
- 將 Experience 的最小 `RequestEnvelopeV1` 從 Repository capability resolver 拆為獨立 protocol；
  Repository resolver 保留 Resource／Action／Decision orchestration。

## Ownership evidence

- Identity & Access：Principal、Authentication、Session／Actor facts。
- Account：Account／Scope、Membership、Team 與 ownership facts。
- Repository：Repository lifecycle、grants、roles 與 resource action decision。
- Experience：request-scoped envelope、capability resolver 與 consumer-shaped projection。
- 未新增 Bounded Context、Shared Kernel、中央 policy owner 或通用 relationship store。

## Verification

| Check              | Result                                                       |
| ------------------ | ------------------------------------------------------------ |
| Serena diagnostics | changed TypeScript files clean                               |
| `pnpm check`       | 25 tasks passed; web 21 tests passed, 1 todo                 |
| `pnpm docs:check`  | ownership, 30 concerns, links and workspaces passed          |
| `pnpm arch:check`  | 167 modules / 271 dependencies; 11 architecture tests passed |
| `pnpm build`       | Next.js 16.2.10 production build passed                      |
| `pnpm semgrep`     | 119 targets, 0 findings                                      |
| `pnpm test:e2e`    | 4 Chromium flows passed                                      |
| `git diff --check` | passed                                                       |

`arch:check` 與 E2E 在 restricted sandbox 首次因 child-process／webServer 權限失敗；使用限定的
WSL Node PATH 在 sandbox 外重跑後通過。Production build 的 sandbox session 未回傳終止狀態，
同樣以限定 WSL Node PATH 重跑並取得成功輸出與 exit 0。

## Deferred

Enterprise Governance、Entitlement、Notification、Search、Audit、Integration、Follow、Star、Watch
仍沒有 owner／runtime gate，不在本次實作範圍。它們不得以 optional context fields 或 generic
service placeholders 先行加入。
