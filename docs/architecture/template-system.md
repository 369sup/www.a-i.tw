# Master and sub templates

狀態：Current — formal template bounded context.

本專案採單一 deployable 的 modular monolith。正式產品 Context 預設為
`apps/web/src/modules/<context>` app-local Context；`master-template` 與產品 Context
共用同一套邊界，不提供跨 Context implementation API。
它具有 supporting subdomain `sub-template`。

| Template          | Location                                                           | Purpose                                 | Runtime status        |
| ----------------- | ------------------------------------------------------------------ | --------------------------------------- | --------------------- |
| `master-template` | `apps/web/src/modules/master-template`                             | Template Management bounded context     | formal runtime module |
| `sub-template`    | `apps/web/src/modules/master-template/src/subdomains/sub-template` | Master Template 的 supporting subdomain | internal capability   |

## Master template

Master Template 是正式的 template domain model，不是本產品既有的 Repository、Account
候選模型。它保留完整的依賴方向與 UX 證據：

```text
Next.js Route or intercepted `@modal` slot
  → Server Action / inbound adapter
  → application use case
  → Master Template aggregate / Sub Template capability
  → outbound ports
  → infrastructure adapter
  → `apps/web/src/server/composition/` composition root
```

目前可執行 slice 的入口為 `/architecture/master-template/:namespace/resources`。Route、
Server Action 與 modal 都是 inbound adapter；它們只轉換 transport 資料、呼叫 application
use case，並將穩定 result 映射成 UI/HTTP 行為。

示範 adapter 是 process-local in-memory store，僅用來證明 port wiring 與 race-condition
result mapping；不得作為 production persistence 設計。`server-only` app-local composition
root 是唯一可 import concrete adapter 的位置；Client Component、Domain 與 Application 都
不得 import adapter 或 composition。

## Sub-template

`sub-template` 是 Master Template context 內的 supporting subdomain，不是第二個 bounded
context，也不會產生第二個 pnpm package、Context Map entry 或 cross-context contract。它可
維持自己的 Domain/Application/Infrastructure 內部 hexagon，但只能透過 Master Template
的 application port 與 composition 被使用。

## Adoption checklist

- 在複製前記錄 actor、business outcome、owner、aggregate boundary 與資料分類。
- 先定義 Domain invariant，再定義 use-case input/result 和 outbound ports。
- 用 fake/in-memory adapter 完成 application tests，再加入真實 adapter integration tests。
- 由 `apps/<app>/src/server/composition/` 接線，並以 `server-only` 保護。
- 若 UX 需要可分享的 overlay，使用 Parallel + Intercepting Routes；其 slot 是 presentation
  responsibility，不是 bounded context。
- 建立正式 Context 前，更新 Context Map、ADR、contract、architecture gates 與 E2E evidence。

實際結構與 Ports & Adapters 責任見
[`master-template-conformance.md`](master-template-conformance.md)。
