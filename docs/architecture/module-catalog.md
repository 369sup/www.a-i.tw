# Module catalog

狀態：Current / app-local bounded contexts

`identity-access`, `account`, `enterprise-governance`, `repository`, `issues` and `projects` are approved app-local
product Contexts under `apps/web/src/modules`. `master-template` is an architecture fixture registered
outside the product Context Map. Concrete adapters are composed only in
`apps/web/src/server/composition`. Identity & Access publishes Principal facts;
Account publishes Account, Membership and Team membership facts; Repository consumes those
contracts through Context-owned Ports and owns resource authorization.
Issues consumes Identity and Repository contracts through its own ACL and owns work lifecycle.
Projects consumes Account and Issues contracts through its own ACL and owns planning items only.
Enterprise Governance consumes Organization eligibility from Account; Repository consumes Enterprise constraints
through its own ACL and retains final authorization ownership.

When a module is approved, add package name, Context, owner, public exports, runtime location, persistence owner,
composition root and verification evidence here.
