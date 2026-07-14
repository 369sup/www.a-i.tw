# Semantic development workflow

狀態：Accepted / mandatory for product behavior and boundary changes

本 workflow 將產品語意轉成可驗證 runtime，避免先建 route、folder、table 或 adapter 再反推
Domain。每個 gate 必須有 evidence；未通過不得進入下一個 gate。

## Gate sequence

```text
G0 Orient
→ G1 Approve semantics
→ G2 Update canonical knowledge
→ G3 Approve ownership and path
→ G4 Scaffold
→ G5 Implement inside-out
→ G6 Compose and present
→ G7 Verify and publish evidence
```

### G0 — Orient

- 對語意程式任務套用 Serena Session Guard：先 `get_current_config`，僅在 session 或 project 未就緒時才執行 `initial_instructions` 與 project activation；若 Serena 不可用，同一 task 不重複初始化重試。
- 讀 root／target `AGENTS.md`、`docs/ai-index.md`、Context manifest 與最窄 runtime evidence。
- 確認 worktree，保留既有未提交修改。

### G1 — Approve semantics

記錄 problem、actor、business outcome、owner、Ubiquitous Language、Subdomain、Bounded
Context、Aggregate candidate、invariants、first use case、success measure 與 out-of-scope。

### G2 — Update canonical knowledge

依變更範圍更新 `docs/product`、`docs/strategy`、`docs/domains`、`docs/application`、
`docs/contracts`、`docs/data`、ADR、Context Map 與 roadmap。Formal docs 更新並取得 runtime／驗證
證據後，僅在出現無法低成本由 canonical sources 重建的非顯然導航知識時更新 `project-overview`；
跨 session 的未完成狀態只寫入 `current-work-state`。memory 不得複製或取代 canonical docs。

### G3 — Approve ownership and path

- Product Context：`apps/web/src/modules/<domain-group>/<context>`；Subdomain 是 manifest 中的問題空間分類。
- `<domain-group>` 必須是 architecture registry 宣告的九組之一；Domain Group 只有一層且不得巢狀。
- 固定模板：capability-oriented Domain、Application、Contracts、Adapters、Composition 與 Tests 一次建立。
- Cross-context：consumer Application Port + consumer `adapters/outbound/integrations` ACL + provider
  `contracts/vN/public.ts`。
- Reusable scaffold：`.agents/plugins/plugins/<plugin>/skills/<owner>/assets`。
- Next.js route／Server Action：inbound adapter；不得擁有 business rule。
- Concrete adapter wiring：只在 `apps/web/src/composition`。
- 不得新增 root `templates`、`modules` 或 ownership-free horizontal layer。

### G4 — Scaffold

只有新 Context 需要 scaffold，且只能使用 `pnpm generate:context`。既有 Context 的新 Domain capability、
Aggregate 或 use case 不建立新 Context。

### G5 — Implement inside-out

1. Domain：從核准的 Ubiquitous Language 與 invariant 建立 Context-owned Value Object，再形成 Aggregate、
   Entity 與 Domain error。Value Object 必須 immutable、以值相等、在 construction 驗證或 canonicalize，且
   由 Domain tests 覆蓋；不得建立跨 Context global primitive wrapper 或只為填滿模板而新增型別。
2. Application：named use case、input/result、inbound/outbound Ports。
3. Contracts：只有跨 Context Published Language 才新增版本化 contract。
4. Infrastructure：實作 outbound Ports，不擁有規則。
5. Tests：先 Domain／Application，再 adapter integration。

Dependency direction 固定為 `Presentation / Infrastructure -> Application -> Domain`。

### G6 — Compose and present

server-only composition root 組裝 concrete adapters；route、UI、Server Action 只做 transport、
view mapping 與 use-case invocation。跨 Context consumer 使用自己的 Port／ACL，只 import
provider contract。

### G7 — Verify and publish evidence

- Serena diagnostics：所有變更的 TypeScript／JavaScript 檔案。
- `pnpm check`
- `pnpm docs:check` 與 `pnpm arch:check`（文件或邊界變更）
- `pnpm build`
- `pnpm semgrep`
- 對應 E2E／acceptance flow

最後更新 status／evidence 與 roadmap；不得把未完成或未驗證 runtime 標成 Current。

## Cross-tool responsibility

| Surface    | Responsibility                                              |
| ---------- | ----------------------------------------------------------- |
| `.agents`  | 執行本 workflow、scaffold 與 specialized review skills      |
| `.codex`   | 每個 task 的 Session Guard、順序與禁止越級規則              |
| `.github`  | PR／feature intake 必須提供各 gate evidence                 |
| `.semgrep` | 靜態阻擋 framework-in-Domain、layer inversion 與敏感模式    |
| `.serena`  | 符號影響分析、diagnostics 與驗證後主動維護的精簡導航 memory |

任何工具規則與 runtime／Context Map／canonical docs 衝突時，以 runtime evidence、Context
Map manifest 與 canonical architecture standard 為準。
