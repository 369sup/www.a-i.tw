# Architecture document catalog

狀態：Current / governed by `architecture-governance.json`

本清冊是 30 個必要架構 concern 的唯一路由表。Lifecycle 與 owner 由 machine-readable registry 驗證；每個 concern 只能有一個 canonical path。

|   # | Concern                            | Canonical document                                                                             | Owner                   | Lifecycle     |
| --: | ---------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------- | ------------- |
|   1 | Domain Vision                      | [`strategy/domain-vision.md`](strategy/domain-vision.md)                                       | Product                 | baseline      |
|   2 | Business Capability Map            | [`strategy/business-capability-map.md`](strategy/business-capability-map.md)                   | Product                 | baseline      |
|   3 | Subdomain Classification           | [`domains/subdomain-classification.md`](domains/subdomain-classification.md)                   | Product + Architecture  | baseline      |
|   4 | Bounded Context Catalog            | [`domains/bounded-context-catalog.md`](domains/bounded-context-catalog.md)                     | Architecture            | current       |
|   5 | Ubiquitous Language Glossary       | [`domains/ubiquitous-language.md`](domains/ubiquitous-language.md)                             | Context owners          | baseline      |
|   6 | Context Map                        | [`domains/context-map.md`](domains/context-map.md)                                             | Architecture            | current       |
|   7 | Context Integration Contracts      | [`contracts/`](contracts/)                                                                     | Provider Context owners | current       |
|   8 | Context Dependency Policy          | [`architecture/context-dependency-policy.md`](architecture/context-dependency-policy.md)       | Architecture            | accepted      |
|   9 | Upstream-Downstream Matrix         | [`domains/upstream-downstream-matrix.md`](domains/upstream-downstream-matrix.md)               | Architecture            | current       |
|  10 | Module Catalog                     | [`architecture/module-catalog.md`](architecture/module-catalog.md)                             | Architecture            | current       |
|  11 | Module Boundary Policy             | [`architecture/module-boundary-policy.md`](architecture/module-boundary-policy.md)             | Architecture            | accepted      |
|  12 | Module Dependency Graph            | [`architecture/module-dependency-map.md`](architecture/module-dependency-map.md)               | Architecture            | current       |
|  13 | Shared Kernel Policy               | [`architecture/shared-kernel-policy.md`](architecture/shared-kernel-policy.md)                 | Architecture            | none-approved |
|  14 | Ports and Adapters Catalog         | [`architecture/ports-and-adapters-catalog.md`](architecture/ports-and-adapters-catalog.md)     | Context owners          | current       |
|  15 | Adapter Ownership Policy           | [`architecture/adapter-ownership-policy.md`](architecture/adapter-ownership-policy.md)         | Architecture            | accepted      |
|  16 | Composition Root Strategy          | [`architecture/composition-root.md`](architecture/composition-root.md)                         | Platform + Architecture | accepted      |
|  17 | Aggregate Catalog                  | [`domains/aggregate-catalog.md`](domains/aggregate-catalog.md)                                 | Context owners          | current       |
|  18 | Business Rules / Invariant Catalog | [`domains/business-rule-catalog.md`](domains/business-rule-catalog.md)                         | Context owners          | current       |
|  19 | Domain Event Catalog               | [`domains/domain-event-catalog.md`](domains/domain-event-catalog.md)                           | Context owners          | none-approved |
|  20 | Use Case Catalog                   | [`application/use-case-catalog.md`](application/use-case-catalog.md)                           | Context owners          | current       |
|  21 | Data Ownership Matrix              | [`data/data-ownership-matrix.md`](data/data-ownership-matrix.md)                               | Context owners          | current       |
|  22 | Transaction Boundary Policy        | [`data/transaction-boundary-policy.md`](data/transaction-boundary-policy.md)                   | Architecture            | accepted      |
|  23 | Read Model / Query Strategy        | [`data/read-model-strategy.md`](data/read-model-strategy.md)                                   | Architecture            | accepted      |
|  24 | Architecture Decision Records      | [`decisions/`](decisions/)                                                                     | Architecture            | current       |
|  25 | Context Boundary Audit             | [`status/context-boundary-dependency-audit.md`](status/context-boundary-dependency-audit.md)   | Architecture            | current       |
|  26 | Context Boundary Alignment         | [`status/context-boundary-alignment.md`](status/context-boundary-alignment.md)                 | Architecture            | current       |
|  27 | Ownership Matrix                   | [`governance/ownership-matrix.md`](governance/ownership-matrix.md)                             | Product + Architecture  | current       |
|  28 | Architecture Fitness Functions     | [`governance/architecture-fitness-functions.md`](governance/architecture-fitness-functions.md) | Architecture            | current       |
|  29 | Technical Debt Register            | [`status/architecture-debt-register.md`](status/architecture-debt-register.md)                 | Architecture            | current       |
|  30 | Context Migration Roadmap          | [`roadmap/context-migration-roadmap.md`](roadmap/context-migration-roadmap.md)                 | Product + Architecture  | current       |

Lifecycle 定義、required sections、Definition of Ready/Done 與 runtime 標準見 [`architecture/ddd-hexagonal-standard.md`](architecture/ddd-hexagonal-standard.md)。`docs/decisions/` 是唯一 ADR 位置；公開 Fumadocs 位於 `apps/web/content/docs/`，不取代本清冊。

本清冊只在新增、移動、稽核或重新指派 30 項 canonical architecture concerns 時讀取；一般產品
語意與窄幅文件任務由 [`ai-index.md`](ai-index.md) 直接路由，不需先載入本清冊。
