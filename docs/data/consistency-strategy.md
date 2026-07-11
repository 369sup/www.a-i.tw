# Consistency strategy

狀態：Target baseline

Strong consistency is reserved for an approved Aggregate's own invariants. Cross-context reads may be synchronous only through a contract and must define unavailable/stale behavior. Future projections or events require freshness, ordering, idempotency and repair policy. No projection is implemented yet. A future Repository authorization projection may consume Account membership and enterprise governance facts only when it records the source contract version, freshness bound, revocation behavior and reconciliation path.
