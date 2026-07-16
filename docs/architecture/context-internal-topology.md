# Bounded Context internal topology

狀態：Accepted canonical / templateVersion 2 / ADR 0014 6 Groups、12 Areas、37 physical Contexts

Domain Group 與 Domain Area 是 organizational navigation boundaries；Bounded Context 才是 language、ownership、
runtime 與 consistency boundary。每個 Context 保留 ADR 0011 的 capability-oriented fixed template；ADR 0014
接替 physical placement registry。六個 Groups 與十二個 Areas 是 closed taxonomy，不得加入 sub-Area、account type 或
resource scope 目錄層。

## Canonical tree

```text
apps/web/src/modules/<domain-group>/<domain-area>/<bounded-context>/
├── AGENTS.md
├── README.md
├── context.json
├── public-api.ts
├── domain/<domain-capability>/
│   ├── aggregates/
│   ├── entities/
│   ├── value-objects/
│   ├── domain-services/
│   ├── policies/
│   ├── specifications/
│   ├── events/
│   └── errors/
├── application/
│   ├── commands/<command>/{command.ts,handler.ts}
│   ├── queries/<query>/{query.ts,handler.ts}
│   ├── use-cases/
│   ├── process-managers/
│   ├── dto/
│   └── ports/{inbound,outbound}/
├── contracts/<contract-version>/
│   ├── public.ts
│   ├── commands/
│   ├── queries/
│   ├── events/
│   ├── dto/
│   └── errors/
├── adapters/
│   ├── inbound/{http,server-actions,events,jobs,ui}/
│   └── outbound/{persistence,integrations,messaging,cache,telemetry}/
├── composition/
│   ├── index.ts
│   └── <composition-module>.ts
└── tests/{domain,application,adapters,contracts,architecture}/
```

Angle-bracket names are patterns, never literal directories. The generator creates the primary
`domain/<domain-capability>` from `context.json.subdomain.name`; additional capabilities require owned semantics and
kebab-case names. Category directories are fixed leaves. `commands/` and `queries/` are the only tactical parents that
accept named child directories, each with exactly its message and `handler.ts`. Contract versions use `v<number>`.

Every fixed directory is created atomically and retained with `.gitkeep` when empty. A Domain Group contains only
`AGENTS.md`, `README.md`, `group.json`, and declared Areas. A Domain Area contains only `AGENTS.md`, `README.md`,
`area.json`, and declared Contexts; both governance layers own no runtime. A Context root contains only the six fixed
directories and its four owner/public files. Ownership-free `shared`, `common`, `core`, `utils`, and `helpers` remain
forbidden.

## Dependency and entrypoints

```text
Inbound Adapter -> Application -> Domain
Application -> owned inbound/outbound Port
Outbound Adapter -> owned outbound Port
Consumer adapters/outbound/integrations -> Provider contracts/vN/public.ts
Context composition -> Context-owned factories and adapters
App server composition -> Context composition/public-api
```

- Domain code is framework-, SDK-, I/O-, Application-, Contract-, Adapter-, and Composition-free.
- Application owns use cases, messages, DTOs, process managers and Ports; it never constructs concrete adapters.
- `contracts/vN/public.ts` is standalone versioned Published Language and the only peer-Context entrypoint.
- `public-api.ts` is the explicit app-facing Application facade; peer Contexts must not import it.
- `composition/` may expose Context-owned factories/adapters, but final cross-Context and app assembly remains in
  `apps/web/src/composition`.
- Domain Events stay internal; only versioned contract events are integration events.

### Two public surfaces, two consumers

這兩個入口的核心差異不是「是否公開」，而是公開給誰、承諾穩定到什麼程度：

> `public-api.ts` 是應用程式內部公開邊界；`contracts/vN/public.ts` 是 Bounded Context 對同儕 Context
> 發布的正式語言。

| 項目                   | `public-api.ts`                                        | `contracts/vN/public.ts`                               |
| ---------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| 面向對象               | App shell、UI、Server Actions、jobs、final composition | 其他 Bounded Context、事件消費者、跨服務整合           |
| 性質                   | App-facing API                                         | Peer-facing Published Language                         |
| 穩定性                 | 可跟隨單體應用一起調整                                 | 必須版本化、向後相容或明確升版                         |
| Runtime value          | 可以                                                   | 原則上只允許純 protocol constants 或 standalone schema |
| Facade                 | 可以公開 app-facing facade                             | 只公開 facade interface，不公開實作                    |
| Factory                | 可供 final app composition 使用                        | 禁止                                                   |
| Application dependency | 可重新匯出受控的 Application 能力                      | 不得依賴 Application 實作                              |
| Composition dependency | 可經 Context `composition/` 提供 app wiring 能力       | 絕對禁止                                               |
| Standalone             | 不要求可獨立封裝                                       | 必須可獨立抽出與相容性驗證                             |
| 版本策略               | 通常不設版本                                           | 必須使用 `v1`、`v2` 等明確版本                         |

`public-api.ts` 回答「如何在目前應用程式裡使用我」。它可以公開 Application facade interface/runtime、
app-specific factory、inbound adapter factory、Server Action entry、UI entry component、Published contracts 與受控的
Context-specific app helper。它仍不得直接公開 Aggregate、Entity、repository implementation、ORM model、handler、
internal Domain service 或 internal Application Port。它的 `public` 是 module-level public，不是 peer contract。

`contracts/vN/public.ts` 回答「其他 Bounded Context 可以依賴我所說的哪些正式語言」。它可以公開 Command、
Query、Result、DTO、error code、integration event、facade interface、standalone schema、protocol constant 與 version
metadata；禁止公開 handler、use-case implementation、factory、composition module、repository Port/adapter、Aggregate、
Entity、Domain service，或任何 Next.js、React、Prisma、Supabase 等 framework/vendor type。

`contracts/vN/` 的 standalone 約束是：不得 import `domain`、`application`、`adapters`、`composition`，不得讀取
環境變數、執行 I/O，且 Published Language 必須使用可交換、可序列化、可版本化的語意，不得重用內部
Aggregate、Entity 或 Value Object。純 schema library 只有在不引入 framework、I/O 或 Context internal type 時才可用。

實際依賴方向為：

```text
App Router / UI / Server Action
    -> bounded-context/public-api.ts
    -> Application facade
    -> Application handler/use case
    -> Domain

Consumer Bounded Context
    -> consumer-owned Application Port
    <- consumer adapters/outbound/integrations
    -> provider contracts/vN/public.ts
    -> provider facade implementation wired by apps/web/src/composition
```

Consumer 不得直接 import provider handler。Provider 的 contract 若已發布，破壞性變更只能保留相容 v1 adapter、
新增 `contracts/v2`，或先 deprecated 再安排遷移；不得因單體內部重構而無聲更改。

這個分離有四個直接優勢：

1. 同儕 Context 不會意外耦合 UI、framework、concrete adapter 或可變的 Application DTO。
2. Published Language 可獨立做版本與相容性測試，不受 app-facing refactor 影響。
3. Consumer-owned Port 與 ACL 保留各 Context 的 Ubiquitous Language，不共享跨 Context 物件模型。
4. 未來抽 package、拆服務、改 persistence 或 framework 時，peer protocol 不必跟著 app composition 改寫。

判斷 export 歸屬時只問兩題：若能力只服務目前 Next.js 單體，放 `public-api.ts`；若其他 Context 必須依賴，且在
Provider 搬移、拆服務或改寫後仍應有效，放 `contracts/vN/public.ts`。因此 peer import provider `public-api.ts`，或
App route import Context internals，即使 TypeScript 能解析也都是 boundary violation。

本 repository 的 Context root 是封閉拓撲，不建立 `internal-api.ts`。同一 Context 內部使用相對 import；任何需要
跨 root 的能力都必須明確選擇上述兩個公開面之一。新增 `schemas/`、`application.ts`、`latest.ts` 等 contract
類別屬於 templateVersion migration，必須另經 ADR 與 checker 更新，不能以局部檔案繞過固定模板。

### Common anti-confusion guardrails

以下配對用於避免術語重疊解讀；若衝突，依 ownership table、dependency rules 與 Context Map 關係裁決：

| Pair | Must mean | Must not mean |
| --- | --- | --- |
| Inbound Port vs Contract | Inbound Port 是 Context 內 Use Case 介面；Contract 是跨 Context 發布語言。 | 以 Contract 取代本地 inbound Port，或把 inbound Port 當 peer entrypoint。 |
| Facade vs Port | Facade 是 app-facing 或 contract-facing 呼叫面；Port 是 Application 擁有的能力需求/提供介面。 | 以 Facade 取代 Port ownership，或在 Domain 依賴 Facade。 |
| Persistence Mapper vs Contract Mapper | Persistence mapper 僅在 `adapters/outbound/persistence` 映射 storage model。Contract 映射屬 Published Language/ACL 映射。 | 把 persistence record 直接當 contract DTO，或把 contract 映射放進 Domain。 |
| HTTP DTO vs Application DTO vs Contract DTO | HTTP DTO 屬 inbound transport mapping；Application DTO 屬 use-case input/result；Contract DTO 屬版本化 Published Language。 | 讓 HTTP payload 直接流入 Domain，或以 Application DTO 充當 peer contract。 |
| Domain Service vs Use Case | Domain Service 是純 Domain decision/predicate；Use Case 是 Application orchestration。 | 把 workflow/adapter coordination 放進 Domain Service。 |
| Policy vs Specification | 兩者都屬純 Domain predicate；Policy 偏決策規則，Specification 偏可組合判定條件。 | 在其中任一者放 I/O、transport、authorization adapter 邏輯。 |
| Process Manager vs Domain Event Handler | Process Manager 只負責跨步驟、跨 Aggregate/Context 的長流程協調。Domain Event handler 僅處理 Context 內部事件反應。 | 把一般短流程 orchestration 放進 process-managers，或把 integration 流程塞進 Domain event handler。 |

補充：Application layer 的對外跨 Context 協作永遠先由 consumer-owned outbound Port 建模，再由 outbound
integration adapter 對接 provider `contracts/vN/public.ts`；不得直接以 Facade 或 handler 跳過 Port。

## Enforcement

`context-topology-migration.json` is in target mode with `boundedContextTemplateVersion: 2` and no legacy Contexts.
`pnpm arch:context-template` validates root entries, primary capability, fixed categories, command/query pairs, contract
versions, composition, tests, manifests and the closed six-Group/twelve-Area registry. `pnpm arch:cross-context`,
`pnpm arch:exports`, Dependency Cruiser, Semgrep and architecture tests enforce dependency and Published Language rules.
No lifecycle label, hand edit, prototype or temporary implementation waives these gates.

The canonical portfolio currently contains 20 runtime Contexts and 17 planned descriptors. Planned Contexts contain no
runtime tree and never enter `docs/domains/context-map.json`.
