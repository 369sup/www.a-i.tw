# Module catalog

狀態：Current / app-local bounded contexts

`master-template`, `identity-access`, `account` and `repository` are app-local
Contexts under `apps/web/src/modules`. Concrete adapters are composed only in
`apps/web/src/server/composition`. Identity & Access publishes Principal facts;
Account publishes Account and membership facts; Repository consumes those
contracts through Context-owned Ports and owns resource authorization.

When a module is approved, add package name, Context, owner, public exports, runtime location, persistence owner,
composition root and verification evidence here.
