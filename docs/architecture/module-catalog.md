# Module catalog

狀態：Current / app-local bounded contexts / 2026-07-14

The physical portfolio contains 37 Bounded Context directories: 20 runtime and 17 planned. Only runtime Contexts enter
`docs/domains/context-map.json`; planned descriptors publish no API and own no runtime.

Runtime ownership is:

- Accounts and access: `user-account`, `organization-account`, `enterprise-account`, `profile-presence`,
  `authentication-security`, `organization-participation`, `administrative-access-control`, `policy-governance`.
- Collaboration: `repository-governance`, `work-tracking`, `work-planning`, `discussions`, `community-safety`,
  `repository-wiki`.
- Engagement and ecosystem: `social-curation`, `subscriptions-notifications`, `activity-feed`, `search-discovery`,
  `app-management`.
- Assurance: `audit-compliance`.

Concrete adapters are composed only in `apps/web/src/composition`. A Context may consume a peer only through its own
outbound Port and integration adapter targeting the provider's versioned Published Language. The migration history and
18-source-to-37-target mapping are owned by `context-relocation-map.json`.
