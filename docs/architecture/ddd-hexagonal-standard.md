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

GitHub 非 Code semantic reconstruction 的 canonical sequence 由
[`../product/product-model.md`](../product/product-model.md) 與
[`../roadmap/context-migration-roadmap.md`](../roadmap/context-migration-roadmap.md) 擁有。順序只核准下一個
implementation gate，不代表後續 capability 已存在；每一步都必須重新滿足 Definition of Ready。

每個核准 slice 必須由已核准的 first use case 驅動，不採固定的 Value Object-first、Entity-first、
Contract-first 或 Adapter-first 順序。先描述 actor、input、success result、failure conditions、需要保存的狀態與
外部依賴，再從可驗證的 business invariants 推導 Aggregate boundary 及必要的 tactical artifacts。Value Object
只在承載該 use case 的核心語意、正規化、相等性、範圍或 invariant，或需要消除可實際混用的 primitive
obsession 時建立；不得只包裝 primitive、預測未核准需求，或把 Contract DTO／persistence record 當成 Domain
Value Object。

Value Object 不因名稱相同而跨 Context 共用；禁止 global ID／Name／Status／Role type 或 ownership-free
`shared/value-objects`。空目錄、type alias 數量或 adapter 搬遷都不能代替 semantic completeness。

### 1.1 First use case vertical-slice protocol

實作前，`context.json` 必須已核准 owner、Domain、strategic Subdomain、classification、problem、first use case
與 source of truth；Context owner 文件必須界定擁有的 language、data、transaction，以及明確不擁有的能力。
First use case 規格至少記錄：

1. actor 與 trigger；
2. input 與 preconditions；
3. successful state transition 與 result；
4. failure conditions；
5. 必須保存的 authoritative state；
6. 所需外部 capability 與 consistency requirement。

`context.json.firstUseCase` 保留簡短、機器可驗證的摘要；詳細行為與驗收條件由 Context `README.md`、
Application use-case 文件或具名測試擁有，不把 manifest 擴張成實作規格。

每個 slice 依下列因果順序推導，但以一條可執行流程迭代，不要求一次填滿所有 tactical category：

```text
approved use case
  -> acceptance and failure cases
    -> business invariants
      -> Aggregate and transaction boundary
        -> necessary Entity / Value Object / Policy / Specification / Domain Service
          -> Aggregate behavior, Domain Error and Domain Event
            -> inbound and outbound Ports
              -> Application orchestration and DTOs
                -> outbound and inbound Adapters
                  -> Context composition
                    -> app-facing public-api.ts
                      -> peer contract only when a peer consumer exists
                        -> architecture, integration and runtime verification
```

Tactical artifact 的選擇規則：

- 具有 identity 與獨立 lifecycle，且位於某 Aggregate transaction boundary 內：Entity。
- 由值定義、不可變，且承載本 use case 的 Domain 語意或 invariant：Value Object。
- 保護同步一致性與 state transition：Aggregate／Aggregate Root。
- 跨多個 Domain Object 的純決策或 predicate：Policy／Specification／Domain Service。
- 協調 Application 流程或跨 Aggregate／Context 的長流程：Use Case／Process Manager。
- Application 執行 use case 所需的外部能力：consumer-owned outbound Port。
- Peer Context 必須長期依賴的可交換語言：provider-owned `contracts/vN` Published Language。

沒有 peer consumer 時，不得為完整模板虛構 `contracts/v1` source；固定 contract leaves 以 `.gitkeep` 保留。
存在 peer consumer 時，必須先核准 Context Map relationship，再建立 provider contract、consumer outbound Port
與 consumer `adapters/outbound/integrations` ACL。Contract 使用 standalone DTO／schema，不輸出 Domain type、
Application implementation 或 composition factory。

Context 先完成自己的 composition，才由 `public-api.ts` 選擇性公開 app-facing facade 或 factory；
`public-api.ts` 不得成為 Domain、Application、Adapter 或 peer contract 的總索引。

測試隨 slice 建立，依 blast radius 演進：Domain invariant tests、Application use-case success/failure tests、
Adapter mapping/reconstruction tests、必要時的 Contract compatibility tests、Architecture boundary tests，最後是
Runtime integration tests。沒有對應 artifact 或 peer contract 時，不建立空測試來填滿分類。

## 2. Runtime structure

> Canonical topology: ADR 0011 capability-oriented templateVersion 2. ADR 0010 is historical; every existing and new
> Context uses the same enforced template.

```text
apps/web/src/
├── app/                                  # Next.js inbound routing only
│   ├── (public)/                         # public site, docs and public endpoints
│   └── (console)/                        # authenticated product routes and parallel routes
├── composition/                           # only concrete adapter wiring root
└── modules/<domain-group>/<domain-area>/<bounded-context>/
    ├── domain/<capability>/{aggregates,entities,value-objects,domain-services,policies,specifications,events,errors}/
    ├── application/{commands,queries,use-cases,process-managers,dto,ports/{inbound,outbound}}/
    ├── contracts/<version>/{public.ts,commands,queries,events,dto,errors}/
    ├── adapters/{inbound,outbound}/
    ├── composition/index.ts
    ├── tests/{domain,application,adapters,contracts,architecture}/
    └── public-api.ts
```

一個 Bounded Context 是語言、一致性與 ownership boundary，不是 route 或資料表。
Domain Group 父層只負責 placement，不得擁有 Domain、Application 或 Adapter。Strategic Subdomain 由 Context
manifest 宣告；固定目錄必須一次完整建立。

Domain Group 僅有一層，且第一層固定為 `platform-governance`、`collaboration`、`engagement`、`ecosystem`、
`business-operations`、`programs`。其下固定為 ADR 0014 的十二個 Domain Areas；既有與新增 Context 必須歸屬
其中之一，不得巢狀 Domain Group、Domain Area 或新增 sub-Area。

## 3. Dependency rules

```text
Inbound UI / Infrastructure ----> Application ---> Domain
             composition root wires ^ owned Ports

Consumer Application ---> consumer-owned Port
Consumer Outbound Adapter ---> Provider contracts/vN/public.ts
App server composition ---> Context composition/public-api
```

Membership/Team slice 的 mapping 是：repository-console form／Server Action 為 inbound adapter；Organization Participation
Application 擁有 invite／accept／remove Membership、manage Team use cases 與 store Ports；Organization Participation
Domain 擁有 Invitation、Membership 與 Team invariants；in-memory stores 為 outbound adapters；
product composition 是唯一 wiring root。Authorization & Policy 透過 consumer-owned Ports／ACL
消費 `MembershipFactV1`、`TeamMembershipFactV1` 與 active Principal facts，並擁有 Repository Access Grant、
Role、Permission mapping 與 decision；Repository 只透過 `RepositoryAuthorization` Port 與 ACL 消費其
Published Language。

- Domain 只依賴同一 Domain，不 import framework、SDK、Application、Contracts 或 Infrastructure；環境值、目前時間與
  隨機性必須由 Application／Port 以明確值供應，不得在 Domain 直接讀取 ambient runtime state。
- Application 擁有 use case 與 inbound/outbound Ports；不 import concrete adapter。
- Infrastructure 實作 owning Application 的 outbound Port，不擁有 business rule。
- `contracts/vN/public.ts` 是 provider-owned、versioned、standalone Published Language，不輸出 Context internal type。
- Inbound Adapter 只做 transport/view mapping、validation 與 application invocation。
- 只有 `apps/web/src/composition` 可組裝 concrete adapters。
- Request context 採最小 envelope；每個 capability family 擁有 typed resolver。禁止 universal
  `RequestContextService`、巨型 optional DTO、中央 relationship graph 或中央 authorization rule。
- Context 欄位只有在目前 capability 必須使用、來源 owner 已核准、失敗語意明確時才可加入；
  未核准的 Enterprise／Policy／Entitlement facts 必須省略，不得以空欄位假裝已整合。
- Domain、Application、Contracts 與 inbound UI 不得認識其他 Context internal implementation。
- 跨 Context 語意依賴只能由 consumer `adapters/outbound/integrations/**` 實作 consumer-owned Application Port，
  並 import provider `contracts/vN/public.ts`。
- 每個跨 Context import 都需要 manifest relationship；既有例外只能列於
  `cross-context-dependency-exceptions.json`。例外必須有 consumer、provider、file、owner、reason、tracking issue、
  ADR、建立日、到期日與 removal plan；過期或未被實際使用的例外直接失敗。
- 禁止 Shared Kernel，除非 ADR、joint owner、compatibility、tests、removal plan 全部核准。

## 4. Development anti-rules and impact scopes

以下 impact scope 是 architecture review、tests、Semgrep 與文件審查共用的封閉枚舉：

| Scope          | Meaning                                                           |
| -------------- | ----------------------------------------------------------------- |
| `semantics`    | Ubiquitous Language、invariant、owner 與概念區分                  |
| `topology`     | Domain Group、Domain Area、Bounded Context、目錄與 runtime status |
| `domain`       | Value Object、Entity、Aggregate、Domain service／policy           |
| `application`  | Command、Query、use case、process manager 與 Ports                |
| `contract`     | versioned Published Language 與 Context Map relationship          |
| `adapter`      | inbound/outbound mapping、persistence、integration、messaging     |
| `composition`  | concrete adapter selection、lifecycle 與 cross-Context wiring     |
| `presentation` | route、Server Action、UI、view model 與 request mapping           |
| `data`         | source of truth、persistence record、projection 與 consistency    |
| `status`       | Current／Prototype／Research／Proposed 與 dated evidence          |
| `verification` | Domain/Application/architecture/security tests 與 build           |
| `docs-memory`  | canonical 文件、Serena navigation 與 Codex durable note           |

| Rule     | Normative anti-rule                                                                                                 | Impact scopes                                              | Required enforcement                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `AR-001` | Candidate、roadmap、GitHub capability 或空 template 不得被描述成 Current runtime。                                  | `topology`, `status`, `docs-memory`                        | manifest runtime evidence、dated verification、docs/status checks                     |
| `AR-002` | 不得從 route、screen、table、SDK、package 或文件導覽直接推導 Bounded Context。                                      | `semantics`, `topology`, `data`                            | G1 problem/owner/invariant/first-use-case approval與 `generate:context` gate          |
| `AR-003` | 不得建立 ownership-free global `Id`、`Name`、`Status`、`Role`、`Scope`、`Visibility` 或 `Reference` product type。  | `semantics`, `domain`, `contract`                          | Context-owned VO、UL owner、architecture import tests                                 |
| `AR-004` | Principal、Credential、Session、Account、Profile、Organization 與 Enterprise 不得互為別名或 universal Aggregate。   | `semantics`, `domain`, `application`                       | UL forbidden terms、Domain tests、typed use-case input                                |
| `AR-005` | Organization／Enterprise 不得作為登入 Actor；Profile／Active Scope 不得取代 authenticated Principal。               | `semantics`, `domain`, `application`, `presentation`       | Identity contract、request-envelope tests、Account invariants                         |
| `AR-006` | Organization Membership、Team Membership、resource Grant、Role、Policy 與 Entitlement 不得合併成單一關係或 enum。   | `semantics`, `domain`, `contract`, `data`                  | owning Context facts、distinct state machines、contract tests                         |
| `AR-007` | Authority／Policy 不得成為 God Context；resource Context 必須保留其 action、grant、precondition 與最終決策。        | `semantics`, `domain`, `application`, `contract`           | consumer-owned Port/ACL、resource authorization tests                                 |
| `AR-008` | 相同字面值不得被當成跨 Context 相同語意；Repository、Project、Team、App 的 Visibility/Status 各自擁有。             | `semantics`, `domain`, `contract`                          | Context-local VO 與禁止 shared enum                                                   |
| `AR-009` | Internal Domain VO、Entity、Aggregate 或 Application DTO 不得直接發布為跨 Context contract。                        | `domain`, `application`, `contract`                        | standalone `contracts/vN`、explicit mapping、contract architecture tests              |
| `AR-010` | Context 不得 import peer internals、跨 Context transaction、foreign-key navigation 或直接共用 mutable entity。      | `application`, `contract`, `adapter`, `data`               | Context Map edge、consumer ACL、dependency and architecture checks                    |
| `AR-011` | Domain 不得依賴 framework／I/O；Application 不得 new concrete adapter、執行 SQL／ORM 或 import Presentation。       | `domain`, `application`, `adapter`                         | dependency direction、Semgrep、typecheck                                              |
| `AR-012` | Route／UI／Server Action 不得擁有 invariant；Context composition 不得承擔 app-wide wiring；`server` 不構成產品層。  | `adapter`, `composition`, `presentation`                   | thin inbound mapping、only `apps/web/src/composition` app wiring、architecture tests  |
| `AR-013` | `packages/*` 不得收容產品 Domain/Application/Contract；可重用或 server-only 不會自動改變 semantic owner。           | `topology`, `domain`, `application`, `contract`, `adapter` | package policy、owner review、topology check                                          |
| `AR-014` | Search、Feed、Dashboard、Notification、Analytics、Audit projection 不得成為 upstream Aggregate 的 source of truth。 | `semantics`, `application`, `data`                         | provider facts/events、consumer read models、rebuildability tests                     |
| `AR-015` | Product Subscription、Entitlement、Seat、Usage、Invoice、Budget、Notification Subscription 不得互相代替。           | `semantics`, `domain`, `contract`, `data`                  | separate owner/lifecycle approval before commercial runtime                           |
| `AR-016` | 不得把未查得的 GitHub 限制、範例值或本產品安全限制冒充官方語意。                                                    | `semantics`, `status`, `docs-memory`                       | official source citation；local invariant 必須明確標記且由 tests 證明                 |
| `AR-017` | Persistence seed、ORM mapper、fixture 或 adapter 不得以 raw object 繞過 VO／Aggregate construction。                | `domain`, `adapter`, `data`, `verification`                | persistence mapper/factory、invalid-record tests                                      |
| `AR-018` | 不得以搬檔、建空目錄、增加 type 數量、`any`、空實作、刪測試或停用 guard 宣稱 semantic completeness。                | `topology`, `status`, `verification`, `docs-memory`        | first-use-case acceptance、focused tests、architecture/security gates、dated evidence |

例外只能透過 owning canonical policy／ADR 記錄 rule、owner、理由、到期或退出條件與驗證；memory、prompt、skill、
temporary migration 或「GitHub 有此功能」都不是例外授權。

## 5. Aggregate and transaction rules

- Aggregate 由 invariant 與 transaction boundary 定義，不由 JSON、table 或 screen 定義。
- 一個 command transaction 修改一個 primary Aggregate。
- 跨 Context 不使用 foreign-key navigation 或跨 Context transaction 維持 invariant。
- Query 回傳 purpose-specific read model，不回傳 ORM row 或可變 Domain entity。
- Domain event、integration event、audit record 與 command 必須分開命名與登錄。

## 6. Package policy

`packages/*` 只容納 context-neutral technical capability。禁止
`packages/application`、`contracts`、`domain`、`foundation`、`infrastructure`
與 umbrella `tooling`。產品語意一律回到 owning Context。
Technical package 不得反向 import `apps/**`；app-local composition、route 與 Bounded Context 都不是
可重用 package 的依賴來源。

## 7. Architecture document control

Business layers remain inside each app-local Bounded Context. The canonical placement is one machine-declared Domain
Group, then one declared Domain Area, then one Bounded Context and its fixed layer template. Strategic Subdomain remains
manifest metadata and does not create another directory level.

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

## 8. Definition of ready

新增 Context 或 internal subdomain 前必須確認 owner、actor/problem、success measure、
classification、language、Aggregate candidate、first use case、Ports、contract decision、
data owner、Context Map edge、acceptance criteria 與 ADR。

## 9. Definition of done

程式碼、manifest、30-concern registry、canonical docs、Fumadocs public statement、Serena
navigation、architecture fixtures 與 validation command 必須一致。Runtime/boundary 變更至少
通過 `pnpm check`、`pnpm docs:check`、`pnpm arch:check`、`pnpm build` 與
`pnpm semgrep`。
