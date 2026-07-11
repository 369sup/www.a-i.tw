# Transaction boundary policy

狀態：Accepted / in-memory implementation

A transaction protects the invariant owned by one Aggregate in one Context. Cross-Context workflows use published facts, explicit retry/idempotency and eventual reconciliation. Account 的 enterprise-to-organization policy 變更與 Repository visibility／grant 重算必須視為跨 Context workflow，不得透過跨表 transaction 維持一致; no cross-context transaction or foreign-key invariant is approved. The concrete transaction mechanism remains undecided until a first use case exists.
