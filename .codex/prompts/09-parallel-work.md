# 平行 Subagent 工作

請只在工作可切成相互獨立、唯讀或不重疊檔案範圍的子任務時使用 subagents。

1. 先列出子任務、每個 agent 的檔案所有權與預期證據；涉及同一檔案的修改由主 agent 統一執行。
2. 合理分工範例：
   - Agent A：讀取文件、context map、ADR/contract，判定架構影響。
   - Agent B：唯讀檢查現有實作與測試缺口。
   - Agent C：唯讀檢查 GitHub PR、review、Actions 或官方文件。
3. 每個 agent 必須遵守根與目標路徑 `AGENTS.md`；不得 commit、push、deploy、刪除檔案、修改 secrets 或覆寫其他 agent 的變更。
4. 主 agent 統整結論、處理矛盾、執行唯一的修改與驗證，並在最後回報每個子任務使用的證據。發生分歧時，以程式碼／測試與 Context Map manifest 為事實、canonical `docs/` 為政策；memory、copied skills 與 agent 摘要僅是待驗證線索。

不要為單一、小型或高度耦合的修改建立 subagent；也不要把「決策責任」委派出去。
