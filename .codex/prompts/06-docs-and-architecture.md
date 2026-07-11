# 文件與架構邊界變更

請處理：`<新功能、context、contract、ADR 或文件需求>`。

先讀：`docs/ai-index.md`、`docs/domains/ubiquitous-language.md`、`docs/domains/subdomains.md`、`docs/domains/bounded-contexts.md`、`docs/maps/domain-context-map.md`，再讀對應 ADR、contract、status 與 module 文件。

- 新 bounded context 只能在 ownership、語言、aggregate、use case、port、adapter、context map 與 public contract 已明確時建立；用既有命令產生骨架：

```bash
pnpm generate:context
```

- 跨 context 或 public contract 的變更，補齊 ADR/contract/相容性與驗證證據；不以文件宣稱未存在的 runtime。
- 不將 `shared`、`common`、`core`、`utils`、`helpers` 當成未定義 owner 的收納處。
- 先驗證文件與邊界，再驗證建置：

```bash
pnpm docs:check
pnpm arch:check
pnpm check
pnpm build
pnpm semgrep
```

最後列出 ownership、受影響的 contract、相容性決策與所有驗證結果。
