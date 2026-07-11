# Business rule and invariant catalog

狀態：Proposed

現有候選不變條件的 canonical detail 在 `identity-and-access.md`、`account.md`、`repository.md`。
正式規則進入本表前必須有 owner、scope、trigger、enforcement point、violation outcome 與驗證。

| Candidate rule                                                              | Owner             | Status   |
| --------------------------------------------------------------------------- | ----------------- | -------- |
| Principal identity is stable and not reused                                 | Identity & Access | Proposed |
| Namespace is unique in its routable scope                                   | Account           | Proposed |
| Enterprise governs organizations but does not become their Repository owner | Account           | Proposed |
| Repository name is unique within owner namespace                            | Repository        | Proposed |
| Archive retains identity and makes resource read-only                       | Repository        | Proposed |
