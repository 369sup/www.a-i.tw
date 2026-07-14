# Codex 操作 Profile 範本

Codex CLI 的原生 profile 位於 `$CODEX_HOME/<名稱>.config.toml`，屬於使用者設定，不能由 repository 直接啟用。本目錄保留可版本控制的範本；首次使用時複製到自己的 `$CODEX_HOME`，再以 `codex --profile <名稱>` 啟動。

```sh
cp .codex/profiles/implementation.config.toml "$CODEX_HOME/implementation.config.toml"
codex --profile implementation -C "$PWD"
```

範本只覆蓋工作方式（reasoning effort、approval policy），不儲存 token、MCP credential 或個人模型偏好。專案預設 MCP 位於 `.codex/config.toml`，無須複製。

| Profile          | 用途                       |
| ---------------- | -------------------------- |
| `implementation` | 一般實作與測試             |
| `review`         | 唯讀檢視、PR/CI 分析與規劃 |
| `release`        | 發布前驗證，維持明確核准   |
