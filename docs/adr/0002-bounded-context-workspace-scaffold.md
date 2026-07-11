# ADR 0002: Bounded Context workspace scaffold

## 狀態

Accepted — 2026-07-11

## 決策

以 `modules/<bounded-context>` 作為業務 Bounded Context 的 pnpm workspace package；
各 Context 內部維持 Domain、Application、Infrastructure、Contracts 與 Composition。業務
Context 不依 layer 分散成多個 package。`packages/*` 僅容納無業務 owner 的技術能力與
tooling，且禁止反向依賴 `modules/*`。

每個 Context 必須有 `context.json`，並同步為 `docs/maps/context-map.json` 中完全相同的
記錄。其 package exports 僅能暴露 application facade、published contracts 與 composition
factory；其他 Context 只能 import `@a-i/<context>/contracts`。

## 後果

- pnpm workspace、package exports、dependency-cruiser、manifest scripts 與 Semgrep 提供
  結構性保護。
- 尚未有 owner 的子域不得以範例 package 出現在 runtime graph；改由 generator template
  提供 Codex 可模仿的模式。
- Aggregate、event、repository、facade 或 Shared Kernel 不由腳手架預先生成，必須有產品
  與 domain 證據。
