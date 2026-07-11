# Information architecture

狀態：Baseline

公開資訊與內部治理文件使用獨立 source tree：

- `apps/web/content/docs/`：Fumadocs 發布的公開產品與工程文件。
- `docs/`：repository 的架構治理、ADR、runbook、狀態與驗證證據。

公開資訊架構以訪客任務分組：開始使用、產品概念與參考詞彙。內部文件則依長期 owner 分組；有開始與結束的探索工作置於 `docs/initiatives/`。
