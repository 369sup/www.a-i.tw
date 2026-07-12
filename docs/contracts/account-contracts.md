# Account contracts

狀態：Approved / `AccountRefV1`, `AccountEligibilityV1`, `MembershipFactV1`, `TeamMembershipFactV1`

`TeamMembershipFactV1` 只發布 Account id、Principal id 與 Team ids，不攜帶 Repository Role。

Candidate language: `AccountRefV1`, `NamespaceResolutionV1`, `MembershipFactV1`, `TeamMembershipFactV1`, `AccountEligibilityV1` and `EnterpriseGovernanceFactV1`. `EnterpriseGovernanceFactV1` 可以表示 organization 是否受 enterprise policy 約束與 internal visibility eligibility；不得暴露 billing、IdP roster、完整 policy 或 Repository Role。 Account consumes `PrincipalRefV1` from Identity & Access and supplies minimal ownership／relationship facts to Repository. This is an index of planned semantics, not a published API. Establish owner, consumer, compatibility, data classification and tests before creating a contract artifact.
