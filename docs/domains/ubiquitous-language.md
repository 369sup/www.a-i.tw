# Ubiquitous language

狀態：Proposed / pending owner approval

| 中文名稱 | Code Name               | 定義                                           | Owner Context     | 允許同義詞                     | 禁止詞                  |
| -------- | ----------------------- | ---------------------------------------------- | ----------------- | ------------------------------ | ----------------------- |
| 主體     | Principal               | 可被驗證並可提出操作請求的 actor。             | Identity & Access | actor                          | user（泛稱）            |
| 驗證身分 | Authentication Identity | Principal 與一種驗證方法或外部提供者的連結。   | Identity & Access | login identity                 | account                 |
| 存取授與 | Access Grant            | 對 scope 內 capability 的有時效授與。          | Identity & Access | grant                          | permission flag         |
| 帳戶     | Account                 | 擁有資源與命名空間的個人或組織容器。           | Account           | personal account, organization | user（泛稱）            |
| 成員關係 | Membership              | Principal 與 organization Account 的關係事實。 | Account           | membership                     | global role             |
| 命名空間 | Namespace               | Account 所擁有的人類可讀、可路由名稱。         | Account           | handle                         | repository owner string |
| 儲存庫   | Repository              | 由 Account 擁有的受控協作工作空間。            | Repository        | repo                           | folder                  |
| 可見性   | Visibility              | 未具名訪客的基線讀取政策。                     | Repository        | access level                   | authentication status   |

新增 Entity、Value Object、Aggregate、Use Case 或公開 contract 前，必須在本表定義中文名稱、正式 Code Name、定義、Owner Context、允許同義詞、禁止詞與相關概念。
