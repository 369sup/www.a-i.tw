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

## Approved Wave 1 prototype boundaries

2026-07-16 核准三個獨立 prototype slices；核准不合併它們的 source of truth，也不把尚未通過 G4-G7 的
Context 描述成 runtime：

- Enterprise Identity Management：Enterprise owner 設定並先測試一個 personal-account Enterprise SAML
  connection；`IdentityProviderConnection` 是 source of truth。
- Enterprise Participation：Enterprise owner 建立一個 Enterprise Team、指派一個已 affiliated Organization，
  並加入一個符合資格的 active Personal Account；不寫入 Organization Membership。
- Network & Domain Governance：Enterprise owner 建立 DNS ownership challenge，只有 authoritative TXT
  verifier 符合 expected value 時，`DomainVerification` 才由 `pending` 轉為 `verified` 並產生
  `VerifiedDomain`。

三者都透過 `EnterpriseAccountDirectoryApiV1` 驗證 Enterprise，並透過
`AdministrativeAccessApiV1` 驗證 Enterprise owner。consumer Application 擁有 Ports，ACL 只能位於
consumer `adapters/outbound/integrations`，concrete wiring 只能位於 app composition。

詳細 use cases、failures、routes、exclusions 與 tests 由
[`../initiatives/github-non-code-37-context-prototypes/wave-1-enterprise-governance.md`](../initiatives/github-non-code-37-context-prototypes/wave-1-enterprise-governance.md)
擁有。

官方來源：

- <https://docs.github.com/en/admin/concepts/enterprise-fundamentals/enterprise-accounts>
- <https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/enterprise-fundamentals/teams-in-an-enterprise>
- <https://docs.github.com/en/enterprise-cloud@latest/organizations/organizing-members-into-teams/about-teams>
