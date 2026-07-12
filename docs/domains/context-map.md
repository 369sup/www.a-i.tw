# Domain context map

狀態：Current / approved in-memory vertical slice

Identity & Access、Account 與 Repository 已核准為 runtime bounded contexts，owner 均為 `www.a-i.tw Product Team`。第一階段以同步、in-process published language 與 context-owned ACL 協作；in-memory adapters 是明確的示範交付限制，不宣稱 production durability。

## Strategic Context Map

此 Map 有六個策略節點：Product（問題與驗收）、Identity & Access（可歸因驗證）、Account（personal／organization ownership 與 relationship）、Repository（資源範圍決策）、Experience（inbound presentation）及 Platform（運行能力）。前三個產品 Context 已獲核准並登錄 runtime `context-map.json`；Experience 與 Platform 仍是 app 與 operations owner，不建模為產品 Context。

Enterprise 是 Account Context 的治理類型：它關聯並治理多個 organization；不登入、不承載 credential、不直接授與 Repository action。

世界模型中的 Identity、Authorization、Policy、Capability、Event、Notification、Search、Audit
與 Integration 是橫切責任分類，不自動構成新的 Context 或中央服務。實際 fact、decision、event
與 projection 必須回到其 owning／consuming Context；完整規則見
[`../product/platform-world-model.md`](../product/platform-world-model.md)。

## 初始策略

- `Product`：產品問題、需求與驗收語意。
- `Identity & Access`：已實作 in-memory Principal 與 session baseline；production credential/provider 延後。
- `Account`：已實作 personal／organization Account、namespace、Membership 與 Team lifecycle；enterprise governance 延後。
- `Repository`：已實作 visibility、direct/Team role grant、access decision 與 archive lifecycle；Git/code 排除。
- `Experience`：Next.js route、shadcn UI 與 view model（presentation owner）。
- `Platform`：部署、可觀測性與交付工具（operations owner）。

### 策略關係

```text
Identity & Access ──PrincipalRefV1 / AuthenticatedPrincipalV1──> Account
Identity & Access ──AuthenticatedPrincipalV1──> Repository
Account ──Published Language: MembershipFactV1 / TeamMembershipFactV1──> Repository
Account ──Published Language: AccountEligibilityV1 / AccountRefV1──> Repository
Repository ──Published Language: RepositoryAccessDecisionV1──> Experience / application use cases
Repository ──RepositoryCollaborationScopeV1 / RepositoryParticipationDecisionV1──> Issues ACL
Identity & Access ──PrincipalRefV1──> Issues
```

| Upstream          | Downstream | Pattern                                                        | Contract / ACL owner                                                                | Consistency and failure semantics                                                                                                                  |
| ----------------- | ---------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity & Access | Account    | Open Host Service + Published Language                         | Identity & Access owns minimal principal facts; Account owns membership translation | invalid or unavailable authentication facts cannot create or activate a relationship                                                               |
| Identity & Access | Repository | Open Host Service + Published Language; Repository owns an ACL | Identity & Access owns authentication facts; Repository owns translation            | synchronous in-process call is permitted after approval; unavailable／invalid context denies mutation safely and is not a Repository role decision |
| Account           | Repository | Customer/Supplier + Published Language; Repository owns an ACL | Account owns relationship／eligibility facts; Repository owns translation           | membership／Team changes may require projection freshness policy; stale or unavailable facts must not become implicit grants                       |
| Repository        | Experience | Open Host Service + Published Language                         | Repository owns access-decision contract                                            | UI is an inbound adapter; it cannot reimplement role or visibility checks                                                                          |

`Identity & Access` does not return a `repository:*` decision. `Account` does not return a
Repository Role. `Repository` evaluates its resource-scoped decision from the facts it consumes.
No Shared Kernel, cross-context entity import, shared ORM model or cross-context transaction is
approved for these candidates.

Strategic relationship 由本文件擁有；runtime existence 由
[`context-map.json`](context-map.json)、各 Context manifest、imports 與 tests 共同證明。
新增 Context 或 internal subdomain 前必須完成 architecture standard 的 Definition of Ready。

新增關係時必須指定 Customer/Supplier、Conformist、ACL、Open Host Service、Published Language、Shared Kernel、Partnership 或 Separate Ways，並記錄契約 owner、版本與失敗處理。

## Issues relationship

`Issues` 擁有 Issue、Label 與 Assignment，並作為 Repository 的 downstream。
關係是 Repository Open Host Service + Published Language，Issues 擁有 ACL；
它只消費穩定 Repository reference/scope/access decision，不 import Repository internals。
此 edge 由 ADR 0005 與版本化 contract 核准；runtime manifest 由 scaffold gate 登錄。
