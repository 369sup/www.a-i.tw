# Context boundary alignment

狀態：Current / aligned on 2026-07-12

| Context           | Manifest owner    | Runtime location                       | Public language          | Composition          | Alignment |
| ----------------- | ----------------- | -------------------------------------- | ------------------------ | -------------------- | --------- |
| Identity & Access | Product Team      | `apps/web/src/modules/identity-access` | Principal/session facts  | product workspace    | Aligned   |
| Account           | Product Team      | `apps/web/src/modules/account`         | Account/membership facts | product workspace    | Aligned   |
| Repository        | Product Team      | `apps/web/src/modules/repository`      | Repository/access facts  | product workspace    | Aligned   |
| Master Template   | Architecture Team | `apps/web/src/modules/master-template` | none cross-context       | master-template root | Aligned   |
| Sub Template      | Architecture Team | declared internal subdomain            | internal only            | Master Template      | Aligned   |

Evidence: Context Map equality, topology gate, cross-context checker,
dependency-cruiser, architecture fixtures and E2E.
