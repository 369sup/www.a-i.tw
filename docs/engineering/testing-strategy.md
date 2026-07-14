# Quality

品質門檻包含 formatting、lint、TypeScript、architecture gate、production build、單元／
整合／端對端測試（依功能需要）與 Semgrep。驗證文件應記錄命令、日期、結果與未覆蓋風險。

工具責任：

- Vitest：Domain、Application 與 adapter integration tests。
- React Testing Library：有互動狀態的 Client Component。
- Playwright：已定義驗收條件的跨系統使用者流程。
- dependency-cruiser 與 architecture scripts：package、layer、Context boundary。
- Semgrep：安全與高訊號 AST policy。

`tests/architecture` 的負向 fixtures 必須持續證明 dependency-cruiser 真的會拒絕
違反 layer、contracts 與 cross-context boundary 的程式碼；這避免 regex 或工具升級後
讓架構 gate 在無人察覺下失效。

尚未有產品流程時，Playwright E2E suite 可存在但不在一般 `pnpm check` 中執行；新增
第一個 E2E spec 後，再以 `pnpm test:e2e` 納入 release evidence。

日常使用 `pnpm task:verify` 做快速檢查，文件變更使用 `pnpm task:verify:docs`；所有
runtime、boundary 或 route topology 變更一律使用 `pnpm task:verify:runtime`。推送 release
候選前使用 `pnpm task:verify:all`，CI 與 `pnpm task:release` 也委派給同一支
`scripts/validation/verify.mjs`，不得另外維護平行的驗證順序。Repository automation 統一使用 Node `.mjs`，
因此 Windows 與 Unix 的 canonical `pnpm` 入口不需要 Bash。
