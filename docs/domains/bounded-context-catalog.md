# Bounded Context catalog

狀態：Target / no runtime contexts

| Context           | Purpose                                | Owns                                      | Does not own                          | Lifecycle |
| ----------------- | -------------------------------------- | ----------------------------------------- | ------------------------------------- | --------- |
| Identity & Access | authenticate and attribute Principals  | Principal, credential/session facts       | Account, Repository decisions         | Proposed  |
| Account           | resource ownership and relationships   | Account, namespace, membership, Team      | authentication, Repository policy     | Proposed  |
| Repository        | non-code resource container governance | Repository, visibility, grants, lifecycle | Account roster, credentials, Git/code | Proposed  |

每列成為 runtime Context 前，必須補 owner、first use case、aggregate、ports、contract、ADR 與 `context.json`；在此之前 `context-map.json` 保持空白。
