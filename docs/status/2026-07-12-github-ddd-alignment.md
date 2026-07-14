# GitHub non-code DDD alignment

狀態：Current / verified 2026-07-12

本次將官方 GitHub 非 Code 語意分析落到現有 Domain-Driven Modular Monolith：

- Product Context manifest 現在明確區分 `approved` 與 `prototype`，並記錄 problem、first use case、source of truth、runtime evidence 與 typed Context Map relationships。
- Identity & Access 只擁有 Principal identity、status、assurance 與 Session；Account 擁有 handle、Profile、Organization Membership 與 Team。
- Organization owner 改為 Membership role；Team 儲存 Membership identity，不以 Principal identity 取代 Membership lifecycle。
- Repository 不再複製 Account handle，且 collaboration action 已細化為 Issue capabilities。
- Issues 的 Label 與 Assignment 不再受 blanket closed-state rule；Dependency 會驗證存在性、scope、duplicate 與 cycle。
- Projects 已完成第一個 approved slice：Account-owned Project、typed Issue reference、Draft Item、Account owner ACL 與 Issue directory ACL。
- Enterprise Governance 已成為獨立 approved Context：擁有 Enterprise、owner assignment、Organization affiliation 與 Repository visibility policy；Repository 透過 consumer ACL 消費 constraint 並保留最終決策。
- 完整 GitHub 非 Code 目標已固定為 19 個邏輯 Context；未完成者只列 roadmap，不建立空殼 runtime。
- Bounded Context generator 現在強制 problem、first use case、source of truth、lifecycle 與 runtime evidence。
- Context public API 不得輸出 Domain 或 Infrastructure internals；architecture gate 已自動檢查。

## Verification

- `pnpm arch:check`: passed, including 13 architecture tests and a 257-module / 432-dependency graph.
- `pnpm docs:check`: passed.
- `pnpm --filter @a-i/web typecheck`: passed.
- `pnpm --filter @a-i/web test -- --run`: 24 passed, 1 skipped; 38 tests passed and 1 todo.
- `pnpm build`: passed.
- `pnpm check`: blocked by the repository-wide pre-existing Prettier baseline (213 files), before Turbo checks run.
- `pnpm semgrep`: unavailable on this Windows host; the package script is POSIX-only and no `semgrep` executable is installed.

Discussions、Notifications、Search、Activity Feed 與 Audit 仍是 prototype。Integration Events、
Outbox／Inbox 與 durable persistence 必須等到具名 producer/consumer edge 核准後實作，不建立
無 owner 的中央 event service。
