# Transaction boundary policy

狀態：Accepted / in-memory implementation

A transaction protects the invariant owned by one Aggregate in one Context. Membership, Team and Access Grant are separate transaction boundaries. Cross-Context workflows use published facts, explicit retry/idempotency and eventual reconciliation. Membership removal invalidates Team-based effective access through a fresh Account fact query; it does not mutate Repository grants in the same transaction. No cross-context transaction or foreign-key invariant is approved. The concrete durable transaction mechanism remains undecided.

Login credential verification creates one Session transaction. Profile update modifies one Account Profile.
Actor switching selects an authenticated Session; scope switching changes navigation/read context only. Neither
operation atomically rewrites Membership, Role, Policy or resource grants across Contexts.

Request Context resolution is a query orchestration and opens no cross-Context transaction. A decision returned in
the read model does not authorize a later mutation; the mutation use case must evaluate its owning policy again.
