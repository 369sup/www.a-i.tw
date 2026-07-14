# Identity & Access contracts

狀態：Approved / `PrincipalRefV1`, `IdentityDirectoryApiV1`

Published Language is limited to `PrincipalRefV1`, `AuthenticatedPrincipalV1` and active-principal lookup through
`IdentityDirectoryApiV1`. Contracts exclude tokens, session secrets, raw claims and provider failure detail. A browser
session result is an Identity application result consumed only by its inbound cookie adapter. Account uses principal
attribution; Authorization & Policy uses active-principal eligibility; neither receives credential or Session internals.
