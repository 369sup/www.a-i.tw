# Repository 策略

狀態：Proposed
Context 候選：`repository`
Subdomain：Core candidate

## 任務

管理受控協作工作空間的生命週期、可見性與 Repository 範圍的協作政策。Repository 是 Account 命名空間下的資源，而非檔案系統目錄或 Git adapter 的同義詞。

## 擁有的模型與不變條件

| 模型                 | 說明與不變條件                                                                      |
| -------------------- | ----------------------------------------------------------------------------------- |
| Repository           | 穩定 ID、owner `AccountId`、名稱、狀態與生命週期；路徑改變不能作為主識別。          |
| Repository Name      | 在同一 owner namespace 內唯一；保留名稱與重新命名是本 context 的規則。              |
| Visibility           | `private`、`internal`、`public` 的值物件；其含義須映射為可審計的基線讀取政策。      |
| Collaboration Policy | Repository 範圍的 roles、邀請或例外規則；只宣告需求，不自行驗證 Principal。         |
| Transfer             | Repository 在兩個 Account 間移轉的受控流程；必須維持 Repository ID 並重新評估政策。 |

## 邊界與公開語言

- Account 是唯一的 owner／namespace 來源。建立或移轉前，透過 Account contract 驗證 `AccountId` 的可用性。
- Identity & Access 是唯一的 access decision 來源。Repository 提供資源 scope、visibility 與 collaboration policy 作為 decision input，不保存 token、session 或全域 user role。
- Git、檔案儲存、搜尋與 webhook 均為後續 Infrastructure adapter；它們不可反過來定義 Repository domain model。

## 首批 use case 候選

1. 在指定 Account namespace 建立、重新命名、封存與復原 Repository。
2. 設定 Visibility 與 Repository 範圍的協作者政策。
3. 在核准的兩個 Account 間移轉 Repository。
4. 查詢 Repository metadata，並以 access decision 保護內容或管理操作。

## 延後事項

Git refs、commit、branch protection、issue、pull request、actions、packages、fork 與 archive 格式均為獨立能力候選。未經 ADR 不得把它們視為 Repository aggregate 的欄位或集合。
