# Bounded Context catalog

狀態：Current / approved runtime Contexts

| Context           | Purpose                                | Owns                                      | Does not own                          | Lifecycle         |
| ----------------- | -------------------------------------- | ----------------------------------------- | ------------------------------------- | ----------------- |
| Identity & Access | authenticate and attribute Principals  | Principal and in-memory session facts     | Account, Repository decisions         | Approved          |
| Account           | resource ownership and relationships   | Account, namespace, Membership and Team   | authentication, Repository policy     | Approved          |
| Repository        | non-code resource container governance | Repository, visibility, grants, lifecycle | Account roster, credentials, Git/code | Approved          |
| Issues   | repository-scoped work tracking        | Issue, Label, Assignment                  | Repository grants, Account roster     | Current in-memory |

三個 Context 的 owner 均為 `www.a-i.tw Product Team`。enterprise 暫屬 Account Context，但不進入第一階段 runtime scope。核准範圍與公開語言見 ADR 0003。

`master-template` 是例外：它是 app-local reference Context，已登錄於 Context Map，用來
驗證 Domain-Driven Modular Monolith 與 Hexagonal Architecture 的邊界；它不是本表的產品
候選 Context。
