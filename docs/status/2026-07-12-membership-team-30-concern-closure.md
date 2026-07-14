# Membership, Team and Team Grant — 30-concern closure

狀態：Current / verified 2026-07-12

本表以 `docs/architecture/architecture-governance.json` 為唯一 concern registry。`Updated` 表示
canonical owner 文件已同步；`Reviewed — no impact` 表示已檢查且政策仍成立。

|   # | Concern                    | Disposition          | Evidence                                         |
| --: | -------------------------- | -------------------- | ------------------------------------------------ |
|   1 | Domain Vision              | Updated              | current slice and next Issues problem            |
|   2 | Business Capability Map    | Updated              | Team access Current; Issues Proposed             |
|   3 | Subdomain Classification   | Updated              | Account relationship extension classified        |
|   4 | Bounded Context Catalog    | Updated              | Account owns Membership/Team                     |
|   5 | Ubiquitous Language        | Updated              | Team fact and grant language                     |
|   6 | Context Map                | Updated              | Account facts to Repository ACL                  |
|   7 | Integration Contracts      | Updated              | `TeamMembershipFactV1`, failure semantics        |
|   8 | Context Dependency Policy  | Reviewed — no impact | contracts/ACL only; no internal import           |
|   9 | Upstream/Downstream Matrix | Updated              | Account supplies Team facts                      |
|  10 | Module Catalog             | Updated              | Account/Repository public responsibility         |
|  11 | Module Boundary Policy     | Reviewed — no impact | one module per Context remains enforced          |
|  12 | Module Dependency Graph    | Updated              | Account contract to Repository Application       |
|  13 | Shared Kernel Policy       | Reviewed — no impact | none approved; no shared Domain types            |
|  14 | Ports/Adapters Catalog     | Updated              | `TeamStore`, `AccountDirectoryGateway`           |
|  15 | Adapter Ownership          | Reviewed — no impact | Team adapter implements Account Port             |
|  16 | Composition Root           | Reviewed — no impact | product composition is only concrete wiring root |
|  17 | Aggregate Catalog          | Updated              | Team and subject-based Access Grant              |
|  18 | Business Rules             | Updated              | active member and Team grant rules               |
|  19 | Domain Event Catalog       | Reviewed — no impact | synchronous facts; none approved                 |
|  20 | Use Case Catalog           | Updated              | Team management and Team grants                  |
|  21 | Data Ownership Matrix      | Updated              | Account roster vs Repository grant ownership     |
|  22 | Transaction Boundary       | Updated              | Membership, Team and Grant separate transactions |
|  23 | Read Model Strategy        | Updated              | Team summaries and process-local freshness       |
|  24 | ADR                        | Updated              | ADR 0003 Team extension                          |
|  25 | Context Boundary Audit     | Updated              | Serena references, import/architecture checks    |
|  26 | Context Boundary Alignment | Updated              | Account Team public language                     |
|  27 | Ownership Matrix           | Reviewed — no impact | Account/Repository owners unchanged              |
|  28 | Fitness Functions          | Updated              | contract shape and memory freshness gaps         |
|  29 | Technical Debt             | Updated              | roster cleanup and browser E2E                   |
|  30 | Migration Roadmap          | Updated              | Issues selected next                             |

## Serena evidence

- `TeamStore` is declared by Account Application and implemented by `InMemoryTeamStore`.
- `TeamMembershipFactV1` is referenced by Account Application and Repository Application only through Account contracts.
- `AccountDirectoryGateway` is Repository-owned and wired in server composition.
- `RepositoryService.grantTeam` is invoked by the repository-console Server Action inbound adapter.

## Verification

`pnpm check`, `pnpm docs:check`, `pnpm arch:check`, `pnpm build` and `pnpm semgrep` passed for
the slice. Browser E2E remains AD-006 and is not claimed complete.
