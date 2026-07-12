# GitHub control-plane research evidence

日期：2026-07-12

## Scope

以 GitHub 官方文件驗證 Account、Enterprise／Organization teams、Repository／Project、Cost
center、Support Entitlement、Notification／Subscription 與 Search 語意；排除 Git、source code、
Commit、Branch、Pull Request、Actions 與 Code Search。

## Method

- 使用 Context7 `/github/docs` 查詢 GitHub Docs source repository。
- 對 Context7 未完整命中的 Enterprise team、Notification 與 Search，以 `docs.github.com` 官方頁面
  進行窄查證。
- 對話內容只作為研究問題，不作為 canonical evidence。

## Accepted findings

1. GitHub 官方主要 Account types 是 User、Organization、Enterprise。
2. Enterprise team 與 Organization team 的成員範圍、管理邊界、delegation capability 不同。
3. Project 是 User／Organization-owned resource，不是 Repository child；Repository 只連結 Project。
4. Cost center 是財務歸屬與預算邊界，可引用 Users、Repositories、Organizations、Enterprise teams，
   但不授予 resource access。
5. 一般 `Entitlement` 是分析用 effective eligibility；Support Entitlement 才是 GitHub 明確命名的
   enterprise support-ticket relationship。
6. Subscription 是持續關係；Notification 是 event match 的結果；Read／Saved／Done 是 inbox triage，
   Done 不會取消 Subscription。
7. Search、Filter、Navigation、Audit query 是不同能力；Search 必須 access-aware 且不授權。
8. GitHub 沒有官方「治理容器固定數量」。八項只能作為跨四類 boundary 的分析盤點。

## Documents updated

- `AGENTS.md`
- `.codex/AGENTS.md`
- `.agents/skills/repo-explore-first/SKILL.md`
- `docs/product/platform-world-model.md`
- `docs/product/enterprise-governance.md`
- `docs/product/entitlement.md`
- `docs/product/notification.md`
- `docs/product/search.md`
- `docs/product/governance-boundary-taxonomy.md`
- `docs/product/product-model.md`
- `docs/domains/ubiquitous-language.md`
- `docs/ai-index.md`
- `docs/architecture-document-catalog.md`
- `apps/web/content/docs/architecture/platform-world-model.mdx`
- `apps/web/content/docs/architecture/enterprise-governance.mdx`
- `apps/web/content/docs/architecture/entitlement.mdx`
- `apps/web/content/docs/architecture/notification.mdx`
- `apps/web/content/docs/architecture/search.mdx`
- `apps/web/content/docs/architecture/governance-boundaries.mdx`

## Official sources

- <https://github.com/github/docs/blob/main/content/get-started/learning-about-github/types-of-github-accounts.md>
- <https://github.com/github/docs/blob/main/content/admin/concepts/enterprise-fundamentals/enterprise-accounts.md>
- <https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/enterprise-fundamentals/teams-in-an-enterprise>
- <https://docs.github.com/en/enterprise-cloud@latest/organizations/organizing-members-into-teams/about-teams>
- <https://github.com/github/docs/blob/main/content/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project.md>
- <https://github.com/github/docs/blob/main/content/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/disabling-projects-in-a-repository.md>
- <https://docs.github.com/en/billing/concepts/cost-centers>
- <https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-users-in-your-enterprise/managing-support-entitlements-for-your-enterprise>
- <https://docs.github.com/en/subscriptions-and-notifications/how-tos/viewing-and-triaging-notifications/managing-notifications-from-your-inbox>
- <https://docs.github.com/en/subscriptions-and-notifications/how-tos/managing-subscriptions-for-activity-on-github/managing-your-subscriptions>
- <https://docs.github.com/en/search-github/getting-started-with-searching-on-github/about-searching-on-github>
