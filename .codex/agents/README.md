# 專案 Subagent 設定

本目錄只保存實際可載入的 repository subagent config，不保存概念性角色清單。平行工作的範圍與分工由
[`../prompts/09-parallel-work.md`](../prompts/09-parallel-work.md) 定義；主 agent 必須避免檔案重疊，並統一負責
最終修改與驗證。

| Config                              | 工作                                                 | 權限                 |
| ----------------------------------- | ---------------------------------------------------- | -------------------- |
| `serena-semantic-reviewer.toml`     | Serena LSP 符號、實作、引用與 diagnostics 的語意分析 | 唯讀；不寫入 memory  |

若子任務需要寫入，主 agent 必須預先分配互斥檔案範圍並在交接時重新檢查 `git diff`。當結果分歧時，
以程式碼／測試與 Context Map manifest 為事實、canonical `docs/` 為政策；memory、copied skills 與個別
agent 摘要只可作為待驗證線索。

`serena-semantic-reviewer.toml` 的 config layer 僅定義唯讀語意審查。Serena server
與 task wiring 可由本 repository 的 `.codex/config.toml` 提供可重現的 local command，或由
Codex Desktop/user profile 管理；connector ID 與 credentials 永遠不提交。它適合先界定跨檔案
符號影響，主 agent 再決定與執行修改。
