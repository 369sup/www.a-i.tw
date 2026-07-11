# Build, buy, and integrate strategy

狀態：Proposed

| Area                          | Default strategy                                        | Revisit trigger                            |
| ----------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| Authentication mechanisms     | Integrate behind an Identity & Access adapter           | provider、compliance 或 lifecycle 需求改變 |
| Account and repository policy | Build when product owner approves differentiating rules | 規則不再是產品差異化                       |
| External identity governance  | Integrate or separate context                           | SSO、SCIM、enterprise policy 有獨立 owner  |

採購或整合不改變 Context ownership；外部模型必須在 adapter／ACL 翻譯，不能成為 Domain 語言。
