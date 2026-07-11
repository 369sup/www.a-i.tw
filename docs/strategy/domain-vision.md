# Domain vision

狀態：Baseline / reviewed 2026-07-12

本產品將可歸因的 Principal、資源 ownership Account 與協作政策 Repository 分離，
讓 authentication、組織關係與 resource authorization 能獨立演進，而不是折疊成
`user.role`。

目前 in-memory slice 驗證三個問題：誰正在操作、哪個 Account 擁有資源、Repository
是否允許該 action。成功訊號是模型能明確解釋 access decision、維持 owner namespace
與 archive invariant，且 Context 可在不共享 Aggregate 的前提下協作。

Non-goals 包含 Git/code、production credential provider、durable persistence、billing、
enterprise governance 與完整 collaboration suite。特定客群與商業成果仍需 Product owner
決策。不得以 Fumadocs、GitHub metadata 或 route 推導超出 Context manifest、use case
catalog 與 runtime tests 的行為。
