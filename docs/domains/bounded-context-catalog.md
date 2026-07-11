# Bounded Context catalog

狀態：Target product contexts; one app-local reference Context exists

| Context           | Purpose                                | Owns                                      | Does not own                          | Lifecycle |
| ----------------- | -------------------------------------- | ----------------------------------------- | ------------------------------------- | --------- |
| Identity & Access | authenticate and attribute Principals  | Principal, credential/session facts       | Account, Repository decisions         | Proposed  |
| Account           | resource ownership and relationships   | Account, namespace, membership, Team      | authentication, Repository policy     | Proposed  |
| Repository        | non-code resource container governance | Repository, visibility, grants, lifecycle | Account roster, credentials, Git/code | Proposed  |

每列成為 runtime Context 前，必須補 owner、first use case、aggregate、ports、contract、ADR 與 `context.json`；在此之前不得加入 Context Map。

`master-template` 是例外：它是 app-local reference Context，已登錄於 Context Map，用來
驗證 Domain-Driven Modular Monolith 與 Hexagonal Architecture 的邊界；它不是本表的產品
候選 Context。
