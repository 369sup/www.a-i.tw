# Authorization policy

狀態：Target baseline

Authentication establishes a Principal and credential context. Account publishes relationship facts. Repository owns
`repository:*` action decisions from its visibility, role, grant, lifecycle and policy. UI, route handlers and adapters
must not recreate this decision logic. This is a responsibility policy, not an implementation of access control.
