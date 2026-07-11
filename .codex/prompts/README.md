# Codex 常用工作流程

這個目錄存放可直接貼入 Codex 的專案提示詞。它們以本專案的 DDD、Hexagonal Architecture 與既有 command policy 為準；不是 shell script，也不會繞過 `.codex/rules/` 的保護。

| 提示詞                                                                         | 適用情境                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| [`01-orient.md`](01-orient.md)                                                 | 新工作開始前，快速取得正確的專案、文件與 Git 狀態      |
| [`02-implement.md`](02-implement.md)                                           | 實作一個已清楚定義的功能或修正                         |
| [`03-verify.md`](03-verify.md)                                                 | 依改動範圍跑最小且足夠的品質驗證                       |
| [`04-github-triage.md`](04-github-triage.md)                                   | 查看目前分支、PR、issue、review 與 GitHub Actions      |
| [`05-ci-repair.md`](05-ci-repair.md)                                           | 定位並修正 GitHub Actions 或本機品質門檻失敗           |
| [`06-docs-and-architecture.md`](06-docs-and-architecture.md)                   | 新增 context、調整邊界、contract 或文件                |
| [`07-openai-research.md`](07-openai-research.md)                               | 規劃或修改 OpenAI API 整合，使用官方資料核實           |
| [`08-release-readiness.md`](08-release-readiness.md)                           | 產出可發布前的證據、風險與待確認事項                   |
| [`09-parallel-work.md`](09-parallel-work.md)                                   | 可獨立且可平行的調查、測試或審查工作                   |
| [`10-serena-semantic-workflow.md`](10-serena-semantic-workflow.md)             | 程式符號探索、跨檔案引用分析與安全重構                 |
| [`11-semantic-development-lifecycle.md`](11-semantic-development-lifecycle.md) | 語意、文件、路徑、scaffold、inside-out 開發與驗證 gate |

## 共通原則

- 先讀根目錄與目標路徑的 `AGENTS.md`，並依 `docs/ai-index.md` 讀取最小必要文件。
- Context7 只在套件、框架或 API 細節需要即時核實時使用；先查本專案已安裝版本與本機文件。
- GitHub 用於 PR、issue、review、Actions 與遠端狀態；本機 `git` 用於工作樹與分支狀態。未明確授權時不 commit、push、開 PR、merge 或改遠端資料。
- OpenAI Developers 僅用官方文件與 MCP 核實 OpenAI 產品/API；若實作會呼叫 OpenAI API，先走安全的 API key 決策流程，絕不輸出密鑰。
- Serena 用於語言伺服器可理解的程式符號、實作、引用、診斷與安全重構；文字、文件、設定與 Git 工作仍優先使用原生工具。開始 Serena 工作時先讀 `initial_instructions`。
- 每次修改後先檢視 `git diff` 與 `git status --short`，只驗證本次變更範圍；runtime 或架構邊界改動再跑完整必要門檻。

可從 `make help` 查看專案操作入口；`scripts/validation/` 的腳本供人與 agent 共用。
