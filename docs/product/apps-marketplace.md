# Apps, Integrations and Marketplace

狀態：App Registry first slice Current / remaining ecosystem Research

| Language             | Meaning                                                                  |
| -------------------- | ------------------------------------------------------------------------ |
| GitHub App           | Independent machine principal and maximum permission envelope            |
| Installation         | App × target Account × selected Resources × granted permissions          |
| Installation request | Request for an Account owner to approve installation                     |
| User authorization   | User delegation allowing an App to act for the User                      |
| OAuth App            | User-delegated client identity without GitHub App installation semantics |
| Marketplace listing  | Discoverable commercial presentation of an App                           |
| Marketplace plan     | Free, trial or paid commercial offer                                     |

SDK, JWT, token generation, API and webhook implementation are excluded. Installation is a delegated
authorization boundary, not the App identity itself.

## App Registry first slice

GitHub 官方允許在 Personal Account、使用者擁有的 Organization，或已授予完整 App 管理權的 Organization 下註冊
GitHub App。App Registration 與 Installation、User Authorization、Webhook Delivery、Marketplace Listing 是不同
生命週期；本地第一個 slice 只核准 Personal Account owner 的 Registration：

> Authenticated Personal Account owner creates a private GitHub App registration with a unique name, required homepage
> URL and optional callback URL, then lists registrations owned by that account from the app settings experience.

### Approved owner and source of truth

- Bounded Context：`ecosystem/apps-marketplace/app-management`。
- Strategic Subdomain：`app-registration`；Supporting。
- Source of truth：`GitHubAppRegistration`。
- App Registry owns registration identity、owner reference、display name、description、homepage URL、callback URL and
  private/public availability envelope.
- Account & Profile remains authoritative for the active Personal Account owner. App Management consumes only its
  versioned Published Language through a consumer-owned Port and ACL.
- App name is normalized for comparison, limited to 34 characters and unique among local App Registrations. The broader
  GitHub rule preventing collision with other Account names requires an Account Namespace availability contract and is
  explicitly deferred rather than inferred from local persistence.

### First-slice exclusions

- Organization or Enterprise registration and App Manager delegation.
- Requested permissions、event subscriptions、webhook settings and secret material.
- Installation、Repository selection、User Authorization、OAuth App Authorization and access tokens.
- Public distribution、Marketplace listing、pricing、purchase and billing.
- Transfer、suspension、deletion and registration update lifecycle.

The first UX is `/settings/apps`: an authenticated owner can submit the registration form and immediately see owned
registrations. The route is an inbound presentation adapter; it owns no App or Account truth and revalidates only after
the Application use case succeeds.

Official evidence:

- [Registering a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)
- [About using GitHub Apps](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps)
