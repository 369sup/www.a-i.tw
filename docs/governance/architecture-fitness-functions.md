# Architecture fitness functions

狀態：Current / automated baseline

| Rule                         | Current verification         | Gap                                   |
| ---------------------------- | ---------------------------- | ------------------------------------- |
| Repository topology          | `arch:topology`              | ADR review for new categories         |
| Layer direction              | dependency-cruiser, Semgrep  | extend with new adapter categories    |
| Public entrypoints           | `arch:exports`               | compatibility tests if externalized   |
| Context map / manifest match | `arch:manifests`             | owner review for relationship changes |
| Internal subdomain structure | manifest and standard tree   | add contract versioning when shared   |
| No cross-context internals   | import graph + fixture tests | none for current runtime graph        |
