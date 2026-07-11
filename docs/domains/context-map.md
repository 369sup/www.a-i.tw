# Domain context map

狀態：Target / pending relationships

目前專案尚處於初始化階段，尚未宣告 runtime bounded context。未來每個 context 必須在此列出：目的、owner language、資料 owner、公開 contract、上游/下游與 anti-corruption layer。

## 初始策略

- `Product`：產品問題、需求與驗收語意。
- `Identity & Access`：Principal、authentication identity、credential／session state 與 authentication context（尚未實作）。
- `Account`：個人／組織帳戶、命名空間、membership 與 Team relationship（尚未實作）。
- `Repository`：受控工作空間、visibility、repository role／grant、resource decision 與 lifecycle（尚未實作）。
- `Experience`：Next.js route、shadcn UI 與 view model（presentation owner）。
- `Platform`：部署、可觀測性與交付工具（operations owner）。

### 策略關係

```text
Identity & Access ──Published Language: AuthenticatedPrincipalV1──> Repository
Account ──Published Language: MembershipFactV1 / TeamMembershipFactV1──> Repository
Account ──Published Language: AccountEligibilityV1 / AccountRefV1──> Repository
Repository ──Published Language: RepositoryAccessDecisionV1──> Experience / application use cases
```

| Upstream          | Downstream | Pattern                                                        | Contract / ACL owner                                                      | Consistency and failure semantics                                                                                                                  |
| ----------------- | ---------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity & Access | Repository | Open Host Service + Published Language; Repository owns an ACL | Identity & Access owns authentication facts; Repository owns translation  | synchronous in-process call is permitted after approval; unavailable／invalid context denies mutation safely and is not a Repository role decision |
| Account           | Repository | Customer/Supplier + Published Language; Repository owns an ACL | Account owns relationship／eligibility facts; Repository owns translation | membership／Team changes may require projection freshness policy; stale or unavailable facts must not become implicit grants                       |
| Repository        | Experience | Open Host Service + Published Language                         | Repository owns access-decision contract                                  | UI is an inbound adapter; it cannot reimplement role or visibility checks                                                                          |

`Identity & Access` does not return a `repository:*` decision. `Account` does not return a
Repository Role. `Repository` evaluates its resource-scoped decision from the facts it consumes.
No Shared Kernel, cross-context entity import, shared ORM model or cross-context transaction is
approved for these candidates.

以上是規劃中的 strategic map，不是 runtime 實作證明；新增 context 前必須補 ADR、application contract 與 owner。機器可驗證的 runtime Context Map 位於 [`context-map.json`](context-map.json)，目前為空，直到第一個已核准的 bounded context 透過 generator 建立為止。

新增關係時必須指定 Customer/Supplier、Conformist、ACL、Open Host Service、Published Language、Shared Kernel、Partnership 或 Separate Ways，並記錄契約 owner、版本與失敗處理。
