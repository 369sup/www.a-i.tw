# OpenAI API 官方研究與整合規劃

請研究或規劃：`<OpenAI 功能或 API 需求>`。

1. 先查本專案的既有整合、依賴版本、環境變數命名與架構邊界；不得輸出或讀取密鑰明文。
2. 對 OpenAI 產品、模型、API 參數、SDK 或限制，只使用 OpenAI Developers 的官方文件/MCP 核實，並附上直接官方連結。
3. 若也涉及第三方框架（例如 Next.js、Vercel AI SDK），先查本機版本；需要即時 API 細節時才使用 Context7。
4. 產出：官方支援狀態、推薦 API/SDK、資料流與 server/client 邊界、錯誤與成本/速率風險、測試策略。
5. 若後續工作會建立、執行、測試、除錯或設定會呼叫 OpenAI API 的程式，先安全檢查 `OPENAI_API_KEY` 是否存在（不顯示值），並詢問我要重用既有 key 或安全建立新 key；在我回答前不得開始 API 實作或呼叫。

不因研究結果直接寫入 secret、部署、commit 或 push。
