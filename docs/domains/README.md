# 首批策略領域

狀態：Proposed / 尚待產品 owner 核准

本目錄定義產品語意與 bounded-context 候選邊界，並非 runtime module 宣告。在核准 owner、產品問題與首個 use case 前，`docs/domains/context-map.json` 必須保持空白，也不得建立 `modules/<context>`。

| 策略領域                                    | Context 候選      | 主要責任                                                      | 明確不擁有                                                               | 分類                 |
| ------------------------------------------- | ----------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------- |
| [Identity & Access](identity-and-access.md) | `identity-access` | Principal、authentication identity、credential／session state | Account、membership、Repository role 與 resource decision                | Generic / Supporting |
| [Account](account.md)                       | `account`         | Account、namespace、membership、Team relationship             | login credential、Repository lifecycle 與 resource decision              | Supporting           |
| [Repository](repository.md)                 | `repository`      | 受控工作空間、visibility、repository role／grant、lifecycle   | Principal authentication、Account roster、Git／code-related capabilities | Core candidate       |

共同的命名與禁止用語在 [`ubiquitous-language.md`](ubiquitous-language.md)。關係、契約方向與 ACL 在 [`context-map.md`](context-map.md)。三份策略文件是 target model，不是已存在的 runtime module、API 或 access control implementation。

## 核准與實作門檻

為任一策略領域建立模組前，必須先有：產品 owner、具名 actor 與問題、首個 use case、驗收條件、資料分類、context manifest、application port 與 ADR。跨 context 的資料只可透過 `@a-i/<context>/contracts` 發佈。
