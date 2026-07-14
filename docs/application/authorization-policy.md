# Authorization policy

狀態：Target baseline

Authentication establishes a Principal and credential context. Account publishes relationship facts. Repository owns
`repository:*` action decisions from its visibility, role, grant, lifecycle and policy. UI, route handlers and adapters
must not recreate this decision logic. This is a responsibility policy, not an implementation of access control.

Team membership establishes only a candidate relationship. Account never returns a Repository Role; Repository maps
direct or Team grants to an effective role and fails closed when Membership/Team facts are absent. The proposed Work
Management Context must ask Repository for an action-specific participation decision through its own ACL.
