# Ubiquitous language

狀態：Proposed / pending owner approval

| 中文名稱       | Code Name               | 定義                                                                                                    | Owner Context     | 允許同義詞                     | 禁止詞                              |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------ | ----------------------------------- |
| 主體           | Principal               | 可被驗證並可提出操作請求、可供 audit attribution 的 actor。                                             | Identity & Access | actor                          | user（泛稱）、account               |
| 驗證身分       | Authentication Identity | Principal 與一種驗證方法或外部 provider subject 的 linkage。                                            | Identity & Access | login identity                 | account、credential                 |
| credential     | Credential              | 證明或代理 Principal 的 authentication mechanism；不是 identity、Account 或 resource grant。            | Identity & Access | authentication credential      | token permission、account           |
| 驗證情境       | Authentication Context  | 請求中可安全使用的已驗證 Principal、assurance 與 credential validity facts。                            | Identity & Access | authenticated principal        | repository permission               |
| 帳戶           | Account                 | 擁有資源或治理範圍的 personal、organization、enterprise 容器。                                          | Account           | personal account, organization | user（泛稱）、login                 |
| 企業帳戶       | Enterprise Account      | 治理多個 organization 的 Account kind；不是 Principal、Repository Role 或直接 resource owner。          | Account           | enterprise                     | principal、repository owner         |
| 成員關係       | Membership              | Principal 與 organization Account 的有效關係事實。                                                      | Account           | membership                     | repository role、global role        |
| 團隊           | Team                    | organization Account 內聚合 Membership 的群組；不是 identity 或資源 owner。                             | Account           | group                          | account、repository role            |
| 命名空間       | Namespace               | Account 所擁有的人類可讀、可路由名稱。                                                                  | Account           | handle                         | repository owner string             |
| 儲存庫         | Repository              | 由 Account 擁有的受控協作工作空間與 resource-policy boundary。                                          | Repository        | repo                           | folder、Git adapter                 |
| 儲存庫位址     | Repository Address      | `owner namespace + name` 的可路由名稱；不是 resource identity。                                         | Repository        | path                           | RepositoryId                        |
| 可見性         | Visibility              | Repository discovery 與基線讀取邊界；不是 membership、role 或 authentication state。                    | Repository        | visibility                     | access level、authentication status |
| 儲存庫角色     | Repository Role         | Repository scope 內的 capability bundle。                                                               | Repository        | role                           | organization role、global role      |
| 儲存庫存取授與 | Repository Access Grant | 將 Principal、Team 或基線來源連結至 Repository Role 的資源範圍關係。                                    | Repository        | grant                          | credential、Membership              |
| 有效存取       | Effective Access        | 由 verified principal、relationship fact、Repository role／policy 與 lifecycle 產生的特定 action 結果。 | Repository        | access decision                | login status、single role           |

新增 Entity、Value Object、Aggregate、Use Case 或公開 contract 前，必須在本表定義中文名稱、正式 Code Name、定義、Owner Context、允許同義詞、禁止詞與相關概念。
