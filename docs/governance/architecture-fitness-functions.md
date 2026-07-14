# Architecture fitness functions

狀態：Current / automated baseline

| Rule                         | Current verification        | Gap                                   |
| ---------------------------- | --------------------------- | ------------------------------------- |
| Repository topology          | `arch:topology`             | ADR review for new categories         |
| Layer direction              | dependency-cruiser, Semgrep | extend with new adapter categories    |
| Public entrypoints           | `arch:exports`              | compatibility tests if externalized   |
| Context map / manifest match | `arch:manifests`            | owner review for relationship changes |
| Internal subdomain structure | manifest and standard tree  | add contract versioning when shared   |
| Cross-context single entry   | import checker + fixtures   | no registered exceptions              |
| Published contract shape     | TypeScript + consumer tests | add explicit compatibility fixtures   |
| Serena memory freshness      | G7 policy + reviewed diff   | automate stale-path/status detection  |

## Prohibition-rule mechanization policy

狀態：Current。`ARCH-*` 編號對應 2026-07-13 prohibition-rule review；編號是 traceability label，不是第二份產品模型。

機械化只阻擋可由 repository 內可重現證據判定的違規。Regex、import graph 或目錄存在性不能證明 owner 已核准、
語意相同、授權正確或 migration 安全；這些規則保留 owner／ADR review，不以近似檢查宣稱完整覆蓋。

| 分類                                                                       | ARCH rules                                                                                                                                                                                                                                                                                                                          | 現行裁決或下一步                                                                                                                                                                                                               |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Deterministic hard fail                                                    | `001` (manifest/topology subset), `002`, `008` (forbidden-folder subset), `013`, `014` (ambient-input subset), `017`, `026-030` (import/export shape), `033`, `047-048` (dependency subset), `050` (top-level server shape), `052-055`, `061` (credential-literal subset), `067` (exception record), `068` (generated-shape subset) | `arch:manifests`, `arch:context-template`, `arch:topology`, `arch:exports`, `arch:cross-context`, `arch:source`, Dependency Cruiser and Semgrep fail closed. Subset means the gate proves only the named observable property.  |
| Mechanize after adding an authoritative registry or compatibility baseline | `005-006`, `009-012`, `015-016`, `018`, `021-025`, `031-032`, `034-046`, `049`, `051`, `056-060`, `062`, `064-066`, `069-070`                                                                                                                                                                                                       | Require respectively a data-owner registry, contract/event baselines, composition/environment manifests, or focused authorization/messaging tests. Do not add a regex-only hard fail first.                                    |
| Owner or ADR decision remains primary                                      | `003-004`, `007`, `019-020`, `063`                                                                                                                                                                                                                                                                                                  | Context motivation/naming, split justification, Domain Service quality and Context migration safety require semantic evidence and trade-off review. Machine checks may validate the resulting artifact, not make the decision. |

### Newly closed gaps

| Rule       | Machine evidence                                                                                                              | Boundary                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `ARCH-014` | `arch:source` rejects `process.env`, `Date.now()`, `Math.random()` and runtime crypto randomness under Context Domain source. | Date parsing and explicit clock/random values remain valid; the checker does not infer business determinism.                   |
| `ARCH-050` | `arch:topology` fixes `apps/web/src/app` private delivery folders and the file-only `apps/web/src/composition` root.          | It prevents a new generic bucket; review/tests still decide whether code inside an allowed directory contains business policy. |
| `ARCH-054` | Dependency Cruiser rejects every `packages/** -> apps/**` edge.                                                               | Package exports and app aliases remain resolved by the installed TypeScript configuration.                                     |
| `ARCH-067` | `arch:cross-context` validates required exception metadata, expiry, actual usage and stale records.                           | ADR quality and issue state remain owner-review evidence.                                                                      |
