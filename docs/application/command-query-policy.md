# Command and query policy

狀態：Target baseline

- Command expresses a requested state change and passes through application authorization and transaction boundary.
- Query returns a purpose-built read model; it must not expose Domain entity or another Context persistence model.
- Commands and queries cross Context only through published contracts or application facades.
- Idempotency, consistency and error semantics become mandatory when a command is externally callable or asynchronous.
