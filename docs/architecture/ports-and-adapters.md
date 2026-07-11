# Ports and adapters

狀態：Accepted baseline

Ports and Adapters 將 application core 與外部技術分開。Inbound adapter（Next.js route、Server
Action、CLI、batch 或 test harness）把 delivery protocol 轉成 Application use case；outbound
adapter（database、queue、HTTP client、clock 或 identity provider）實作 Application 所定義的
outbound Port。Port 描述需要或提供的業務能力，不得以 Prisma、Supabase、Vercel 或第三方 SDK
命名。

Domain 擁有不變條件與 business policy，不能知道 adapter 或 transport。Application 擁有 use
case、input/result mapping 與 Port；Infrastructure 只能實作 outbound Port 並轉換外部模型。
composition root 是唯一組裝 concrete adapter 的位置，且不得把它 re-export 給 Domain、Application
或 Client Component。

Organization Membership 遵循同一規則：Account Application 定義 Membership 與 Invitation
store Ports，Domain 定義邀請、接受、移除不變條件，Infrastructure 實作 process-local
in-memory adapters，workspace Server Actions 只映射 transport，product workspace composition
root 負責接線。Repository 不得 import Account internals，只能經 consumer-owned ACL Port
消費 `MembershipFactV1`。

`master-template` 已用 in-memory adapter 作為可測試的 reference Context；它證明 port wiring，
不代表 production persistence 或已發佈的跨 Context contract。建立 production integration 前仍須
完成 Context owner、資料分類、契約與相容性決策。

## Sources

- [Cockburn: Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture)
- [Microsoft: DDD-oriented service layers](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)
