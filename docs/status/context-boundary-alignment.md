# Context boundary alignment

狀態：Current portfolio summary / manifest and Context Map authority

The physical portfolio contains 37 descriptors. The following 21 non-planned Contexts are mirrored in
`docs/domains/context-map.json`; the remaining 16 descriptors are governance-only planned Contexts.

| Runtime Context                 | Lifecycle | Canonical runtime location                                                                 |
| ------------------------------- | --------- | ------------------------------------------------------------------------------------------ |
| `activity-feed`                 | prototype | `apps/web/src/modules/engagement/social-discovery/activity-feed`                           |
| `administrative-access-control` | approved  | `apps/web/src/modules/platform-governance/access-policy/administrative-access-control`     |
| `app-management`                | approved  | `apps/web/src/modules/ecosystem/apps-marketplace/app-management`                           |
| `audit-compliance`              | prototype | `apps/web/src/modules/business-operations/assurance-support/audit-compliance`              |
| `authentication-security`       | approved  | `apps/web/src/modules/platform-governance/authentication-identity/authentication-security` |
| `community-safety`              | approved  | `apps/web/src/modules/collaboration/community-knowledge/community-safety`                  |
| `discussions`                   | approved  | `apps/web/src/modules/collaboration/community-knowledge/discussions`                       |
| `enterprise-account`            | approved  | `apps/web/src/modules/platform-governance/accounts-profile/enterprise-account`             |
| `network-domain-governance`     | prototype | `apps/web/src/modules/platform-governance/access-policy/network-domain-governance`         |
| `organization-account`          | approved  | `apps/web/src/modules/platform-governance/accounts-profile/organization-account`           |
| `organization-participation`    | approved  | `apps/web/src/modules/platform-governance/participation-teams/organization-participation`  |
| `policy-governance`             | approved  | `apps/web/src/modules/platform-governance/access-policy/policy-governance`                 |
| `profile-presence`              | approved  | `apps/web/src/modules/platform-governance/accounts-profile/profile-presence`               |
| `repository-governance`         | approved  | `apps/web/src/modules/collaboration/repository-work/repository-governance`                 |
| `repository-wiki`               | approved  | `apps/web/src/modules/collaboration/community-knowledge/repository-wiki`                   |
| `search-discovery`              | approved  | `apps/web/src/modules/engagement/social-discovery/search-discovery`                        |
| `social-curation`               | approved  | `apps/web/src/modules/engagement/social-discovery/social-curation`                         |
| `subscriptions-notifications`   | approved  | `apps/web/src/modules/engagement/social-discovery/subscriptions-notifications`             |
| `user-account`                  | approved  | `apps/web/src/modules/platform-governance/accounts-profile/user-account`                   |
| `work-planning`                 | approved  | `apps/web/src/modules/collaboration/repository-work/work-planning`                         |
| `work-tracking`                 | approved  | `apps/web/src/modules/collaboration/repository-work/work-tracking`                         |

Alignment is executable rather than manually inferred: each runtime manifest must equal its Context Map entry, each
relationship must resolve a provider Published Language plus consumer-owned Port and ACL, and topology checks must
preserve the 37-descriptor portfolio invariant while deriving the runtime/planned distribution from manifests.
Historical test or build results belong in dated evidence files and are not restated here as current validation.
