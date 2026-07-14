# Account 策略

狀態：Accepted personal/organization Account baseline

Runtime Context：`account`
Subdomain：Supporting

## 任務

Account 提供資源歸屬、可路由命名空間與多人協作關係的穩定邊界。Account 可以是 `personal`、`organization` 或 `enterprise`。personal Account 可擁有個人資源；organization Account 是共享資源、Membership 與 Team 的容器；enterprise Account 集中治理多個 organization 的 policy、billing 與 governance scope。enterprise 不可登入、不可擁有 credential，也不以自身取代 Repository owner 或 authorization decision。

此模型刻意區分「誰執行動作」和「資源屬於誰」。一個 human Principal 可擁有 personal
Account、加入多個 organization Account，或僅是某個 Repository 的 external collaborator；
這些關係不可折疊為一個 `user.role` 欄位。

## 擁有的模型與不變條件

| 模型               | 說明與不變條件                                                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Account            | 穩定 ID、kind、status 與 lifecycle；rename、transfer 或 profile 修改不得改變 `AccountId`。                                        |
| Namespace          | Account 擁有的人類可讀 handle；同一可路由 scope 內唯一，名稱釋放與保留有明確 policy。                                             |
| Account Profile    | 顯示名稱、描述等非安全資料；不得承載 credential、session secret 或 authorization grant。                                          |
| Membership         | Principal 與 organization Account 的關係事實，具有 invitation／active／suspended／removed 等狀態與時間語意。                      |
| Team               | organization Account 內的成員群組與 maintainer 關係；不是登入 identity、Account 或資源 owner。                                    |
| Enterprise Account | 集中治理多個 organization 的 Account kind；保有 enterprise-to-organization 關係與治理 policy scope，不直接取代 Repository owner。 |

只有 Account 能宣告其 namespace 可用或其 organization membership 有效。Repository 可以引用
`AccountId`，但不可從路徑字串推導 owner、複製 member list，或以自己的 collaborator grant
回寫 Account membership。

`Profile` 是 Account 的可見表示，不是 Account 本身，也不是 authentication state。本次 baseline
擁有 `displayName`、`bio`、`location` 與 `websiteUrl`；修改 Profile 不改變 AccountId、handle、
status、Membership 或任何 Repository permission。

## In scope

- personal／organization／enterprise Account 的建立、rename、suspension、closure 與可保留的歷史 identity。
- Account namespace 的保留、唯一性與安全可揭露的解析。
- organization Membership 的 invitation、acceptance、suspension、removal 與 audit facts。
- Team membership 與 Team maintainer 的群組管理；Team 只發布關係事實。
- Resource context 建立或 transfer 前所需的 owner eligibility／namespace availability contract。

## Explicitly out of scope

- Principal、authentication provider linkage、session、credential、token 與 login recovery。
- Repository identity、visibility、role、direct collaborator、Repository lifecycle 與 repository-specific decision。
- 把 Organization owner 或 Team maintainer 當成跨資源的全域 administrator。
- billing 執行、seat、domain verification、IdP provisioning 與完整 enterprise-wide policy；除非另有已核准的 use case 與 owner。

## Relationships and authorization facts

## Account Context switching

Account 類型分類不是一棵可逐層切換的 Context 樹：

```text
Current Context = Active Actor + Active Scope + Membership + Role + Policy + Entitlement

Active Actor                       Active Scope
└── User account                   ├── Personal scope
    ├── Personal account           ├── Organization scope
    └── Managed user account       └── Enterprise governance scope
```

只有 User account 能成為 Active Actor。Organization 與 Enterprise 不可登入，只能成為
Account／Governance Scope；切換 scope 不改變 action attribution。未來 account switcher
切換已驗證的 User sessions，scope switcher 只切換 scope。Managed user 另受 IdP/SSO、
enterprise lifecycle 與 conditional access 約束。目前 runtime 只有單一 Personal Actor Session
與 Personal/Organization scope selection；multi-session actor switching、Managed user 與
Enterprise scope 仍為 Planned。

Account 發布的是關係事實，不是完整 authorization decision：

```text
Principal --owns--> personal Account
Principal --member_of--> organization Account
Principal --member_of--> Team --within--> organization Account
Enterprise Account --governs--> organization Account
Account --owns_namespace--> Namespace
```

Membership 與 Team membership 不會自動給予任何 Repository action。Repository 將在自己的
scope 中決定某個 active membership／Team 是否導出 role；direct Repository collaborator
也不必成為 organization member。這使 external collaboration 與最小權限可獨立演進。

## Published language 候選

| 名稱                         | 用途                                                     | 不得包含                         |
| ---------------------------- | -------------------------------------------------------- | -------------------------------- |
| `AccountRefV1`               | 資源 owner 的穩定 reference                              | Account profile 或 member list   |
| `NamespaceResolutionV1`      | 將有效 handle 解析為 Account reference                   | lifecycle internals              |
| `MembershipFactV1`           | 已生效／未生效 membership 的最小事實                     | credential、Repository role      |
| `TeamMembershipFactV1`       | Principal 是否屬於某 Team 的最小事實                     | Team 以外的授權推論              |
| `AccountEligibilityV1`       | 建立或承接 Repository 的 eligibility                     | Repository policy                |
| `EnterpriseGovernanceFactV1` | organization 是否受 enterprise governance 約束的最小事實 | billing、IdP roster、完整 policy |

發布方與 consumer 需使用版本化 contracts 和 ACL；在 modular monolith 內的同步呼叫也不能
直接 import Account domain entity 或 persistence model。

## 首批 use case 候選

1. 建立、rename、suspend 或 close personal／organization／enterprise Account。
2. 解析可公開查詢的 Account／Namespace，且不洩漏 non-discoverable Account。
3. 邀請、接受、暫停及移除 organization Membership。
4. 管理 Team 與 Team membership，發布供 resource context 查詢的關係事實。
5. 確認 Account 可作為 Repository owner 或 transfer target。

## 延後與拆分觸發條件

enterprise policy、billing、seat、verified domain、SCIM 與 IdP group synchronization 目前只定義 ownership 邊界，不是已核准 feature。當 enterprise policy 有獨立的治理 owner、compliance 責任或 lifecycle 時，才應從 Account 拆出 Enterprise Governance Context；拆分前仍由 Account 發布最小 relationship facts。

## 參考與非目標

本策略採用 GitHub 對 user、organization 與 enterprise account 具有不同 ownership 和 governance 語意的分離方式，但不複製其方案、功能限制或 UI。參考：[Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)。
