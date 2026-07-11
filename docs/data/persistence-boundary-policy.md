# Persistence boundary policy

狀態：Target baseline

Contexts may share a database deployment but not table ownership. Only the owning Context migrates and writes its data. Other Contexts use contracts, ports or read models; they do not join, query or mutate internal tables. Storage adapters remain Infrastructure and cannot define domain terminology.
