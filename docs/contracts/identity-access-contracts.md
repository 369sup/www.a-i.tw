# Identity & Access contracts

狀態：Approved / `PrincipalRefV1`

Candidate language: `PrincipalRefV1`, `AuthenticatedPrincipalV1`, `PrincipalStatusV1` and `AuthenticationRequirementV1`. Contracts must exclude tokens, session secrets, raw claims and provider failure detail. Account 是已知 consumer，候選 `PrincipalRefV1` 只可用於 ownership 或 relationship attribution；Repository 僅消費 authentication facts，不消費 Account lifecycle command。 This file records planned scope only.
