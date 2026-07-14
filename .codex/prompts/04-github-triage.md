# GitHub 分流與狀態檢視

請使用 GitHub 取得目前分支的協作狀態，預設唯讀，不改變遠端資料。

```sh
git remote -v
git branch --show-current
git status --short
gh auth status
gh pr status
gh pr checks --watch=false
gh issue list --limit 20
gh run list --limit 10
```

優先使用 GitHub connector 讀取 PR、issue、review thread 與標籤；本機 `git`/`gh` 僅補足目前 checkout、認證與 Actions log。

- 若有 review feedback，整理成可執行項目，並在實作前先確認目標 PR。
- 若有失敗 Actions，取得失敗 job/log 的最小必要片段，再交由 CI 修復流程。
- 不建立 issue、留言、反應、commit、push、開 PR 或 merge，除非我逐項明確授權。

回報：目前 PR/CI 狀態、阻塞點、可安全採取的下一步。
