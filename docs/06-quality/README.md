# Quality

品質門檻包含 formatting、lint、TypeScript、architecture gate、production build、單元／
整合／端對端測試（依功能需要）與 Semgrep。驗證文件應記錄命令、日期、結果與未覆蓋風險。

工具責任：

- Vitest：Domain、Application 與 adapter integration tests。
- React Testing Library：有互動狀態的 Client Component。
- Playwright：已定義驗收條件的跨系統使用者流程。
- dependency-cruiser 與 architecture scripts：package、layer、Context boundary。
- Semgrep：安全與高訊號 AST policy。

尚未有產品流程時，Playwright workspace 可存在但不在一般 `pnpm check` 中執行；新增
第一個 E2E spec 後，再以 `pnpm test:e2e` 納入 release evidence。
