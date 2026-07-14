# Product strategy

本目錄定義產品要解決的問題、能力邊界與非目標；它不宣告 runtime module 或公開 API。

產品直接採用 GitHub 非 Code Published Language；排除 Git、Pull Request、Actions、Code Search、
程式碼安全與部署等 Code 能力。官方導覽、capability family、governance boundary、control plane
與 Bounded Context 必須分開，不能依文件選單建立模組。

策略真實來源與落地順序：

- 詞彙與 Context ownership：[`../domains/`](../domains/README.md)
- Context 關係與 ACL：[`../domains/context-map.md`](../domains/context-map.md)
- capability 與取捨：本目錄及 [`../strategy/`](../strategy/)
- runtime module、contract 與資料設計：只在核准首個 use case 後建立。

長期產品願景、模型、能力與 roadmap 的 owner。仍在探索或有明確結束條件的工作，放在 [`../initiatives/`](../initiatives/)。

- [`product-model.md`](product-model.md)：首批策略模型與其已知邊界。
- [`github-non-code-semantic-model.md`](github-non-code-semantic-model.md)：GitHub 官方非 Code 概念、唯一 owner、分類、關係、排除與待驗證 inventory。
- [`capabilities.md`](capabilities.md)：候選能力與非目標。
- [`account-and-profile-presence.md`](account-and-profile-presence.md)：Account、Profile 與 Presence。
- [`social-graph.md`](social-graph.md)：Follow、Star、Watch 等關係區分。
- [`projects.md`](projects.md)：Project ownership、items、fields、views 與 access。
- [`discussions-community.md`](discussions-community.md)：Discussions、Community 與 Wiki。
- [`repository-wiki.md`](repository-wiki.md)：Knowledge Wiki 首個核准垂直切片、語言與邊界。
- [`community-safety.md`](community-safety.md)：Community Safety 首個 Interaction Limit 垂直切片、語言與邊界。
- [`apps-marketplace.md`](apps-marketplace.md)：App、Installation、Authorization 與 Marketplace。
- [`billing-cost-management.md`](billing-cost-management.md)：Billing、Budget、Cost center 與 Usage。
- [`sponsorship.md`](sponsorship.md)：Sponsor、Sponsorship、Tier、Goal 與 Payout。
- [`audit-compliance.md`](audit-compliance.md)：Audit、Compliance 與 assurance。
- [`trust-safety-support.md`](trust-safety-support.md)：Trust、Safety、Support 與 qualification programs。
- [`client-experience.md`](client-experience.md)：Web、Mobile、Dashboard 與 navigation surfaces。
