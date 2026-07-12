# Repository contracts

狀態：Approved / `RepositoryRefV1`, `RepositoryAccessDecisionV1`

Candidate language: `RepositoryRefV1`, `RepositoryScopeV1`, `RepositoryAccessDecisionV1` and `RepositoryLifecycleEventV1`. Repository contracts cover only non-code container governance and must exclude grant graphs, credentials, source/Git data and persistence detail. Repository consumes Account eligibility／enterprise governance facts through an ACL; a `RepositoryAccessDecisionV1` never reveals whether a decision arose from organization or enterprise policy.

Principal and Team grants remain Repository-private. `RepositoryAccessDecisionV1` may return `team-grant` as a
reason, but never exposes the grant graph or makes Account the owner of a Repository Role. The proposed Work
Management consumer requires a narrower action-specific participation contract before scaffold.

`RepositoryCollaborationScopeV1` publishes stable Repository id, owner Account id and lifecycle only.
`RepositoryParticipationDecisionV1` publishes `allowed`, the requested `read | triage | manage` collaboration action,
and a stable reason category. Missing upstream state, archived mutation or an unavailable decision fails closed.
Consumers must not infer grants, membership or roles from the reason.
