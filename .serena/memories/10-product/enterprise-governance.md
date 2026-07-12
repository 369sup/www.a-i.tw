# Enterprise Governance

Enterprise Governance is an approved Core app-local Context. It owns Enterprise identity, founding owner assignment, Organization affiliation and Repository visibility policy. Enterprise is not a login Actor and cannot own Repository or Project resources. Repository consumes `EnterpriseRepositoryGovernanceApiV1` through its own Port and ACL and retains final authorization ownership. Enterprise Team, Managed User, Billing, Entitlement and Audit remain deferred.

Canonical: `docs/product/enterprise-governance.md`
Runtime: `apps/web/src/modules/enterprise-governance`
ADR: `docs/decisions/0010-enterprise-governance-context.md`