# ADR 0003: Identity, Account and Repository in-memory slice

## 狀態

Accepted — 2026-07-12

## 背景

GitHub 官方產品語意區分 personal account、organization membership、outside collaborator、Team 與 Repository role。Role 是 permission 集合；Repository 的 visibility、archive、ownership 與 access management 是資源治理，而非 Git 儲存本身。

## 決策

建立 Identity & Access、Account 與 Repository 三個 Bounded Context，owner 均為 `www.a-i.tw Product Team`。Identity & Access 發布最小 Principal facts；Account 發布 Account eligibility 與 membership facts；Repository 透過自身 ACL 消費這些 facts，並獨立擁有 `repository:*` policy、role mapping、visibility、grant 與 lifecycle invariant。

第一階段交付可完整操作的 in-memory 垂直切片。Identity & Access 提供 demo Principal 與 session；Account 提供 personal／organization Account；Repository 提供建立、查詢、重新命名、visibility、archive 與 direct collaborator grant。Repository 不包含 blob、tree、commit、branch、pull request、issue、runner、package 或其他程式碼能力。

Experience 是 inbound adapter，以 Next.js 平行路由提供 Account rail、Repository workspace 與 Context inspector；concrete in-memory adapters 只在 server composition root 組裝。

## 後果

- 三個 Context 不共享 aggregate 或 persistence model，跨 Context 只使用版本化 published language。
- in-memory state 在 process restart 後重設，不是 production persistence。
- production authentication、credential management、Team、enterprise governance、transfer、delete restoration 與 durable outbox 延後。
- 後續 adapter 必須遵守現有 Port contract，不得把 persistence 或 provider semantics 帶入 Domain。
