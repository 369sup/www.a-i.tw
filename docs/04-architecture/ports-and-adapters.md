# Ports and adapters

狀態：Target baseline

Port 由需要能力的 Application/Domain 一側定義，Adapter 在 Infrastructure 實作並負責外部模型轉換。Port 必須描述業務能力，不得以 Prisma、Supabase、Vercel 或第三方 SDK 命名。

目前尚未宣告 production port；新增前需先完成 bounded context owner 與 public contract。
