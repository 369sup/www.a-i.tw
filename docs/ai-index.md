# AI 文件路由

這是 AI 與協作者的唯一入口。先判斷問題類型，再讀最小必要文件。

| 問題                    | 入口                                 | 產出                               |
| ----------------------- | ------------------------------------ | ---------------------------------- |
| 使用者問題與研究        | `01-discovery/`                      | problem brief、research note       |
| 策略領域與產品模型      | `domains/`、`maps/`                  | vocabulary、boundary、context map  |
| 需求與驗收              | `02-product/`                        | PRD、scope、acceptance criteria    |
| UX/UI 與可及性          | `03-design/`                         | flow、wireframe、design decision   |
| 模組、邊界、資料所有權  | `04-architecture/`、`maps/`          | context map、ADR、boundary note    |
| 腳手架與可執行架構範本  | `04-architecture/template-system.md` | master/sub template 與採用門檻     |
| API、port、event        | `contracts/`                         | contract、compatibility policy     |
| 開發與發布              | `05-delivery/`、`08-production/`     | plan、release、rollback            |
| 測試與證據              | `06-quality/`                        | test strategy、verification record |
| 事故與值班              | `07-operations/`、`runbooks/`        | runbook、incident review           |
| 目前進度與 closure gate | `status/`                            | dated status、decision log         |

架構判斷遵循 `UI / Infrastructure -> Application -> Domain`。不確定 ownership 時，先補文件中的 boundary note，再修改 runtime。
