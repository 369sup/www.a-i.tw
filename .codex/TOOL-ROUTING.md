# Codex 工具路由

本文件是 repository 內 Codex 工具使用的單一入口。它不承載 connector ID、OAuth state、API key 或使用者 plugin cache。

## 每個 task 的啟動順序

1. 讀取根 `AGENTS.md` 與 `.codex/AGENTS.md`，依 routing table 只讀最小必要文件。
2. Serena 僅用於語意程式任務；先 `get_current_config`，必要時才初始化，且同一 task 不重複初始化重試。
3. TypeScript/JavaScript 優先使用 Serena 目前 session 已暴露且與任務相關的全部工具：symbols overview、definition/declaration、implementations、references、diagnostics 與 symbol-level edit/refactor。不要假設固定工具清單，也不要為 Markdown、JSON、TOML、Git 或其他純文字工作硬套 Serena。
4. 遇到框架、套件、SDK 或 API 的版本敏感問題，先檢查 `package.json`、lockfile 與本機 `node_modules/<package>/dist/docs/`。仍不足時先 resolve Context7 library ID，再 query 對應版本文件。一般 repo policy、Markdown、JSON、TOML 與 Git 工作不呼叫 Context7。
5. 修改後重新取得變更檔的 Serena diagnostics（若有程式碼），再依根 `AGENTS.md` 執行最小足夠驗證；回報工具未暴露或 server 不可用的部分，不因能力缺失而停止安全的文件/設定工作。

## 能力邊界

- Serena 由 `.codex/config.toml` 的 host command 或 Codex Desktop/user profile 管理；不在 repo 內複製 server、credential 或 cache。
- Context7 是即時文件查詢能力，不是 repo 依賴；只有版本或文件不確定時才使用。
- 「所有工具」是指當前 session 實際暴露、且與任務相關的 Serena 工具；不可假設未載入的 MCP server 或工具存在。
- 純文字與設定檔使用原生檔案工具；程式符號、引用分析與語意診斷使用 Serena 優先。
