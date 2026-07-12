# 實作或修正

請以最小可行修改完成此需求：`<需求>`。

先使用「專案工作定位」流程，再依序進行：

1. 將需求映射到既有 Domain、Bounded Context、Aggregate、Use Case、Port/Adapter 與 public contract；不清楚時停止在程式修改前提出缺口。
2. 對 Next.js 或已安裝套件的版本敏感問題，先檢查 `package.json` 與 `node_modules/<package>/dist/docs/`。本機資料不足或可能過期時，才用 Context7 查該套件的對應版本文件。
3. 實作時維持依賴方向：`UI / Infrastructure -> Application -> Domain`。不得讓 domain 依賴 React、Next.js、資料庫 client 或外部 SDK。
4. 為行為新增或調整最貼近的測試；不要以無關重構擴大 diff。
5. 檢視變更並執行適用驗證：

```bash
git diff --check
git diff --stat
pnpm check
```

若改到 runtime、邊界、workspace、公開 contract 或部署相關內容，額外執行：

```bash
pnpm arch:check
pnpm build
pnpm semgrep
```

最後回報變更、驗證證據、未執行項目與原因；不 commit、push 或部署，除非我明確要求。

# ADR 0008 topology

For Context work, route new code to `<layer>/<declared-subdomain>/<tactical-pattern-or-use-case>`. Do not copy legacy
`src/*` layout unless the task is the controlled migration itself. Use `public-api.ts` and Context composition entrypoints.
