# Architecture document catalog

狀態：Current

This is the index for the strategic-document baseline. It routes the 30 required concerns across the repository's canonical ownership folders; it does not create duplicate ADRs or runtime contracts.

| #   | Concern                            | Canonical document                                                                             | Status                        |
| --- | ---------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------- |
| 1   | Domain Vision                      | [`strategy/domain-vision.md`](strategy/domain-vision.md)                                       | Proposed                      |
| 2   | Business Capability Map            | [`strategy/business-capability-map.md`](strategy/business-capability-map.md)                   | Proposed                      |
| 3   | Subdomain Classification           | [`domains/subdomain-classification.md`](domains/subdomain-classification.md)                   | Proposed                      |
| 4   | Bounded Context Catalog            | [`domains/bounded-context-catalog.md`](domains/bounded-context-catalog.md)                     | Target                        |
| 5   | Ubiquitous Language Glossary       | [`domains/ubiquitous-language.md`](domains/ubiquitous-language.md)                             | Proposed                      |
| 6   | Context Map                        | [`domains/context-map.md`](domains/context-map.md)                                             | Target                        |
| 7   | Context Integration Contracts      | [`contracts/`](contracts/)                                                                     | Proposed / no public contract |
| 8   | Context Dependency Policy          | [`architecture/context-dependency-policy.md`](architecture/context-dependency-policy.md)       | Accepted baseline             |
| 9   | Upstream–Downstream Matrix         | [`domains/upstream-downstream-matrix.md`](domains/upstream-downstream-matrix.md)               | Target                        |
| 10  | Module Catalog                     | [`architecture/module-catalog.md`](architecture/module-catalog.md)                             | Empty until approval          |
| 11  | Module Boundary Policy             | [`architecture/module-boundary-policy.md`](architecture/module-boundary-policy.md)             | Accepted baseline             |
| 12  | Module Dependency Graph            | [`architecture/module-dependency-map.md`](architecture/module-dependency-map.md)               | Empty until approval          |
| 13  | Shared Kernel Policy               | [`architecture/shared-kernel-policy.md`](architecture/shared-kernel-policy.md)                 | None approved                 |
| 14  | Ports and Adapters Catalog         | [`architecture/ports-and-adapters-catalog.md`](architecture/ports-and-adapters-catalog.md)     | Empty until approval          |
| 15  | Adapter Ownership Policy           | [`architecture/adapter-ownership-policy.md`](architecture/adapter-ownership-policy.md)         | Target baseline               |
| 16  | Composition Root Strategy          | [`architecture/composition-root.md`](architecture/composition-root.md)                         | Target baseline               |
| 17  | Aggregate Catalog                  | [`domains/aggregate-catalog.md`](domains/aggregate-catalog.md)                                 | Empty until approval          |
| 18  | Business Rules / Invariant Catalog | [`domains/business-rule-catalog.md`](domains/business-rule-catalog.md)                         | Proposed                      |
| 19  | Domain Event Catalog               | [`domains/domain-event-catalog.md`](domains/domain-event-catalog.md)                           | Empty until approval          |
| 20  | Use Case Catalog                   | [`application/use-case-catalog.md`](application/use-case-catalog.md)                           | Proposed                      |
| 21  | Data Ownership Matrix              | [`data/data-ownership-matrix.md`](data/data-ownership-matrix.md)                               | Target                        |
| 22  | Transaction Boundary Policy        | [`data/transaction-boundary-policy.md`](data/transaction-boundary-policy.md)                   | Target baseline               |
| 23  | Read Model / Query Strategy        | [`data/read-model-strategy.md`](data/read-model-strategy.md)                                   | Target baseline               |
| 24  | ADR                                | [`decisions/`](decisions/)                                                                     | Current                       |
| 25  | Context Boundary Audit             | [`status/context-boundary-dependency-audit.md`](status/context-boundary-dependency-audit.md)   | Current                       |
| 26  | Context Boundary Alignment         | [`status/context-boundary-alignment.md`](status/context-boundary-alignment.md)                 | Current                       |
| 27  | Ownership Matrix                   | [`governance/ownership-matrix.md`](governance/ownership-matrix.md)                             | Target                        |
| 28  | Architecture Fitness Functions     | [`governance/architecture-fitness-functions.md`](governance/architecture-fitness-functions.md) | Target / partial automation   |
| 29  | Technical Debt Register            | [`status/architecture-debt-register.md`](status/architecture-debt-register.md)                 | Current                       |
| 30  | Context Migration Roadmap          | [`roadmap/context-migration-roadmap.md`](roadmap/context-migration-roadmap.md)                 | Proposed                      |

`docs/decisions/` remains the only ADR location; the legacy ADR directory is deliberately absent to avoid duplicate decision records.
