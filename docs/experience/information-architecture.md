# Information architecture

狀態：Baseline

公開資訊與內部治理文件使用獨立 source tree：

- `apps/web/content/docs/`：Fumadocs 發布的公開產品與工程文件。
- `docs/`：repository 的架構治理、ADR、runbook、狀態與驗證證據。

公開資訊架構以訪客任務分組：開始使用、產品概念與參考詞彙。內部文件則依長期 owner 分組；有開始與結束的探索工作置於 `docs/initiatives/`。

## Product workspace

第一階段產品入口為 `/workspace`。它使用三個平行、可獨立導航的工作區域：

- Account rail：切換目前 Account 並建立 personal 或 organization Account。
- Repository workspace：列出所選 Account 可見的 Repository，並建立或選取資源。
- Context inspector：顯示目前 Principal、Repository state、visibility、role 與明確 access decision。

建立 Account 與 Repository 使用 dialog；Repository detail 提供 rename、visibility、archive 與 collaborator grant。桌面保持三欄掃描效率；窄螢幕依 Account、Repository、Inspector 順序堆疊。所有 action 經 Application use case，畫面只呈現決策結果與錯誤語意。
