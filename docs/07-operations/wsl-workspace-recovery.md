# WSL workspace recovery

狀態：驗證過的本機開發環境 runbook

## 目的

處理 WSL workspace 因 ext4 錯誤被重新掛載為唯讀，以及在唯讀 home
directory 中使用 Corepack 時無法取得 repository 指定 pnpm 的情況。

## 偵測

在 repository root 執行：

```bash
findmnt -T "$PWD" -o TARGET,SOURCE,FSTYPE,OPTIONS
test -w "$PWD" && echo WORKSPACE_WRITABLE || echo WORKSPACE_READ_ONLY
```

若 mount options 包含 `ro` 或 `errors=remount-ro`，不要嘗試修改、格式化或安裝
project dependencies。先保存可讀取的診斷輸出並完成檔案系統復原。

## 復原

以有 sudo 權限的帳號執行：

```bash
sudo mount -o remount,rw /
findmnt -T "$PWD" -o TARGET,OPTIONS
```

只有第二個命令顯示 `rw` 時才能繼續。若 remount 失敗，停止 WSL instance 後再依
Windows／WSL 的檔案系統復原流程處理；不要以 repository 指令繞過唯讀狀態。

## Corepack 暫存

當 `$HOME/.cache/corepack` 無法寫入時，將暫存放在可寫目錄，不改變 repository：

```bash
COREPACK_HOME=/tmp/corepack pnpm --version
```

此 repository 的 `packageManager` 固定為 pnpm `10.34.5`。CI 與本機驗證都必須使用
這個版本，而不是依賴全域 pnpm 版本。

## Architecture import gate

`apps/web` 和 `packages/ui` 各自定義 `@/*` alias，不能用單一 TypeScript config
解析整個 monorepo。`pnpm arch:imports` 必須分別使用：

1. `apps/web/tsconfig.json` 掃描 `apps` 與 `modules`；
2. `packages/ui/tsconfig.json` 掃描 `packages/ui`；
3. 不使用 alias 的 technical packages 以 Node/package exports resolution 掃描。

禁止因 resolver 設定問題停用 `no-unresolvable-dependencies`。修正 resolver 後執行：

```bash
COREPACK_HOME=/tmp/corepack pnpm arch:check
```

成功條件是 manifest、exports、workspace、cross-context、import graph 與負向
architecture fixtures 全部通過。
