# Transaction boundary policy

狀態：Accepted / in-memory implementation

A transaction protects the invariant owned by one Aggregate in one Context. Membership, Team and Access Grant are separate transaction boundaries. Cross-Context workflows use published facts, explicit retry/idempotency and eventual reconciliation. Membership removal invalidates Team-based effective access through a fresh Account fact query; it does not mutate Repository grants in the same transaction. No cross-context transaction or foreign-key invariant is approved. The concrete durable transaction mechanism remains undecided.
