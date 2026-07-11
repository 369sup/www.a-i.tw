# 變更驗證

請檢查目前工作樹的變更並執行與風險相稱的驗證。不要修改產品程式碼，除非我另行要求。

```bash
git status --short
git diff --check
git diff --name-only
pnpm check
```

- runtime、package、架構、contract 或 workspace 變更：跑 `pnpm arch:check`、`pnpm build`、`pnpm semgrep`。
- 文件變更：加跑 `pnpm docs:check` 與 `pnpm release:check`。
- 有 E2E 規格或使用者流程改動：加跑 `pnpm test:e2e`；若本機瀏覽器/環境不足，清楚列為未驗證。
- 只針對本次 diff 解讀失敗；先區分既有問題、環境問題與本次回歸。

用精簡表格回報：命令、結果、與本次變更的關聯、建議下一步。
