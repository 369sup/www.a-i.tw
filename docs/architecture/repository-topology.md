# Repository topology

狀態：Accepted / machine enforced

本 repository 只有一套 ownership topology。目錄不是分類偏好，而是責任與變更邊界。

| Root       | 唯一責任                                                     | 不得承載                           |
| ---------- | ------------------------------------------------------------ | ---------------------------------- |
| `.agents`  | repository-owned Codex skills、scaffold 與 skill overlays    | canonical product truth            |
| `.codex`   | Codex prompts、profiles、command rules 與 local MCP policy   | Domain model 或 runtime code       |
| `.github`  | CODEOWNERS、issue/PR templates、CI 與 security workflows     | application behavior               |
| `.semgrep` | repository static-analysis rules                             | duplicated architecture docs       |
| `.serena`  | semantic navigation memories 與 project configuration        | authoritative or speculative facts |
| `apps`     | deployable app、app-local Context、composition 與 Experience | reusable context-neutral packages  |
| `docs`     | canonical internal product、domain、architecture 與 ops      | public Fumadocs source             |
| `packages` | context-neutral technical packages                           | Domain、Application、Contracts     |
| `plugins`  | Codex plugin manifests 與 plugin-owned resources             | product runtime                    |
| `scripts`  | deterministic architecture、validation 與 migration          | business policy                    |
| `tests`    | cross-cutting architecture fixtures 與 end-to-end flows      | owner-local unit or Context tests  |

以上 root、`apps/web/src/app` 及 `apps/web/src/presentation` 的直接子項目均為 closed topology，由
`pnpm arch:topology` 與 architecture tests 機械驗證。不得採用替代結構、不得自行簡化、不得自行增加平行架構層、不得繞過檢查，也不得以 prototype、migration 或暫時性實作為由破壞 ownership 與依賴邊界。任何合法調整都必須同步修改 canonical owner、checker、正反向測試及 CI 可到達的驗證入口。

公開文件位於 `apps/web/content/docs`，由 Fumadocs 發布；內部 canonical governance 位於 `docs`。兩者可互相連結，但不可複製成兩份 owner 相同的規範。

`apps/web/src/app` 只允許兩種 audience route group：`(public)` 與 `(console)`。
公開網站、Fumadocs 與公開 transport adapter 屬於 `(public)`；產品工作區、平行路由、
intercepted modal 與內部可操作工具屬於 `(console)`。不得以 Bounded Context、產品來源或
template 名稱建立第三種 route group。

跨 route 且跨 Context 的 inbound presentation adapter 位於 `apps/web/src/presentation/<experience>`。目前封閉
Experience 為 `authentication`、`navigation` 與 `request-context`；它們可依賴 app composition facade 與
context-neutral shadcn primitives，但不得擁有 Domain 規則、資料或跨 Context contract。

## Forbidden parallel structures

- root `modules/`：產品 Context 唯一位置是 `apps/web/src/modules/`。
- root 或 `packages/` 下的 `application`、`contracts`、`domain`、`foundation`、`infrastructure`。
- `packages/tooling` umbrella：工具以精確 package capability 命名並維持 flat。
- 全域 `shared`、`common`、`core`、`utils`、`helpers`。
- 第二份 Context Map、第二套 module generator 或未連到 root validation 的架構規則。

## Change protocol

Context-internal topology is governed by `context-internal-topology.md` and
`context-topology-migration.json`. Horizontal business-layer packages remain forbidden.

新增 root 或 package category 必須先有 owner、consumer、替代方案分析、ADR 與 `arch:topology` 更新。若一個概念帶有產品語意，預設放回 owning Context，而不是建立 technical package。
