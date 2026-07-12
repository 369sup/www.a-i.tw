# GitHub 官方非程式碼研究路由

狀態：Current research routing

## 目的

GitHub Docs 是 GitHub 產品語意研究的第一級外部證據。已由官方文件清楚定義的名詞、功能、狀態與限制，
不在本專案重新發明；研究時應先萃取並標註官方來源，再映射到本專案的 Ubiquitous Language、Bounded
Context 與 use case。

本文件只負責來源路由與研究方法，不擁有 `Enterprise`、`Entitlement`、`Notification`、`Search` 或其他
產品領域的定義。各語意仍由各自 canonical owner 文件管理。

## 研究邊界

### 納入

- Identity、Account、Profile、Dashboard 與 account lifecycle。
- Organization、Enterprise、Membership、Team、Role、Policy、Audit 與治理關係。
- Repository 的 ownership、namespace、visibility、access、collaboration、feature configuration 與 lifecycle。
- Issue、Discussion、Project 的非程式碼工作、對話、規劃與協作語意。
- Search、Notification、Subscription、Entitlement、Billing、License、Cost center、App governance 與 moderation。

### 排除

- Git、Commit、Branch、Tag、Merge、Pull Request、Diff 與 Code Review。
- Source code 的瀏覽、編輯、儲存、搜尋與導覽，包括 Code Search。
- GitHub Actions、workflow、runner、Packages、Codespaces 與 Git LFS。
- 以程式碼、dependency 或 build artifact 為核心的 security scanning。

若同一官方章節同時包含納入與排除內容，只萃取非程式碼段落，不因頁面位於可接受目錄就整頁納入。

## 官方來源路由

| 官方入口 | 優先萃取 | 明確排除 | 對應本地 owner |
| --- | --- | --- | --- |
| [Get started](https://docs.github.com/en/get-started) | account types、access permissions、plans、profile setup、Follow、Star、communication、Command Palette | Git 入門、程式開發與 code examples | `product-model.md`、`ubiquitous-language.md` |
| [Account and profile](https://docs.github.com/en/account-and-profile) | Account、Profile、Personal dashboard、privacy、contribution projection、organization membership、lifecycle | commit email 與 commit attribution mechanics | Account、Identity 與 `profile-surface.md` |
| [Authentication](https://docs.github.com/en/authentication) | sign-in、credential、Session、account switching、2FA、Passkey、device verification、sudo mode、recovery、security log、SSO authorization | Git transport、SSH／deploy-key mechanics、CLI 與 Actions authentication | Identity & Access product research |
| [Repositories](https://docs.github.com/en/repositories) | ownership、access、visibility、collaborators、topics、README、feature toggles、transfer、archive、delete、activity、Issue／Discussion／Project 關聯 | branches、merges、files、source code、Git LFS、Actions、code security | Repository owner 文件 |
| [Discussions](https://docs.github.com/en/discussions) | forum、category、Q&A、answer、announcement、participation、management、moderation、insights、forms | 與程式碼變更綁定的延伸內容 | Discussion product research |
| [Communities](https://docs.github.com/en/communities) | community presentation、code of conduct、moderation、blocking、reporting、interaction limits、conversation locking、safety | contributor coding workflow、commit／PR-specific details | Community、Moderation product research |
| [Organizations](https://docs.github.com/en/organizations) | shared account、membership、roles、teams、resource access、App governance、security、audit、billing | Actions 與 code-security implementation | Account、Enterprise governance、governance taxonomy |
| [Enterprise onboarding](https://docs.github.com/en/enterprise-cloud@latest/enterprise-onboarding) | enterprise setup、organizations、enterprise teams、users、roles、identity、licensing | repository code migration mechanics | `enterprise-governance.md`、`entitlement.md` |
| [Enterprise administration](https://docs.github.com/en/enterprise-cloud@latest/admin) | policy、identity federation、managed users、roles、billing、license、cost center、audit、Apps、organization governance | Actions、runner、code-security administration | `enterprise-governance.md`、`entitlement.md` |
| [Billing and licensing](https://docs.github.com/en/billing) | plan、subscription、billing cycle、license、seat、usage、budget、alert、cost center、payment、invoice、role、report | Actions、Codespaces、Packages、LFS 與 code-security product consumption details | Billing、Entitlement product research |
| [Subscriptions and notifications](https://docs.github.com/en/subscriptions-and-notifications) | Subscription、Watch、Participating、Mention、reason、delivery preference、Inbox、read/unread、Saved、Done、filter、retention | PR、release、Actions 與 code-security-specific payloads | `notification.md` |
| [Issues](https://docs.github.com/en/issues) | lifecycle、types、labels、milestones、assignment、sub-issues、dependencies、templates、forms、comments | Pull Request-specific behavior | Work Management product research |
| [Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects) | User／Organization ownership、items、fields、views、roadmap、iteration、workflow、insights、access、templates | Pull Request-specific item semantics | Planning product research |
| [Search GitHub](https://docs.github.com/en/search-github) | integrated search、scope、query、qualifier、ranking、results、navigation、access-aware visibility | Code Search 與 code navigation | `search.md` |
| [Using GitHub Apps](https://docs.github.com/en/apps/using-github-apps) | App identity、installation、authorization、requested permissions、resource selection、approval、suspension、revocation | App implementation、API authentication 與 source code | Integration、Authorization product research |
| [OAuth apps](https://docs.github.com/en/apps/oauth-apps) | user authorization、scope、organization access、authorized-app review、revocation、ownership lifecycle | OAuth implementation、API calls、token-request code | Integration、Authorization product research |
| [Webhooks](https://docs.github.com/en/webhooks) | event subscription、installation boundary、delivery、event type、resource scope、retry／delivery observability | payload implementation、endpoint code、API examples | Event、Integration product research |
| [GitHub Marketplace](https://docs.github.com/en/apps/github-marketplace) | listing、publisher、plan、purchase、trial、billing、cancellation、App discovery | App implementation and API mechanics | Marketplace、Commercial product research |
| [GitHub Sponsors](https://docs.github.com/en/sponsors) | sponsored account、sponsor、tier、goal、payment、payout、fiscal host、privacy | sponsorship API and webhook implementation | Sponsorship、Commercial product research |
| [GitHub Support](https://docs.github.com/en/support) | support scope、ticket、priority、entitlement、contact、diagnostic sharing、case lifecycle | troubleshooting tied exclusively to code execution | Support、`entitlement.md` |
| [Site policy](https://docs.github.com/en/site-policy) | Terms、privacy、acceptable use、community guidelines、content removal、appeal、trademark、legal request | legal text as a substitute for local domain rules | Compliance and policy research only |

## 研究流程

```text
研究問題
  -> 選擇一個官方入口
  -> 只開啟相關子頁
  -> 記錄官方名詞、行為、限制與 URL
  -> 分類為 Entity / Value / Relationship / Policy / Projection / Use Case
  -> 對照 runtime evidence 與 Context Map
  -> 只更新一個 canonical owner 文件
```

每筆研究至少記錄：

```text
Official term
Official behavior
Boundary or limitation
Source URL
Local interpretation
Local owner
Runtime status: Current | Proposed | External reference only
```

官方文件可以證明 GitHub 的公開產品行為，但不能單獨證明本專案 runtime 已實作。只有 current runtime、tests、
manifest 或其他直接證據能把本地狀態標為 `Current`。

## 使用規則

1. 優先重用官方語意並以自己的文字摘要，不大量複製官方文案。
2. 官方導覽階層只是研究入口，不直接等於本專案 Domain hierarchy 或 ownership。
3. 一個研究問題只更新其語意 owner；不得把多個領域塞入同一份 convenience document。
4. `Search`、`Filter`、`Navigation`、`Audit query` 分別研究；`Subscription`、`Notification`、`Inbox state` 也分別研究。
5. GitHub Docs 內容或路徑可能演進；重大語意決策前重新查證相關官方子頁與版本。

