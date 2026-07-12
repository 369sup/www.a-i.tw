# Ubiquitous language

狀態：Baseline / Context-owned

| 中文名稱       | Code Name               | 定義                                                                                                    | Owner Context     | 允許同義詞                     | 禁止詞                              |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------ | ----------------------------------- |
| 主體           | Principal               | 可被驗證並可提出操作請求、可供 audit attribution 的 actor。                                             | Identity & Access | actor                          | user（泛稱）、account               |
| 驗證身分       | Authentication Identity | Principal 與一種驗證方法或外部 provider subject 的 linkage。                                            | Identity & Access | login identity                 | account、credential                 |
| credential     | Credential              | 證明或代理 Principal 的 authentication mechanism；不是 identity、Account 或 resource grant。            | Identity & Access | authentication credential      | token permission、account           |
| 驗證情境       | Authentication Context  | 請求中可安全使用的已驗證 Principal、assurance 與 credential validity facts。                            | Identity & Access | authenticated principal        | repository permission               |
| 帳戶           | Account                 | 擁有資源或治理範圍的 personal、organization、enterprise 容器。                                          | Account           | personal account, organization | user（泛稱）、login                 |
| 企業帳戶       | Enterprise Account      | 治理多個 organization 的 Account kind；不是 Principal、Repository Role 或直接 resource owner。          | Account           | enterprise                     | principal、repository owner         |
| 成員邀請       | Membership Invitation   | organization owner 對 Principal 提議建立 Membership 的有期限流程；尚不是有效成員關係。                  | Account           | invitation                     | membership、repository grant        |
| 成員關係       | Membership              | Principal 接受有效 Invitation 後與 organization Account 形成的 active／removed 關係事實。               | Account           | membership                     | repository role、global role        |
| 團隊           | Team                    | organization Account 內聚合 Membership 的群組；不是 identity 或資源 owner。                             | Account           | group                          | account、repository role            |
| 團隊成員事實   | Team Membership Fact    | Account 對特定 Principal 發布的最小 Team 關係集合；不攜帶 Repository Role。                             | Account           | team fact                      | repository grant、role              |
| 命名空間       | Namespace               | Account 所擁有的人類可讀、可路由名稱。                                                                  | Account           | handle                         | repository owner string             |
| 儲存庫         | Repository              | 由 Account 擁有的受控協作工作空間與 resource-policy boundary。                                          | Repository        | repo                           | folder、Git adapter                 |
| 儲存庫位址     | Repository Address      | `owner namespace + name` 的可路由名稱；不是 resource identity。                                         | Repository        | path                           | RepositoryId                        |
| 可見性         | Visibility              | Repository discovery 與基線讀取邊界；不是 membership、role 或 authentication state。                    | Repository        | visibility                     | access level、authentication status |
| 儲存庫角色     | Repository Role         | Repository scope 內的 capability bundle。                                                               | Repository        | role                           | organization role、global role      |
| 儲存庫存取授與 | Repository Access Grant | 將 Principal、Team 或基線來源連結至 Repository Role 的資源範圍關係。                                    | Repository        | grant                          | credential、Membership              |
| 有效存取       | Effective Access        | 由 verified principal、relationship fact、Repository role／policy 與 lifecycle 產生的特定 action 結果。 | Repository        | access decision                | login status、single role           |
| 工作項目       | Issue                   | Repository scope 內具有穩定 identity、number 與 open/closed lifecycle 的可追蹤工作。                    | Work Management   | work item                      | Git issue、ticket row               |
| 工作編號       | Issue Number            | 單一 Repository scope 內單調配置的人類可讀序號；不是 Issue identity。                                   | Work Management   | issue number                   | IssueId、array index                |
| 分類標籤       | Label                   | Repository scope 內名稱唯一的工作分類；不代表 status 或 permission。                                    | Work Management   | classification                 | role、status、free tag              |
| 責任指派       | Assignment              | Issue 與 eligible Principal 之間可撤銷的工作責任關係。                                                  | Work Management   | assignee relationship          | membership、repository grant        |
| 負責人         | Assignee                | 持有 active Assignment 的 Principal；authentication 本身不構成 eligibility。                            | Work Management   | responsible principal          | owner、member                       |

新增 Entity、Value Object、Aggregate、Use Case 或公開 contract 前，必須在本表定義中文名稱、正式 Code Name、定義、Owner Context、允許同義詞、禁止詞與相關概念。

下一批 `Issue`、`Issue Number`、`Label`、`Assignment` 與 `Assignee` 仍是 Proposed，完整定義位於
[`../initiatives/work-management-v1/README.md`](../initiatives/work-management-v1/README.md)；
G2/G3 核准前不得由 runtime import 或視為 Current language。
