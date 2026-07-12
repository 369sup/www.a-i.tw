# Bounded Context Map

Identity & Access, Account, Enterprise Governance, Repository, Issues and Projects are approved app-local product Contexts. Discussions, Notifications, Search, Activity Feed and Audit remain prototypes. Master Template is an architecture fixture outside the product Context Map.

Current Enterprise edges:
- Account -> Enterprise Governance via `AccountDirectoryApiV1`, consumer `OrganizationDirectory` and `OrganizationDirectoryAdapter`.
- Enterprise Governance -> Repository via `EnterpriseRepositoryGovernanceApiV1`, consumer `EnterpriseRepositoryGovernance` and `EnterpriseRepositoryGovernanceAdapter`.
- Enterprise policy only constrains capability; Repository owns final decisions.

Canonical sources:
- `docs/domains/context-map.json`
- `docs/domains/context-map.md`
- `apps/web/src/modules/*/context.json`

Last verified: 2026-07-12 with manifest equality, cross-context checks and architecture gates.