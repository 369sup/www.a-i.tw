# Context dependency policy

狀態：Accepted baseline

Contexts communicate through published language, contracts, events or application ports. In-process calls do not permit
internal imports. Each downstream Context owns its ACL and translation; each upstream Context owns its public contract.
No cross-context ORM model, table ownership, foreign-key invariant or distributed transaction is approved.
