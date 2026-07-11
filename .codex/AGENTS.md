# Codex project rules

- 先讀 `AGENTS.md`、`docs/README.md`、`docs/ai-index.md`，再讀目標 bounded context。
- 不以 UI、route handler 或 infrastructure adapter 取代 domain/application 規則。
- 不把 Git hosting 語意混入產品 domain；跨 context 只使用明確 contract、port 或 adapter。
- 優先最小可行修改；不要在未授權下 push、deploy、delete、reset、rebase。
- 完成 runtime 變更後執行 `pnpm check`、`pnpm build`、`pnpm semgrep`。
- 修改業務程式碼前，先確認 Domain、Subdomain、Bounded Context、Owner、Ubiquitous Language、Aggregate、Use Case、Ports、Adapters、Context Map 與 Public Contract；缺少時先標記架構缺口，不得自行補造語意。
- `.codex/rules/*.rules` 只控制 command execution policy；DDD、TypeScript、文件與命名判斷由本檔與根/子目錄 `AGENTS.md` 負責。
- shadcn 官方元件例外：`packages/ui/src/components/ui/**` 與 `apps/web/components/ui/**` 可保留官方所需的 `as`、primitive wrapper、namespace import 或其他 generated pattern；不要對其套用一般 TypeScript 禁止模式。
- shadcn 例外不允許放入 Domain/Application 規則、跨 Context 內部依賴或敏感資料；自製業務元件離開上述路徑後恢復一般規則。
- 不得將 `shared`、`common`、`core`、`utils`、`helpers` 作為未定義 owner 的 dumping ground；不得用 import/export alias 掩蓋命名衝突。
- 文件讀取順序：`docs/ai-index.md` → `docs/domains/ubiquitous-language.md` → `docs/domains/subdomains.md` → `docs/domains/bounded-contexts.md` → `docs/maps/domain-context-map.md` → 對應 contract/ADR/status。
- Serena 已由 `.codex/config.toml` 以 `--project-from-cwd --context=codex` 啟用，且必須安裝並執行於 WSL 的 Ubuntu（使用 Linux 的 `serena`、Python、Node 與 PATH，絕不呼叫 Windows executable）。處理 TypeScript/JavaScript 等可由語言伺服器理解的程式符號時，先呼叫 `serena.initial_instructions`，再用 Serena 的符號工具定位、追蹤引用與執行跨檔案 refactor；純文字、文件、設定、Git 狀態與小型局部修改則維持原生檔案或 shell 工具。不可為了「使用 Serena」而跳過本檔的架構、文件與驗證要求。
