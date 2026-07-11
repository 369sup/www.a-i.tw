# CI 失敗診斷與修復

請診斷並修正：`<PR、workflow run URL、check 名稱或錯誤>`。

1. 先讀取目前分支與工作樹，避免覆寫使用者的未提交修改。
2. 使用 GitHub connector 取得 check/PR metadata；使用 `gh run view <run-id> --log-failed` 讀取 GitHub Actions 的失敗 log。
3. 在本機以最小對應命令重現，例如：

```bash
pnpm check
pnpm docs:check
pnpm arch:check
pnpm build
pnpm semgrep
```

4. 判斷失敗是本次回歸、既有基線、CI 環境差異或外部服務問題。只有可重現且與任務相關時才修改檔案。
5. 修正後重跑原始失敗命令與必要相鄰門檻，並以 `git diff --check` 檢查 diff。

不得自行 rerun workflow、commit、push 或修改 GitHub 設定；先回報根因、修正與驗證結果。
