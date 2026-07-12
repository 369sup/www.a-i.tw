# ADR 0004: App-local Bounded Contexts

## 狀態

Accepted — 2026-07-12

## 決策

單一 `@a-i/web` deployable application 的產品 Bounded Context 一律位於
`apps/web/src/modules/<context>`。每個 Context 內維持 Domain、Application、Contracts、
Infrastructure 與 Composition；不得依技術 layer 拆成跨 Context 共用資料夾，也不為了邊界
建立獨立 pnpm workspace。

每個 Context 的 `context.json` 使用 package `@a-i/web`，並與 machine-readable Context
Map 完全一致。路徑細節已由 ADR 0008 與 ADR 0009 supersede：跨 Context 只可由 consumer Infrastructure
integration 引用 provider `contracts/<subdomain>/public.ts`；
Domain、Application、Infrastructure 與 Composition 都是內部實作。只有
`apps/web/src/server/composition/` 可組裝 concrete adapters；route、Server Action 與 UI
是 inbound adapters。

`packages/*` 只容納無業務 owner 的技術能力。root `modules/*` 不再作為 runtime
Context 位置；scaffold generator、dependency-cruiser、Semgrep 與 architecture tests 必須
共同執行此規則。

## 後果

- Context 與 deployable app 的實際生命週期一致，避免 package boundary 與 runtime
  composition 分歧。
- 邊界由 Context Map、import fitness functions、contracts 與 composition-root 規則保護。
- 未來只有在獨立部署、版本、ownership 或 release cadence 有證據時，才另立 workspace
  package 或服務。
