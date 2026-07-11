# Product model

狀態：Proposed / pending product owner approval

產品的首批策略模型區分三種不可互換的概念：提出操作的 Principal、擁有資源或治理範圍的 Account，以及承載協作政策的 Repository。這項分離使登入、組織歸屬、企業治理與資源授權能各自演進，避免將它們折疊成泛稱的 `User`。

| 概念       | 產品責任                                                   | 不是                         |
| ---------- | ---------------------------------------------------------- | ---------------------------- |
| Principal  | 可驗證且可歸因的操作主體                                   | Account 或資源 owner         |
| Account    | personal、organization、enterprise 的 ownership 或治理容器 | login identity 或 credential |
| Repository | Account 所擁有的受控協作工作空間與 policy boundary         | 檔案系統目錄或 Git adapter   |

Account kind 的精確語意如下：personal Account 可擁有個人資源；organization Account 是多人共享資源與 Team 的容器；enterprise Account 治理多個 organization 的 policy、billing 與 governance scope，但不應因而成為登入身分、Repository Role 或直接資源 owner。此分工以 GitHub 的 user／organization／enterprise account 模型為研究證據，而非功能複製。

這是目標模型，不宣稱目前已有對應 runtime。策略邊界與不變條件由 [`../domains/`](../domains/README.md) 擁有；研究證據與待驗證決策保留於 [`../initiatives/identity-access-v1/`](../initiatives/identity-access-v1/README.md)。
