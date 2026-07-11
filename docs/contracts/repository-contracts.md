# Repository contracts

狀態：Approved / `RepositoryRefV1`, `RepositoryAccessDecisionV1`

Candidate language: `RepositoryRefV1`, `RepositoryScopeV1`, `RepositoryAccessDecisionV1` and `RepositoryLifecycleEventV1`. Repository contracts cover only non-code container governance and must exclude grant graphs, credentials, source/Git data and persistence detail. Repository consumes Account eligibility／enterprise governance facts through an ACL; a `RepositoryAccessDecisionV1` never reveals whether a decision arose from organization or enterprise policy.
