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
in-memory adapters，repository-console Server Actions 只映射 transport，product composition
root 負責接線。Repository 不得 import Account internals，只能經 consumer-owned ACL Port
消費 `MembershipFactV1` and `TeamMembershipFactV1`。

Team 遵循相同邊界：Account Domain 擁有 Team name 與 roster invariants；Account Application
擁有 Team use cases 與 `TeamStore`；in-memory Team adapter 位於 Account Infrastructure。
現有 Repository runtime 擁有 `AccountDirectory` consumer Port；Repository Infrastructure 的
`AccountDirectoryAdapter` 消費 Account Published Language 並映射最小 Team facts。現有 Repository Domain 的 Team
grant、Repository Role 與 effective-access decision 是待遷移的 compatibility implementation；目標由
Authorization & Policy 透過自己的 consumer Port 與 outbound integration adapter 消費 Account／Repository
Published Language。Issues 仍透過自身 `RepositoryParticipation` Port 與 outbound ACL adapter 取得 authoritative
decision，不得讀取任何 owner 的 internal grant graph。

## Sources

- [Cockburn: Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture)
- [Microsoft: DDD-oriented service layers](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)
