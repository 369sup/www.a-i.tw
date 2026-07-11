# Product strategy

本目錄定義產品要解決的問題、能力邊界與非目標；它不宣告 runtime module 或公開 API。

首批模型以 GitHub 的使用語意為研究參考：人以 Principal 身分操作；personal、organization 與 enterprise Account 承擔不同的 ownership／governance 責任；Repository 是由 Account 治理的協作資源邊界。產品不複製 GitHub 的方案、限制或 code-hosting 功能。

策略真實來源與落地順序：

- 詞彙與 Context ownership：[`../domains/`](../domains/README.md)
- Context 關係與 ACL：[`../domains/context-map.md`](../domains/context-map.md)
- capability 與取捨：本目錄及 [`../strategy/`](../strategy/)
- runtime module、contract 與資料設計：只在核准首個 use case 後建立。

長期產品願景、模型、能力與 roadmap 的 owner。仍在探索或有明確結束條件的工作，放在 [`../initiatives/`](../initiatives/)。

- [`product-model.md`](product-model.md)：首批策略模型與其已知邊界。
- [`capabilities.md`](capabilities.md)：候選能力與非目標。
