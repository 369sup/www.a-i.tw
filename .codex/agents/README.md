# 專案 Subagent 分工

這些是給 Codex 對話內 subagent 的角色簡報，不是自動常駐 agent。主 agent 必須先定義範圍、避免檔案重疊，並統一負責最終修改與驗證。平行調查不得取代 Domain-Driven Modular Monolith、Hexagonal Architecture 或 Ports and Adapters 的責任判定。

| 角色                       | 工作                                                  | 預設權限          |
| -------------------------- | ----------------------------------------------------- | ----------------- |
| `architecture-researcher`  | 文件、ownership、contract、ADR 與 boundary 的唯讀分析 | 唯讀              |
| `implementation-reviewer`  | 現有程式、測試與回歸風險的唯讀檢查                    | 唯讀              |
| `github-triager`           | PR、issue、review、Actions 的唯讀整理                 | 唯讀；不寫遠端    |
| `verification-runner`      | 獨立品質命令與結果歸因                                | 不修改產品碼      |
| `serena_semantic_reviewer` | Serena LSP 符號、實作、引用與 diagnostics 的唯讀分析  | 唯讀；不寫 memory |

使用 [.codex/prompts/09-parallel-work.md](../prompts/09-parallel-work.md) 啟動分工。若子任務需要寫入，主 agent 必須預先分配互斥檔案範圍並在交接時重新檢查 `git diff`。當結果分歧時，以程式碼／測試與 Context Map manifest 為事實、canonical `docs/` 為政策；memory、copied skills 與個別 agent 摘要只可作為待驗證線索。

`serena_semantic_reviewer` 的 config layer 位於 `serena-semantic-reviewer.toml`；受信任的 project `.codex/config.toml` 會宣告此角色。它適合先界定跨檔案符號影響，主 agent 再決定與執行修改。
