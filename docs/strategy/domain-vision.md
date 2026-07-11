# Domain vision

狀態：Baseline / reviewed 2026-07-12

本產品將可歸因的 Principal、資源 ownership Account 與協作政策 Repository 分離，
讓 authentication、組織關係與 resource authorization 能獨立演進，而不是折疊成
`user.role`。

目前 in-memory slice 驗證三個問題：誰正在操作、哪個 Account 擁有資源、Repository
是否允許該 action。下一個產品問題是 Principal 如何經 invitation／acceptance 成為
organization member，並讓 Account 發布關係事實而不替 Repository 做授權決策。

Non-goals 包含 Git/code、production credential provider、durable persistence、billing、
enterprise governance 與完整 collaboration suite。特定客群與商業成果仍需 Product owner
決策。不得以 Fumadocs、GitHub metadata 或 route 推導超出 Context manifest、use case
catalog 與 runtime tests 的行為。

## Ordered capability strategy

```text
Membership
→ Team
→ Team-based Repository Access
→ Issue
→ Label and Assignment
→ Discussion
→ Star and Personal Collection
→ Activity and Notification
→ Discovery
→ Contribution Graph
```

每一階段先完成 owner、Ubiquitous Language、Aggregate、Use Case、Ports、Adapters、
contract 與 Context Map，再進入 runtime；後一階段不得把前一階段尚未擁有的事實複製到
自己的 storage 或 UI。
