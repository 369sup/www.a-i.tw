# AI 文件路由

這是 AI 與協作者的唯一入口。先判斷問題類型，再讀最小必要文件。

所有架構問題先讀 [`architecture/ddd-hexagonal-standard.md`](architecture/ddd-hexagonal-standard.md)；
30 項必要 concern 與 owner 由
[`architecture/architecture-governance.json`](architecture/architecture-governance.json) 控制。

| 問題                       | 入口                                           | 產出                               |
| -------------------------- | ---------------------------------------------- | ---------------------------------- |
| 使用者問題與研究           | `initiatives/<name>/`                          | problem brief、research note       |
| 策略領域與產品模型         | `product/`、`domains/`                         | vocabulary、boundary、context map  |
| 領域願景與能力策略         | `strategy/`                                    | vision、capability、build/buy      |
| Use case 與授權責任        | `application/`                                 | use case、command/query、authz     |
| 需求與驗收                 | `product/` 或 `initiatives/`                   | PRD、scope、acceptance criteria    |
| UX/UI 與可及性             | `experience/`                                  | flow、wireframe、design decision   |
| 模組、邊界、資料所有權     | `architecture/`、`domains/`                    | context map、ADR、boundary note    |
| Repository 頂層與 packages | `architecture/repository-topology.md`          | keep/move/remove、topology gate    |
| 腳手架與可執行架構範本     | `architecture/template-system.md`              | master/sub template 與採用門檻     |
| API、port、event           | `contracts/`                                   | contract、compatibility policy     |
| 資料與一致性               | `data/`                                        | ownership、transaction、read model |
| 架構治理與審查             | `governance/`                                  | fitness function、review checklist |
| 開發與發布                 | `engineering/`、`operations/`                  | plan、release、rollback            |
| 語意到 runtime 的開發順序  | `engineering/semantic-development-workflow.md` | G0-G7 gate 與 evidence             |
| 測試與證據                 | `engineering/`、`evidence/`                    | test strategy、verification record |
| 事故與值班                 | `operations/`、`runbooks/`                     | runbook、incident review           |
| 目前進度與 closure gate    | `status/`                                      | dated status、decision log         |
| Context 演進與拆分         | `roadmap/`                                     | migration、modularization sequence |

架構判斷遵循 `UI / Infrastructure -> Application -> Domain`。不確定 ownership 時，先補文件中的 boundary note，再修改 runtime。

完整策略文件清冊與 canonical 路由見 [`architecture-document-catalog.md`](architecture-document-catalog.md)。
