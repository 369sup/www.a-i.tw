# Account contracts

狀態：Approved / `AccountDirectoryApiV1`

`TeamMembershipFactV1` 只發布 Account id、Principal id 與 Team ids；`TeamRefV1` 提供 Team ownership eligibility。
兩者都不攜帶 Repository Role。Authorization & Policy 透過自己的 ACL 使用這些 facts；Repository 不再消費
Team membership。

Current language includes `AccountRefV1`, `MembershipFactV1`, `TeamMembershipFactV1`, `TeamRefV1` and
`AccountEligibilityV1`. Account consumes `PrincipalRefV1` and supplies minimal ownership／relationship facts to
Repository, Projects, Enterprise Governance and Authorization & Policy. It never publishes Repository Role or final
authorization decisions.
