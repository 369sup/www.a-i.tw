# 首批策略領域

狀態：Accepted in-memory baseline / production extensions proposed

本目錄定義產品語意、已核准 Bounded Context 與後續候選能力。Runtime existence 由
`context-map.json`、Context manifest 與驗證證據共同判定；Proposed extension 不得被
route 或程式碼視為已核准需求。

| 策略領域                                    | Context 候選      | 主要責任                                                                                           | 明確不擁有                                                               | 分類                 |
| ------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------- |
| [Identity & Access](identity-and-access.md) | `identity-access` | Principal、authentication identity、credential／session state                                      | Account、membership、Repository role 與 resource decision                | Generic / Supporting |
| [Account](account.md)                       | `account`         | personal／organization／enterprise Account、namespace、membership、Team 與 governance relationship | login credential、Repository lifecycle 與 resource decision              | Supporting           |
| [Repository](repository.md)                 | `repository`      | 受控工作空間、visibility、repository role／grant、lifecycle                                        | Principal authentication、Account roster、Git／code-related capabilities | Core candidate       |

共同的命名與禁止用語在 [`ubiquitous-language.md`](ubiquitous-language.md)。關係、契約方向與 ACL 在 [`context-map.md`](context-map.md)。enterprise 是 Account 內的 governance type；只有其 policy、compliance 或 lifecycle 取得獨立 owner 時，才評估拆出新 Context。三份策略文件是 target model，不是已存在的 runtime module、API 或 access control implementation。

## 核准與實作門檻

為任一策略領域建立模組前，必須先有：產品 owner、具名 actor 與問題、首個 use case、驗收條件、資料分類、context manifest、application port 與 ADR。跨 context 的資料只可透過 `@a-i/<context>/contracts` 發佈。

`master-template` 是登錄於
[`../architecture/reference-fixtures.json`](../architecture/reference-fixtures.json) 的 app-local architecture fixture，
不屬於產品 Context Map；`sub-template` 是其 fixture-internal capability。見
[`../architecture/template-system.md`](../architecture/template-system.md)。
