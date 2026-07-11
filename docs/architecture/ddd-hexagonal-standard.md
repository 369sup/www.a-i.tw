# DDD Modular Monolith and Hexagonal Architecture Standard

狀態：Accepted / canonical / machine enforced

本文件是本 repository 對 Domain-Driven Modular Monolith、Hexagonal Architecture 與
Ports and Adapters 的唯一結構標準。若其他文件、memory、skill、route 或 generator 與本
文件衝突，以 runtime evidence、Context Map manifest 與本文件為準。

## 1. Strategic model

```text
Domain Vision
  -> Business Capability Map
    -> Subdomain Classification
      -> Bounded Context Catalog
        -> Ubiquitous Language
          -> Context Map + Upstream/Downstream Matrix
            -> Published Contracts + Dependency Policy
```

未完成 owner、problem、subdomain classification、Context boundary、first use case 與
public-language decision，不得建立 runtime Context。戰略文件描述 why/ownership；不得以
route、database table、SDK 或 package 名稱反推 Domain。

## 2. Runtime structure

```text
apps/web/src/
├── app/                                  # Next.js inbound routing only
│   ├── (public)/                         # public site, docs and public endpoints
│   └── (console)/                        # product workspaces and parallel routes
├── presentation/<experience>/            # cross-context inbound adapters
├── server/composition/                    # only concrete adapter wiring root
└── modules/<bounded-context>/
    ├── AGENTS.md
    ├── README.md
    ├── context.json
    ├── src/
    │   ├── domain/                       # Aggregate, VO, policy, event, error
    │   ├── application/                  # use cases and owned Ports
    │   ├── contracts/public.ts           # versioned Published Language
    │   ├── infrastructure/               # outbound adapter implementations
    │   ├── presentation/                 # optional context-owned inbound adapters
    │   ├── subdomains/<subdomain>/       # declared internal supporting capability
    │   │   ├── README.md
    │   │   ├── domain/
    │   │   ├── application/
    │   │   ├── infrastructure/
    │   │   └── composition.ts
    │   ├── public.ts                     # application facade
    │   └── composition.ts                # module factory / adapter exports
    └── tests/
```

一個 Bounded Context 是語言、一致性與 ownership boundary，不是 route 或資料表。
Internal subdomain 必須列在 `context.json.internalSubdomains`；未宣告不得建立平行
capability folder。

## 3. Dependency rules

```text
Presentation / Infrastructure ---> Application ---> Domain
             composition root wires ^ owned Ports

Consumer Application ---> consumer-owned Port / ACL ---> Provider Contract
```

- Domain 只依賴同一 Domain，不 import framework、SDK、Application、Contracts 或 Infrastructure。
- Application 擁有 use case 與 inbound/outbound Ports；不 import concrete adapter。
- Infrastructure 實作 owning Application 的 outbound Port，不擁有 business rule。
- Contracts 是 provider-owned、versioned、standalone Published Language，不輸出 Domain type。
- Presentation 只做 transport/view mapping、validation 與 application invocation。
- 只有 `apps/web/src/server/composition` 可組裝 concrete adapters。
- Cross-context 只可 import provider `src/contracts/`，並需要 manifest relationship。
- 禁止 Shared Kernel，除非 ADR、joint owner、compatibility、tests、removal plan 全部核准。

## 4. Aggregate and transaction rules

- Aggregate 由 invariant 與 transaction boundary 定義，不由 JSON、table 或 screen 定義。
- 一個 command transaction 修改一個 primary Aggregate。
- 跨 Context 不使用 foreign-key navigation 或跨 Context transaction 維持 invariant。
- Query 回傳 purpose-specific read model，不回傳 ORM row 或可變 Domain entity。
- Domain event、integration event、audit record 與 command 必須分開命名與登錄。

## 5. Package policy

`packages/*` 只容納 context-neutral technical capability。禁止
`packages/application`、`contracts`、`domain`、`foundation`、`infrastructure`
與 umbrella `tooling`。產品語意一律回到 owning Context。

## 6. Architecture document control

[`architecture-governance.json`](architecture-governance.json) 恰好登錄 30 個 required
concerns。文件類型的最低內容：

- Strategy：purpose、problem、owner、scope、evidence、decision、open questions、review trigger。
- Catalog/Matrix：current vs target、owner、runtime reference、contract/version、last verified。
- Policy：rule、forbidden behavior、exception process、enforcement、evidence。
- ADR：context、decision、alternatives、consequences、supersession。
- Status/Audit：date、scope、command/evidence、findings、debt、next gate。
- Roadmap：current state、target state、ordered migration、entry/exit criteria、rollback.

文件狀態只能描述 evidence：`current`/ `accepted` 需要 runtime 或 validation evidence；
`baseline` 是已採用的策略基線；`proposed` 不得被程式碼當成已核准需求；
`none-approved` 明確表示刻意沒有該機制。

## 7. Definition of ready

新增 Context 或 internal subdomain 前必須確認 owner、actor/problem、success measure、
classification、language、Aggregate candidate、first use case、Ports、contract decision、
data owner、Context Map edge、acceptance criteria 與 ADR。

## 8. Definition of done

程式碼、manifest、30-concern registry、canonical docs、Fumadocs public statement、Serena
navigation、architecture fixtures 與 validation command 必須一致。Runtime/boundary 變更至少
通過 `pnpm check`、`pnpm docs:check`、`pnpm arch:check`、`pnpm build` 與
`pnpm semgrep`。
