# 專案 Subagent 分工

這些是給 Codex 對話內 subagent 的角色簡報，不是自動常駐 agent。主 agent 必須先定義範圍、避免檔案重疊，並統一負責最終修改與驗證。

| 角色                      | 工作                                                  | 預設權限       |
| ------------------------- | ----------------------------------------------------- | -------------- |
| `architecture-researcher` | 文件、ownership、contract、ADR 與 boundary 的唯讀分析 | 唯讀           |
| `implementation-reviewer` | 現有程式、測試與回歸風險的唯讀檢查                    | 唯讀           |
| `github-triager`          | PR、issue、review、Actions 的唯讀整理                 | 唯讀；不寫遠端 |
| `verification-runner`     | 獨立品質命令與結果歸因                                | 不修改產品碼   |

使用 [.codex/prompts/09-parallel-work.md](../prompts/09-parallel-work.md) 啟動分工。若子任務需要寫入，主 agent 必須預先分配互斥檔案範圍並在交接時重新檢查 `git diff`。
