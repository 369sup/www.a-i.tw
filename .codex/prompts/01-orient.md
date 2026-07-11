# 專案工作定位

在開始任何工作前，先建立最小且可靠的上下文，不修改檔案。

1. 讀取 `AGENTS.md`、`.codex/AGENTS.md`、`docs/README.md`、`docs/ai-index.md`，再讀目標目錄內的 `AGENTS.md`（如有）。
2. 執行並摘要結果：

```bash
git status --short
git branch --show-current
git log -5 --oneline
rg --files -g 'AGENTS.md' -g 'package.json' -g 'README.md' -g '!node_modules'
```

3. 依任務類型從 `docs/ai-index.md` 路由到最小必要文件；若涉及模組、ownership、contract 或跨 context，先讀相關 map、ADR、contract 與 status。
4. 回報：任務影響範圍、既有未提交變更（不可覆寫）、適用架構邊界、建議的最小驗證命令。
5. 不猜測尚未定義的 Domain、Bounded Context、Owner 或 Ubiquitous Language；缺少時標記為架構缺口並請求方向。
