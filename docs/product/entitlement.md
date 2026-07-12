# Entitlement

狀態：Accepted research baseline / runtime not approved

除正式命名的 **Support Entitlement** 外，`Entitlement` 是本產品分析用的有效使用資格，不是
GitHub 公開的一個統一頂層物件。

```text
Effective Product Eligibility
= Plan availability
∩ active Subscription
∩ License / Seat assignment when required
∩ Membership
∩ Product enablement
∩ Policy compliance
∩ Account status
```

Entitlement 與 resource Authorization 不同：前者回答「方案／授權是否提供功能」，後者回答
「Actor 是否可對這個 Resource 執行 Action」。Role、Permission、License、Seat、Quota、Usage
都只是不同輸入，不得直接改名為 Entitlement。

Support Entitlement 是 GitHub 正式產品關係：Enterprise owners 與 billing managers 自動具有，
Enterprise owner 可授予有限 enterprise members，使其能管理該 Enterprise 的 support tickets。

本 repository 尚未核准 Commercial／Entitlement owner、contract 或 runtime。

官方來源：

- <https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-users-in-your-enterprise/managing-support-entitlements-for-your-enterprise>
- <https://docs.github.com/en/billing/managing-billing-for-your-products/about-billing-for-github-accounts>
