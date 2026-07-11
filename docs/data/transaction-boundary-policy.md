# Transaction boundary policy

狀態：Target baseline

A transaction protects the invariant owned by one Aggregate in one Context. Cross-Context workflows use published facts, explicit retry/idempotency and eventual reconciliation; no cross-context transaction or foreign-key invariant is approved. The concrete transaction mechanism remains undecided until a first use case exists.
