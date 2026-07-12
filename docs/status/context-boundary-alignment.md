# Context boundary alignment

狀態：Current / aligned on 2026-07-12

| Context           | Manifest owner    | Runtime location                       | Public language               | Composition          | Alignment |
| ----------------- | ----------------- | -------------------------------------- | ----------------------------- | -------------------- | --------- |
| Identity & Access | Product Team      | `apps/web/src/modules/identity-access` | Principal/session facts       | product workspace    | Aligned   |
| Account           | Product Team      | `apps/web/src/modules/account`         | Account/Membership/Team facts | product workspace    | Aligned   |
| Repository        | Product Team      | `apps/web/src/modules/repository`      | Repository/access facts       | product workspace    | Aligned   |
| Work Management   | Product Team      | `apps/web/src/modules/work-management` | no downstream contract v1     | product workspace    | Aligned   |
| Master Template   | Architecture Team | `apps/web/src/modules/master-template` | none cross-context            | master-template root | Aligned   |
| Sub Template      | Architecture Team | declared internal subdomain            | internal only                 | Master Template      | Aligned   |

Evidence: Context Map equality, topology gate, cross-context checker,
dependency-cruiser, architecture fixtures, Account/Repository tests and production build. Browser E2E remains pending.
