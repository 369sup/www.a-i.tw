# Architecture debt register

狀態：Current / reviewed 2026-07-12

| ID     | Debt                                          | Owner                     | Guard                            | Exit condition                          | Status              |
| ------ | --------------------------------------------- | ------------------------- | -------------------------------- | --------------------------------------- | ------------------- |
| AD-001 | Product state is process-local in-memory      | Platform + Context owners | Ports isolate adapters           | approved durable store + contract tests | Open                |
| AD-002 | Authentication is demo Principal selection    | Identity & Access         | no credential secrets persisted  | approved provider and assurance         | Open                |
| AD-003 | Action failures need structured form feedback | Experience                | explicit domain errors           | accessible action-state tests           | Open                |
| AD-004 | Domain/integration events are absent          | Architecture              | event catalog says none-approved | evidenced async workflow                | Accepted limitation |

Debt requires owner, current guard, runtime impact and measurable removal condition.
