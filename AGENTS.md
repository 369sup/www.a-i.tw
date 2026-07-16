<!-- BEGIN:nextjs-agent-rules -->

# Next.js local-version rule

Before changing Next.js behavior, identify the installed version and read only the relevant guide under
`node_modules/next/dist/docs/`. Follow local deprecations and repository patterns.
<!-- END:nextjs-agent-rules -->

# Repository contract

## Scope and precedence

- This contract applies repository-wide; a nearer `AGENTS.md` adds subtree constraints.
- A non-empty `AGENTS.override.md` replaces only the same directory's `AGENTS.md`; it is never additive.
- Runtime, manifests, contracts, tests, and canonical owners outrank guidance and memories.

`apps/web` is the only deployable app. Product runtime belongs to app-local Bounded Contexts; `packages/*` contains only
context-neutral technology.

## Hard boundaries

```text
UI / Infrastructure -> Application -> Domain
```

- Domain owns invariants and has no framework, SDK, I/O, Application, Adapter, or UI dependency.
- Application owns use cases and Ports without instantiating adapters.
- Adapters map I/O; only server composition wires implementations.
- Cross-Context calls use consumer Port -> `adapters/outbound/integrations` -> provider
  `contracts/<version>/public.ts`; never import peer internals.

## Prohibited actions

- Do not create ownership-free `shared`, `common`, `core`, `utils`, `helpers`, or horizontal product packages.
- Do not promote Proposed semantics to Current without approval and runtime or dated evidence.
- Do not preload catalogs, unrelated Contexts or skills, memories, Git history, or generated reports.
- Do not stage, commit, push, deploy, switch branches, act destructively, or overwrite unrelated work unless requested.

## Required workflow

1. Confirm Git root, `git status --short`, nearest `AGENTS.md`, owner, boundary, and smallest verification.
2. Select one route below; inspect exact paths, symbols, imports, consumers, and tests until the change is known.
3. Make the smallest cohesive change; update a canonical owner only when its fact changes.
4. Verify by blast radius and inspect the diff.

## Serena autonomous workflow

- 對 Serena 支援的程式任務，先執行一次 `get_current_config`；只有 session/project 未就緒時才執行 initial instructions 或 activation，不重複初始化失敗。
- 需要 repository routing 時才讀 `project-overview`；只有 resume、compact、pause 或 pending checkpoint 才讀 `current-work-state`；任務確實需要已蒸餾的非顯然知識時才讀 `knowledge`。不得預載三者。
- 語意順序為 `get_symbols_overview` → `find_symbol`／`find_declaration` → 必要的 implementations／references → 適當的 symbol-level edit → changed-file diagnostics。
- Markdown、JSON、YAML、TOML、設定、Git、命令、literal 與不適合符號分析的局部修改使用原生搜尋與 patch 工具。
- Cross-Context 修改前確認 owner、public contract、dependency direction 與 reference impact；memory 永遠不得覆蓋 runtime、manifest、test 或 canonical docs。
- 完整工具選擇由使用者層級 Codex configuration 與當前 session 暴露能力擁有；repository 只保留專案邊界與 memory gate。

## Context routing

```text
task
├── app/runtime       -> nearest path AGENTS.md + exact source/tests
├── Context topology -> apps/web/src/modules/AGENTS.md
├── cross-Context    -> docs/domains/context-map.md + both context.json files
├── documentation    -> docs/ai-index.md
├── doc topology     -> docs/README.md
├── Codex/tools      -> .codex/AGENTS.md + matching skill
└── Next.js          -> installed node_modules/next/dist/docs topic
```

`README.md` owns knowledge; `AGENTS.md` scoped constraints; `config.toml` execution capabilities.

## Commands and validation

```text
docs/config        -> pnpm docs:check
runtime            -> focused tests -> pnpm check -> pnpm build
topology/boundary  -> pnpm arch:check (in addition)
security-sensitive -> pnpm semgrep
release            -> pnpm task:verify:all
```

Codex 執行常用檢查時，優先使用 `scripts/codex/README.md` 的低輸出命令。Turbo 任務使用
`--output-logs=errors-only`；非 Turbo 或複合檢查使用 `scripts/codex/*.sh`，完整 log 留在 `.codex/logs/`，
不得把成功訊息、workspace 前綴、cache 訊息或完整掃描輸出讀入對話。失敗時依 wrapper 顯示的有限診斷與完整
log 路徑進一步定位。

Windows: if a wrapper fails for environment reasons, run documented lower-level checks. Do not weaken rules and do not
report unexecuted checks as passed.

## Serena Memory Checkpoint

Memory 固定只有 `project-overview`、`knowledge` 與 `current-work-state`：分別負責 routing index、經驗證的非顯然 durable records，以及唯一 checkpoint。不得建立 per-Context、workflow、command、research 或 temporary memory。

在重要實作／架構階段完成、context/task 切換或使用者暫停時，先以 `pnpm checkpoint:context -- --signal <reason>` 建立語意 request，再完成 checkpoint。`PreCompact` 會自行建立 request；`Stop` 只處理已存在的 request，不得以 token、時間或 dirty-file 數量猜測重要性。官方 hooks 未提供可靠 token percentage；不得解析 transcript/session JSONL 或猜測比例。`PreCompact` request 未完成前不得繼續 compaction。

`current-work-state` 固定使用：

```text
# Current Work State
## Objective
## Scope
## Confirmed Decisions
## Completed
## In Progress
## Pending
## Modified Files
## Git Anchor
## Validation
## Known Risks
## Next Action
```

`Git Anchor` 至少記錄 branch、HEAD 與 working-tree summary。取得 Git root、branch、`git status --short` 與驗證證據後，將摘要 pipe 到 `pnpm checkpoint:context -- --checkpoint`。只有 Serena write 與 read-back 都成功才可聲稱保存成功；失敗時明確回報 ignored fallback。不得寫入逐字稿、source dump、diff、raw output、秘密、已推翻決策或可由 Git/code/docs 低成本重建的資料。

## Definition of Done

Done means the outcome is met, boundaries and unrelated work are intact, and relevant checks pass. Finish with
`git diff --check`, `git diff --stat`, and a focused diff; report summary, evidence or root cause, changes, validation,
and remaining risk.
