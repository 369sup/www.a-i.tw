# 貢獻指南

1. 先閱讀 `AGENTS.md`、`docs/README.md` 與相關 bounded context 文件。
2. 建立小而可審查的變更；若涉及邊界、資料所有權或公開 contract，新增或更新 ADR。
3. 提交前執行 `npm run check`、`npm run build`、`npm run semgrep`。
4. Pull request 必須說明範圍、架構影響、驗證、風險與回滾方式。

提交訊息建議使用 Conventional Commits，例如 `feat: add account overview`。
