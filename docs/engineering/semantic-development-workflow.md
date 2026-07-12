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

- 每個 Codex task 執行 Serena handshake：`initial_instructions`、`get_current_config`。
- 讀 root／target `AGENTS.md`、`docs/ai-index.md`、Context manifest 與最窄 runtime evidence。
- 確認 worktree，保留既有未提交修改。

### G1 — Approve semantics

記錄 problem、actor、business outcome、owner、Ubiquitous Language、Subdomain、Bounded
Context、Aggregate candidate、invariants、first use case、success measure 與 out-of-scope。

### G2 — Update canonical knowledge

依變更範圍更新 `docs/product`、`docs/strategy`、`docs/domains`、`docs/application`、
`docs/contracts`、`docs/data`、ADR、Context Map 與 roadmap。Formal docs 更新並取得 runtime／驗證
證據後，主動更新、整理、蒸餾或編輯所有受影響的 Serena navigation memories；日常維護不需
逐次等待使用者要求。刪除、重新命名或廣泛重組仍需明確指示；memory 不得取代 canonical docs。

### G3 — Approve ownership and path

- Product Context：`apps/web/src/modules/<context>`。
- Internal subdomain：manifest 宣告後分布於各 layer 的 `<layer>/<subdomain>`。
- Cross-context：consumer Application Port + consumer Infrastructure integration ACL + provider
  `contracts/<subdomain>/public.ts`；只在 app server composition 接線。
- Reusable scaffold：`.agents/skills/<owner>/assets`。
- Next.js route／Server Action：inbound adapter；不得擁有 business rule。
- Concrete adapter wiring：只在 `apps/web/src/server/composition`。
- 不得新增 root `templates`、`modules` 或 ownership-free horizontal layer。

### G4 — Scaffold

只有新 Context 或 internal subdomain 需要 scaffold，且只能使用 `pnpm generate:context` 或
`pnpm generate:subdomain`。既有 Context 的新 Aggregate／use case 不建立新 Context。

### G5 — Implement inside-out

1. Domain：Aggregate、Value Object、invariant、Domain error。
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
| `.codex`   | 每個 task 的 handshake、順序與禁止越級規則                  |
| `.github`  | PR／feature intake 必須提供各 gate evidence                 |
| `.semgrep` | 靜態阻擋 framework-in-Domain、layer inversion 與敏感模式    |
| `.serena`  | 符號影響分析、diagnostics 與驗證後主動維護的精簡導航 memory |

任何工具規則與 runtime／Context Map／canonical docs 衝突時，以 runtime evidence、Context
Map manifest 與 canonical architecture standard 為準。
