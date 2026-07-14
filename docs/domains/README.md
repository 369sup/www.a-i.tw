# 首批策略領域

狀態：Accepted in-memory baseline / production extensions proposed

本目錄定義產品語意、已核准 Bounded Context 與後續候選能力。Runtime existence 由
`context-map.json`、Context manifest 與驗證證據共同判定；Proposed extension 不得被
route 或程式碼視為已核准需求。

| 策略領域                                    | Context 候選                     | 主要責任                                                                              | 明確不擁有                                             | 分類                 |
| ------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------- |
| [Identity & Access](identity-and-access.md) | `authentication-security`        | Principal、Credential、authentication factor、Session、recovery                       | Account、Membership、Repository access decision        | Generic / Supporting |
| Account & Profile                           | existing `account` first slice   | Personal／Managed User Account、Profile、Account lifecycle                            | Membership、Team、Enterprise policy、authentication    | Supporting           |
| Organization Directory                      | target; not scaffolded           | Organization、Membership、Invitation、Outside Collaborator、Team                      | Repository Role、Enterprise policy                     | Supporting           |
| Enterprise Governance                       | target; partial runtime evidence | Enterprise、Organization affiliation、enterprise policy/role assignment               | direct Repository ownership、Organization content      | Supporting           |
| Authorization & Policy                      | target; not scaffolded           | Permission、Role／Grant assignment、policy evaluation、authorization decision         | authentication、Repository lifecycle                   | Generic / Supporting |
| [Repository](repository.md)                 | `repository`                     | identity、Account owner、profile、visibility、state、feature configuration、lifecycle | Principal、Team、access grant、Issue、Project、Webhook | Core candidate       |

共同命名與禁止用語在 [`ubiquitous-language.md`](ubiquitous-language.md)，關係、契約方向與 ACL 在
[`context-map.md`](context-map.md)。完整 logical owner inventory 由
[`../product/github-non-code-semantic-model.md`](../product/github-non-code-semantic-model.md) 管理。上表同時標出
target owner 與既有 runtime slice；target 不等於已存在的 module、API 或 access-control implementation。

## 核准與實作門檻

為任一策略領域建立模組前，必須先有：產品 owner、具名 actor 與問題、首個 use case、驗收條件、資料分類、context manifest、application port 與 ADR。跨 context 的資料只可透過 `@a-i/<context>/contracts` 發佈。
