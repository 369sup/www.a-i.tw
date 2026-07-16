# Enterprise Account

Context `enterprise-account`; core subdomain; owner www.a-i.tw Product Team.

Problem: Own Enterprise Account identity, lifecycle, and Organization affiliations without owning Organization resources, administrative roles, or policy constraints.

## First approved use case

Create an Enterprise Account and affiliate one active Organization Account.

- Success: persist Enterprise identity and an affiliation fact with its timestamp.
- Failures: invalid Enterprise identity/name, missing or inactive Organization, missing Enterprise, or an Organization
  already affiliated with another Enterprise.
- Idempotency: affiliating the same Organization with the same Enterprise is a no-op.
- Source of truth: `Enterprise` and `EnterpriseOrganizationAffiliation`.

Enterprise Accounts govern Organizations but do not directly own their repositories or projects. Administrative roles
belong to `administrative-access-control`; enforceable constraints belong to `policy-governance`.
