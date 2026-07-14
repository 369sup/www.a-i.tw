# Build, buy, and integrate strategy

狀態：Proposed

| Area                             | Default strategy                                                             | Revisit trigger                                                         |
| -------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Authentication mechanisms        | Integrate behind an Identity & Access adapter                                | provider、compliance 或 lifecycle 需求改變                              |
| Account and repository policy    | Build when product owner approves differentiating rules                      | 規則不再是產品差異化                                                    |
| Enterprise governance mechanisms | Integrate or build behind Account ports; preserve local ownership vocabulary | enterprise policy, billing or compliance gains an independent lifecycle |
| External identity governance     | Integrate or separate context                                                | SSO、SCIM、enterprise policy 有獨立 owner                               |

採購或整合不改變 Context ownership；外部模型必須在 adapter／ACL 翻譯，不能成為 Domain 語言。GitHub 的 enterprise／organization 階層是邊界研究，不是本產品 schema 或 API 的來源。
