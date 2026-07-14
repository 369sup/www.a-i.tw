# 發布前整備

請針對目前變更建立發布前檢核與證據，不發布、不推送、不建立 PR。

```sh
git status --short
git diff --check
pnpm check
pnpm docs:check
pnpm release:check
pnpm arch:check
pnpm build
pnpm semgrep
```

再檢查適用的 `docs/initiatives/`、`docs/operations/`、`docs/runbooks/` 與狀態文件。若有目前 PR，使用 GitHub 唯讀檢視 checks、review 與未解決 thread。

輸出可貼到 PR 的摘要：範圍、架構/contract 影響、驗證證據、已知風險、rollback/操作準備度、尚待人工確認項目。若任何門檻失敗，標示為不可發布並說明阻塞原因。
