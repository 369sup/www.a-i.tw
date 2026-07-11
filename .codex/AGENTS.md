# Codex project rules

- 先讀 `AGENTS.md`、`docs/README.md`、`docs/ai-index.md`，再讀目標 bounded context。
- 不以 UI、route handler 或 infrastructure adapter 取代 domain/application 規則。
- 不把 Git hosting 語意混入產品 domain；跨 context 只使用明確 contract、port 或 adapter。
- 優先最小可行修改；不要在未授權下 push、deploy、delete、reset、rebase。
- 完成 runtime 變更後執行 `npm run check`、`npm run build`、`npm run semgrep`。
