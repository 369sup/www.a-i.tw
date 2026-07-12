# Codex project rules

## Tool Selection And Fast Startup

- This file is the repository-level execution contract for Codex. Keep startup small: read this file and the root `AGENTS.md`, inspect the task-relevant path, then stop when ownership, boundary, contract, and verification are known.
- On Windows, if the terminal runner reports `CreateProcessAsUserW failed: 5` or `Access denied` while starting `pwsh.exe`, treat it as a shell-launch failure rather than a repository permission failure. Continue through Serena MCP for file and symbol operations; for shell verification explicitly use `powershell.exe` or `cmd.exe` as the shell. Do not retry the same blocked `pwsh.exe` launch repeatedly.
- Do not preload `docs/README.md`, `docs/ai-index.md`, the architecture catalog, or every skill. Route to them only when the task table or an unresolved ownership/contract question requires it.
- Use every Serena tool exposed in the live session when it is relevant. The repository must not assume a fixed Serena tool list: discover available tools at runtime and fall back to native file/Git tools only for prose, configuration, unsupported languages, or when Serena is unavailable.
- At the start of every task, attempt the Serena handshake (`initial_instructions`, `get_current_config`; activate this project if needed). A missing or unavailable Serena server is a capability limitation, not a reason to stop an otherwise safe task.
- Use Context7 autonomously for version-sensitive or incomplete framework, library, SDK, or API questions. Resolve the exact library ID first, query the installed/project version when known, and prefer local `node_modules` documentation when it is authoritative and sufficient. Do not use Context7 for ordinary Markdown, Git, TOML, JSON, or repository-local policy edits.
- Never add connector IDs, OAuth state, API keys, or user plugin cache to the repository. The project may declare reproducible local MCP commands in `.codex/config.toml`; Desktop-managed connectors remain host-managed.

## Compact Pre-Edit Note

ADR 0008 target topology is Context-first, layer-second and declared-subdomain-third. The migration registry is in
`target` mode; legacy `src/*` Context internals are forbidden. New Contexts and subdomains must use the target
generator. Never create ownership-free shared directories.

Before editing, state: owner, dependency direction, use case (or `not applicable`), ports/adapters (or `not applicable`), composition impact, and verification command. For this `.codex`/`.agents` policy area, ownership is repository engineering workflow; it has no product Domain or runtime adapter.

- 先讀 `AGENTS.md` 的 `Minimal-context routing` 與本檔；依任務類型只讀一個初始入口。文件拓撲才讀
  `docs/README.md`，產品語意／docs-only／ownership 不明才讀 `docs/ai-index.md`，窄幅 runtime task
  可直接讀最近的 module `AGENTS.md`、`README.md`、`context.json` 與目標 symbols/tests。
- 架構工作必須再讀 `docs/architecture/ddd-hexagonal-standard.md` 與 `docs/architecture/architecture-governance.json`。30 個 concern、runtime manifest、Fumadocs、Serena navigation 與驗證證據必須一致。
- 不以 UI、route handler 或 infrastructure adapter 取代 domain/application 規則。
- 必須遵守 Domain-Driven Modular Monolith、Hexagonal Architecture 與 Ports and Adapters：UI、route、Server Action 與 infrastructure 都是 adapter；Application 擁有 use case 與 Port；Domain 擁有不變條件；只有 server-side composition root 可組裝 concrete adapter。
- 不把 Git hosting 語意混入產品 domain；跨 Context 由 consumer Application 定義 Port、consumer Infrastructure
  ACL adapter import provider `contracts/<subdomain>/public.ts`，並只在 app server composition 接線。
- 優先最小可行修改；不要在未授權下 push、deploy、delete、reset、rebase。
- 完成 runtime 變更後執行 `pnpm check`、`pnpm build`、`pnpm semgrep`。
- 修改業務程式碼前，先確認 Domain、Subdomain、Bounded Context、Owner、Ubiquitous Language、Aggregate、Use Case、Ports、Adapters、Context Map 與 Public Contract；缺少時先標記架構缺口，不得自行補造語意。
- 產品行為或 boundary 變更必須依 `docs/engineering/semantic-development-workflow.md` 的 G0-G7 執行：語意核准 → canonical 文件／memory 導航 → owner／path → scaffold → Domain／Application／Ports → Adapters／composition／inbound → verification evidence。不得越級。
- `.codex/rules/*.rules` 只控制 command execution policy；DDD、TypeScript、文件與命名判斷由本檔與根/子目錄 `AGENTS.md` 負責。
- shadcn 官方元件例外：`packages/ui/src/components/ui/**` 與 `apps/web/components/ui/**` 可保留官方所需的 `as`、primitive wrapper、namespace import 或其他 generated pattern；不要對其套用一般 TypeScript 禁止模式。
- shadcn 例外不允許放入 Domain/Application 規則、跨 Context 內部依賴或敏感資料；自製業務元件離開上述路徑後恢復一般規則。
- 不得將 `shared`、`common`、`core`、`utils`、`helpers` 作為未定義 owner 的 dumping ground；不得用 import/export alias 掩蓋命名衝突。
- Context 唯一位置是 `apps/web/src/modules/<context>`；internal subdomain 必須在 manifest 宣告並位於各 layer 的 `<layer>/<subdomain>`。禁止 root `modules/` 與水平 `packages/application`、`contracts`、`domain`、`foundation`、`infrastructure`。
- 文件讀取採按需路由，不預設走完整鏈。只有新的產品語意或跨 Context ownership 判定，才依
  `docs/ai-index.md` → owning product/domain document → relevant Context Map edge → 對應 contract/ADR/status；
  已知單一 Context 的 runtime 修正不得為了「完整理解」載入全部 domain docs。
- 遇到文件、memory、skills、生成器或平行調查結果分歧時，以目前程式碼/測試與 Context Map manifest 為事實，再以 canonical `docs/` 判定政策；Serena memory 與 upstream skill 僅供導航，必須修正而非用來覆寫事實。平行工作預設唯讀，任何相同檔案或相依決策由主 agent 統一修改與驗證。
- Canonical docs、manifest、runtime status、ownership、contract、path 或驗證證據有實質變更時，完成驗證後主動更新、整理、蒸餾或編輯所有受影響的 Serena memories，不需等待逐次要求；不得把 Proposed 寫成 Current。刪除、重新命名或廣泛重組 memory hierarchy 仍需使用者明確指示。
- 每個新的 Codex task 都先呼叫 `serena.initial_instructions` 與 `serena.get_current_config`，確認目前 workspace repository 已啟用；文件、規劃或 Git-only task 也不得省略這個 handshake。Serena 使用 Codex Desktop 或目前 user profile 設定的 Windows host runtime。處理 TypeScript/JavaScript 程式符號時，再用 Serena 符號工具定位、追蹤引用與執行 refactor；純文字、文件、設定與 Git 操作則在 handshake 後使用原生工具。
