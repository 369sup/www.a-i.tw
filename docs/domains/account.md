# Account 策略

狀態：Proposed
Context 候選：`account`
Subdomain：Supporting

## 任務

提供資源歸屬與協作的穩定容器。Account 可代表個人或組織，擁有可路由的命名空間及成員關係；它不等於登入者，也不等於 Repository。

## 擁有的模型與不變條件

| 模型            | 說明與不變條件                                                                            |
| --------------- | ----------------------------------------------------------------------------------------- |
| Account         | 穩定 ID、種類（personal / organization）、生命週期與狀態；刪除採明確的關閉／保留政策。    |
| Namespace       | 人類可讀 handle 與唯一性規則；重新命名與保留名稱不應改變 Account ID。                     |
| Membership      | Principal 加入 organization Account 的關係；必有狀態與有效範圍，不能以 profile 欄位取代。 |
| Account Profile | 顯示名稱、描述與其他非安全公開資料；不得包含 credential 或 access secret。                |

## 邊界與公開語言

- Identity & Access 擁有 Principal 與驗證；Account 僅保存 `PrincipalId` 引用，並發佈 membership facts 供授權判定使用。
- Repository 只引用 `AccountId` 作為 owner／namespace；不得複製 organization member 清單或以 path string 推導擁有權。
- Account 不判定 Repository 操作能否執行。它提供成員事實；Identity & Access 結合 scope 與 policy 作出 decision。

## 首批 use case 候選

1. 建立、重新命名、關閉 personal 或 organization Account。
2. 邀請、接受、暫停及移除 organization 成員。
3. 對外查詢可安全揭露的 Account／Namespace。
4. 為 Repository 建立擁有者與 namespace 參照。

## 延後事項

Team、企業帳戶、billing、席次、網域驗證、組織層級 SSO 與跨組織政策均留待有實際產品需求時評估；不可先將其欄位塞入 Account aggregate。
