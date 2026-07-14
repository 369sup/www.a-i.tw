# Enterprise governance

狀態：Approved first vertical slice / broader runtime deferred

Enterprise Account 是跨 Organization 的治理根，而不是更大的 Organization、直接登入 Actor 或
Repository owner。它集中管理 Organizations、enterprise users／administrators、Enterprise teams、
roles、identity configuration、policies、licensing／billing、cost centers、support entitlements、apps
與 audit；日常協作資源仍由 User 或 Organization 擁有。

| Concept           | Boundary         | Members                                | Main delegation                                        |
| ----------------- | ---------------- | -------------------------------------- | ------------------------------------------------------ |
| Enterprise team   | Enterprise       | Users across enterprise／organizations | Organization access、enterprise roles、licensing       |
| Organization team | One Organization | Organization members                   | Repository／Project access、mentions、nested hierarchy |

Enterprise team 不支援的部分 Organization team 能力包括 nested teams、secret teams、team
maintainers 與 Project board assignment；不得用同一 Aggregate 或 contract 假設兩者相容。

核准的第一個 vertical slice 只包含 `Enterprise`、`EnterpriseOrganizationAffiliation` 與
`RepositoryVisibilityPolicy`：Enterprise owner 將 Organization 納入治理，並可禁止 Public
Repository 建立或可見性變更。Enterprise 不直接擁有 Repository，Repository 仍擁有最終操作決策。

Enterprise Membership、Enterprise Role、Enterprise Team、Managed User、Billing、License 與 Audit
仍為 Deferred，且分屬後續獨立模型或 Context。

官方來源：

- <https://docs.github.com/en/admin/concepts/enterprise-fundamentals/enterprise-accounts>
- <https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/enterprise-fundamentals/teams-in-an-enterprise>
- <https://docs.github.com/en/enterprise-cloud@latest/organizations/organizing-members-into-teams/about-teams>
