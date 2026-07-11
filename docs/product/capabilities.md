# Capabilities

狀態：Proposed / pending product owner approval

首批候選能力如下；它們是產品探索範圍，尚非已承諾功能或公開 API。

| Capability                        | 目的                                                                         | 長期 owner        |
| --------------------------------- | ---------------------------------------------------------------------------- | ----------------- |
| Identity and authentication       | 辨識 Principal 與驗證 credential                                             | Identity & Access |
| Account ownership and governance  | 管理 personal／organization／enterprise Account、namespace、成員與 Team 關係 | Account           |
| Repository collaboration boundary | 管理 Repository lifecycle、visibility、grant 與資源政策                      | Repository        |

enterprise policy、billing 與 organization governance 僅是 Account 的策略範圍，尚非已承諾功能；若其 lifecycle、compliance 或 owner 獨立，必須拆為 Enterprise Governance Context。

Git data、commits、branches、pull requests、Actions、packages、billing 執行與通知不在首批範圍。新增能力前，必須先確認 owner、use case、boundary 與公開 contract。
