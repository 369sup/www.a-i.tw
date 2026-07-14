# Repository contracts

狀態：Approved Repository reference / Authorization migration completed

Repository contracts cover only non-code container governance and exclude grant graphs, roles, credentials, source/Git
data and persistence detail. `RepositoryRefV1` remains the Repository-owned reference.

`AuthorizationPolicyApiV1` is the authoritative Published Language for Repository access grant and decision behavior.
Repository consumes it through `RepositoryAuthorization` and `RepositoryAuthorizationAdapter`; it does not publish
roles or grant-derived decision details.

`RepositoryCollaborationScopeV1` publishes stable Repository id, owner Account id and lifecycle only.
`RepositoryParticipationDecisionV1` remains a Repository-scoped compatibility facade for Issues and Discussions. It maps the
Authorization decision to `allowed` plus a stable reason category without transferring grant ownership. Missing
upstream state, archived mutation or an unavailable decision fails closed.
Consumers must not infer grants, membership or roles from the reason.

The current action vocabulary preserves Context-specific operations: `issue:*` for Issues and `discussion:*` for
Discussions. Read/create/comment require Repository `read`; Discussion triage requires Repository `triage`.
