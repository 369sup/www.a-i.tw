# Identity & Access 策略

狀態：Accepted mock Login and browser Session baseline

Runtime Context：`authentication-security`
Subdomain：Generic authentication；Supporting identity and credential policy

命名決策：Context 使用 `authentication-security`，因其負責 Principal identity、credential
verification 與 Session authentication state；`access` 容易暗示 resource authorization，該責任仍由
Repository 等資源 Context 擁有。

## 任務

Identity & Access 負責辨識可提出請求的 **Principal**，驗證其登入或工作負載
credential，管理可撤銷的 authentication state，並提供可驗證的 principal 與
authentication context。它回答「誰在請求」與「此 credential 是否可代表該主體」，
不擁有 Account、Repository 或任何資源範圍的業務授權規則。Identity & Access 可向 Account 提供最小 `PrincipalRefV1` 與 authentication eligibility；它不能建立 Account、Membership、Team 或 enterprise governance relationship。

這個切分避免將 `User` 同時當作人、登入帳號、組織、資源 owner、token 與
repository role；那些概念有不同的生命週期、audit attribution 與撤銷條件。

## 擁有的模型與不變條件

| 模型                    | 說明與不變條件                                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Principal               | 穩定、不可重用的可歸因 actor；`human` 與 `workload` 是主體種類，不是 Account 種類。                                                     |
| Authentication Identity | Principal 與本地或外部 authentication provider subject 的 linkage；同一 provider subject 不得同時連結兩個有效 Principal。               |
| Credential              | 證明或代理 Principal 的 credential metadata、狀態、到期與撤銷資訊；絕不把 secret、private key 或 token plaintext 放入 domain contract。 |
| Session                 | 具有效期、驗證強度、撤銷狀態與 audit correlation 的 authentication state；不承載 Account profile 或 resource grant。                    |
| Authentication Context  | 一次請求可安全使用的 Principal reference、authentication method、credential state 與必要 assurance claims。                             |

`PrincipalId` 在停用後仍是歷史 audit 的有效 reference；停用會阻止新的
authentication，不能改寫既有 attribution。Credential 是 authentication mechanism，
不是獨立的 Account 或資源權限來源。

## Login 到 Personal Dashboard 語意路徑

```text
Unauthenticated Visitor → Access → Authentication → Security Verification
→ Authenticated Session → Identity Resolution → Active Account Context
→ Membership / Access Context → Personalization Context → Personal Dashboard
```

本次 runtime 實作 Password mock credential verification、opaque browser Session、Identity
Resolution 與 console access gate。Passkey、Social login、Enterprise SSO、2FA、device
verification 與 IdP policy 都是 Planned，不得宣稱 Current。Profile 是 Account 的呈現旁支，
不是 Login 到 Dashboard 的必經語意。

## Principal and Session semantic reconstruction slice

狀態：Current verified

Problem: the existing browser cookie expires after eight hours, while the in-memory server Session has no owned
identity, expiry or lifecycle and therefore remains resolvable indefinitely. Stable Principal identity/status and
Session identity/expiry are also represented by unvalidated strings.

Actor: an unauthenticated visitor presenting a credential, or an authenticated browser presenting an opaque Session
token.

Business outcome: credential verification resolves an active Principal and authentication method, creates a distinct
Domain Session with an eight-hour expiry, and returns an opaque adapter token plus expiry to the browser adapter. Session
resolution rejects expired or revoked Sessions. Logout revokes the Domain Session and the browser adapter removes its
cookie.

| Value Object              | Owner                     | Invariant / meaning                                                                |
| ------------------------- | ------------------------- | ---------------------------------------------------------------------------------- |
| `PrincipalId`             | Identity & Authentication | stable, non-empty attribution identity; never derived from Account or login handle |
| `PrincipalKind`           | Identity & Authentication | closed actor vocabulary: `human` or `workload`; not an Account kind                |
| `PrincipalStatus`         | Identity & Authentication | `active` or `disabled`; disabled blocks new authentication                         |
| `AuthenticationMethod`    | Identity & Authentication | credential mechanism used for the Session; current slice supports `password`       |
| `AuthenticationAssurance` | Identity & Authentication | authentication confidence vocabulary; current demo adapter publishes `mock`        |
| `SessionId`               | Identity & Authentication | stable internal Session identity, distinct from the opaque browser token           |
| `SessionStatus`           | Identity & Authentication | `active`, `revoked` or `expired`; terminal states cannot become active             |
| `SessionExpiry`           | Identity & Authentication | exactly eight hours after authentication in the current browser Session policy     |

The eight-hour duration preserves the existing runtime behavior previously expressed only as the Next.js cookie
`maxAge`. It is a local product invariant, not a claim about GitHub's private implementation. Browser tokens and cookie
flags remain Application/Adapter concerns and are never published in `contracts/v1`.

Success means invalid Principal/Session identity cannot enter the Domain, persistence seeds reconstruct through Domain
factories, expired Sessions fail closed even if the browser still presents a token, revocation is a Domain transition,
and the cookie expiration is mapped from the Application result instead of independently re-declaring lifecycle policy.

Out of scope: Federation/provisioning, provider subject linkage, SSO, 2FA, passkeys, device verification, recovery,
production credential storage, durable persistence and multi-session Actor switching.

## In scope

- human、service 或 automation Principal 的建立、停用與可歸因識別。
- passwordless、federated provider、API credential 或後續 workload identity 的 adapter-neutral linkage。
- session／credential 的發行、驗證、到期、撤銷與最低必要 audit metadata。
- 對 inbound adapter 發布最小 `AuthenticatedPrincipal`，讓 application use case 取得經驗證的 actor。
- 對 resource context 提供 principal state 與 authentication constraints，例如 principal 是否 active、credential 是否有效、是否滿足指定 assurance。

## Explicitly out of scope

- personal、organization 或 enterprise Account 的 profile、namespace、ownership、membership、Team 與 billing。
- Repository visibility、role、direct grant、team grant、policy、lifecycle 或 resource decision。
- 將「已登入」誤當成「可操作某項資源」的 authorization。
- 密碼、token、private key、provider refresh secret 的序列化、公開 contract 或 log。
- SAML/OIDC/SCIM provider-specific schema；它們只能由 infrastructure adapter 翻譯為本 context 的語言。

## Authorization boundary

Authentication 與 authorization 必須分開：

```text
Identity & Access: authenticate Principal and validate credential context
Account:           establish personal/organization/enterprise ownership and publish membership / Team relationship facts
Repository:        evaluate repository-scoped action against roles, grants and policy
```

Repository 的 application layer 可向 Identity & Access 查詢 authentication context，並向
Account 查詢已發布的關係事實；它必須自行擁有 `repository:*` action 的 allow/deny
decision 及其 reason code。Identity & Access 不可讀取 Repository internal storage，也
不可維護通用的 `repository-admin` 字串角色。

概念上的有效存取為：

```text
Allowed(principal, credential, action, repository) =
  PrincipalActive
  ∧ CredentialValid
  ∧ AuthenticationConstraintSatisfied
  ∧ RepositoryVisibilityAndGrantPermit
  ∧ RepositoryPolicyPermits
```

前半段由 Identity & Access 提供事實；後半段由 Repository 擁有。這是 target
responsibility model，不是目前 runtime 行為。

## Published language 候選

在 context 核准並建立 `contracts` entrypoint 前，只能視為設計草案：

| 名稱                          | 用途                            | 不得包含                              |
| ----------------------------- | ------------------------------- | ------------------------------------- |
| `PrincipalRefV1`              | 跨 context 指向 actor           | profile、provider subject、credential |
| `AuthenticatedPrincipalV1`    | inbound use case 的已驗證 actor | session secret、token、raw claims     |
| `PrincipalStatusV1`           | active／suspended 等可授權事實  | provider-specific failure detail      |
| `AuthenticationRequirementV1` | resource 請求的最低驗證需求     | resource role 或 grant                |

契約 owner、版本、錯誤與資料分類須在建立第一個 runtime context 時補入
[`../contracts/`](../contracts/README.md)，不得從本文件直接產生 API。

## 首批 use case 候選

1. 註冊、連結或解除 Authentication Identity。
2. 驗證 credential，建立、更新與撤銷 Session。
3. 停用 Principal，拒絕其後續 authentication，同時保留 audit attribution。
4. 向已核准的 resource application port 回覆最小 authentication context。

## 延後與拆分觸發條件

MFA、passkey、delegation、break-glass access、SCIM provisioning、enterprise SSO、完整
audit export 與 policy DSL 都不屬於首切片。當 workforce lifecycle、IdP group sync、
enterprise-wide policy 或 compliance retention 有獨立 owner、語言與變更節奏時，應評估
拆出 Identity Governance context，而不是擴張此 context 去管理 Account 或 Repository。

## 參考與非目標

本策略借鑑 GitHub 將可登入 user account、organization／enterprise account 與 app
installation identity 分開處理的產品語意；它不重製 GitHub 的帳戶類型、token 格式或 API。
GitHub 對帳戶分類與 app authentication 的說明是研究證據，不是本產品的規格：
[Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)、
[About authentication with a GitHub App](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app)。
