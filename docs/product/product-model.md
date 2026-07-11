# Product model

狀態：Accepted in-memory product baseline / production scope proposed

產品的首批策略模型區分三種不可互換的概念：提出操作的 Principal、擁有資源或治理範圍的 Account，以及承載協作政策的 Repository。這項分離使登入、組織歸屬、企業治理與資源授權能各自演進，避免將它們折疊成泛稱的 `User`。

| 概念       | 產品責任                                                   | 不是                         |
| ---------- | ---------------------------------------------------------- | ---------------------------- |
| Principal  | 可驗證且可歸因的操作主體                                   | Account 或資源 owner         |
| Account    | personal、organization、enterprise 的 ownership 或治理容器 | login identity 或 credential |
| Repository | Account 所擁有的受控協作工作空間與 policy boundary         | 檔案系統目錄或 Git adapter   |

Account kind 的精確語意如下：personal Account 可擁有個人資源；organization Account 是多人共享資源與 Team 的容器；enterprise Account 治理多個 organization 的 policy、billing 與 governance scope，但不應因而成為登入身分、Repository Role 或直接資源 owner。此分工以 GitHub 的 user／organization／enterprise account 模型為研究證據，而非功能複製。

Principal、personal／organization Account 與 non-code Repository governance 已有
in-memory runtime baseline。Enterprise governance、production provider、durable
persistence 與完整 membership 仍是 Proposed。策略邊界與不變條件由
[`../domains/`](../domains/README.md) 擁有。

下一個核准的語意切片是 organization Membership：owner 發出有期限 Invitation，只有受邀
Principal 能接受並形成 active Membership；移除後關係失效。Account 只發布版本化
`MembershipFactV1`，Repository 仍自行判定 resource action。後續依序為 Team、Team-based
Repository Access、Issue、Label／Assignment、Discussion、Star／Collection、
Activity／Notification、Discovery 與 Contribution Graph。
