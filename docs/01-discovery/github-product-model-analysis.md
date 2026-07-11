# GitHub 產品模型分析：首批策略領域

日期：2026-07-11
狀態：Proposed / 尚待產品 owner 核准

## 目的與範圍

本文件以 GitHub 的公開產品語言作為研究參考，萃取可移植的產品模型；它不是 GitHub API、資料庫或 UI 的規格。首個策略切面只涵蓋 Identity & Access、Account 與 Repository，刻意不處理 Issue、Pull Request、Git、Actions、Package、Billing 或通知。

要驗證的產品假設是：協作型產品需要清楚分開「誰正在互動」、「以誰的名義擁有資源」以及「哪個受控工作空間承載協作」。若三者共用一個 `User` 模型，組織、轉移、外部登入與最小權限的演進會互相牽制。

## 參考模型與可採用的概念

| 參考概念                        | 本產品語言               | 策略意義                                                       |
| ------------------------------- | ------------------------ | -------------------------------------------------------------- |
| authenticated user              | Principal（主體）        | 可被驗證、可建立 session、可被授權的行為者；不等於帳戶擁有者。 |
| personal account / organization | Account（帳戶）          | 資源的可命名擁有者與協作容器；可代表個人或組織。               |
| repository                      | Repository（儲存庫）     | 由一個帳戶命名空間擁有的受控工作空間。                         |
| membership / role / team        | Access Grant（存取授與） | 將主體在某一資源範圍內可做的事明確化，避免散落的布林欄位。     |
| public / private visibility     | Visibility（可見性）     | 對未具名訪客的基線讀取政策；不是登入狀態。                     |

## 邊界假設

- Identity & Access 只辨識與授權 Principal，不擁有帳戶的公開資料、命名空間或 Repository。
- Account 擁有個人／組織帳戶及其成員關係；它不保存密碼、第三方 token 或 session。
- Repository 擁有儲存庫生命週期、可見性與 Repository 範圍的政策；它只以穩定 ID 指向擁有帳戶與 Principal，絕不複製其資料。
- 任何跨領域的讀取均走 published contract 或 application port。初期可在單體內同步呼叫；一旦需非同步投影或外部 IdP，再以 adapter／event 演進，不能倒置依賴。

## 尚待驗證的決策

1. Repository 是否為產品的核心差異化能力；若不是，應降為 supporting subdomain。
2. 組織內的 Team、企業層級政策與 SSO 是否屬於 Account 的後續切片，或另立 Organization Governance context。
3. 授權評估是否需要政策引擎；初期以可審計的 capability 與 grant 模型為優先，不預先引入通用 policy DSL。
4. 本產品是否需要匿名可見性。若不需要，Visibility 仍保留為未來相容的值物件，但第一版只允許 private。

## 成功訊號

- 可說明任一操作是由哪個 Principal 執行、以哪個 Account 為作用範圍、針對哪個 Repository，以及根據哪個 grant／policy 被允許或拒絕。
- 帳戶轉移、外部登入方式新增、Repository 協作者與可見性演進時，不必搬移或共用其他 context 的內部資料表。

後續策略與邊界見 [`../domains/README.md`](../domains/README.md)。
