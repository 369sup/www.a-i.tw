# Read model strategy

狀態：Accepted / current in-memory summaries

Queries return purpose-specific read models, not persistence rows or Domain
entities. Current Account and Repository list/detail results are application
summaries rebuilt from in-memory owner stores and have no cross-process freshness
guarantee. A future duplicated read model requires source owner, contract version,
freshness, refresh strategy and retention rule.
