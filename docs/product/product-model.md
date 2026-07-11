# Product model

狀態：Proposed / pending product owner approval

產品的首批策略模型區分三種不可互換的概念：提出操作的 Principal、擁有資源與命名空間的 Account，以及承載協作政策的 Repository。這項分離使登入、組織歸屬與資源授權能各自演進，避免將它們折疊成泛稱的 `User`。

| 概念       | 產品責任                                           | 不是                         |
| ---------- | -------------------------------------------------- | ---------------------------- |
| Principal  | 可驗證且可歸因的操作主體                           | Account 或資源 owner         |
| Account    | 個人或組織的資源 owner 與 namespace 容器           | login identity 或 credential |
| Repository | Account 所擁有的受控協作工作空間與 policy boundary | 檔案系統目錄或 Git adapter   |

這是目標模型，不宣稱目前已有對應 runtime。策略邊界與不變條件由 [`../domains/`](../domains/README.md) 擁有；研究證據與待驗證決策保留於 [`../initiatives/identity-access-v1/`](../initiatives/identity-access-v1/README.md)。
