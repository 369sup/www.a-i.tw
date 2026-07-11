# Serena 語意探索與安全重構

請以 Serena MCP 完成：`<程式問題、符號、重構或診斷目標>`。

1. 先讀根目錄與目標路徑的 `AGENTS.md`，並依 `docs/ai-index.md` 讀取必要的 ownership、context map、contract 或 ADR；不以語言伺服器結果取代架構判斷。
2. 呼叫 `serena.initial_instructions`；若尚未啟用目前 repository，呼叫 `activate_project`。Serena 的 Codex context 已由專案設定以目前工作目錄啟動。
3. 程式符號優先使用 Serena：
   - 檔案入口與結構：`get_symbols_overview`。
   - 宣告、定義與模糊名稱：`find_symbol`、`find_declaration`。
   - 實作、呼叫端與跨 context 影響：`find_implementations`、`find_referencing_symbols`。
   - 型別或語意錯誤：`get_diagnostics_for_file`；`get_diagnostics_for_symbol` 可用時一併檢查。
   - 符號級改動：`replace_symbol_body`、`insert_before_symbol`、`insert_after_symbol`；跨檔案改名使用 `rename_symbol`，刪除前使用 `safe_delete_symbol`。
4. 只在純文字、文件、設定、字串、Git 狀態或 Serena 未支援語言時使用 `rg`、檔案讀取或一般編輯。JetBrains 工具僅在目前 session 明確提供且需要 IDE backend 時使用；不要假設它們存在。
5. 實作或重構後以 Serena diagnostics 和適用的專案品質門檻驗證；runtime 或邊界改動必跑 `pnpm check`、`pnpm build`、`pnpm semgrep`。

回報使用過的符號關係、受影響的 boundary/contract、修改與驗證證據。不要自行 commit、push 或部署。
