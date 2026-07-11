# 首批策略領域

狀態：Proposed / 尚待產品 owner 核准

本目錄定義產品語意與 bounded-context 候選邊界，並非 runtime module 宣告。在核准 owner、產品問題與首個 use case 前，`docs/maps/context-map.json` 必須保持空白，也不得建立 `modules/<context>`。

| 策略領域                                    | Context 候選      | 主要責任                                  | 分類                 |
| ------------------------------------------- | ----------------- | ----------------------------------------- | -------------------- |
| [Identity & Access](identity-and-access.md) | `identity-access` | Principal、驗證、session、access decision | Generic / Supporting |
| [Account](account.md)                       | `account`         | 個人／組織帳戶、命名空間、成員關係        | Supporting           |
| [Repository](repository.md)                 | `repository`      | 受控工作空間、可見性、生命週期與協作政策  | Core candidate       |

共同的命名與禁止用語在 [`ubiquitous-language.md`](ubiquitous-language.md)。關係與依賴方向在 [`../maps/domain-context-map.md`](../maps/domain-context-map.md)。

## 核准與實作門檻

為任一策略領域建立模組前，必須先有：產品 owner、具名 actor 與問題、首個 use case、驗收條件、資料分類、context manifest、application port 與 ADR。跨 context 的資料只可透過 `@a-i/<context>/contracts` 發佈。
