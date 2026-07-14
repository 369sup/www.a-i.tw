# Context boundary alignment

狀態：Current / aligned on 2026-07-14

| Context                    | Manifest owner | Runtime location                                                                           | Public language                  | Composition         | Alignment |
| -------------------------- | -------------- | ------------------------------------------------------------------------------------------ | -------------------------------- | ------------------- | --------- |
| Authentication Security    | Product Team   | `apps/web/src/modules/platform-governance/authentication-identity/authentication-security` | Principal/session facts          | product composition | Aligned   |
| User Account               | Product Team   | `apps/web/src/modules/platform-governance/accounts-profile/user-account`                   | Personal Account facts           | product composition | Aligned   |
| Profile & Presence         | Product Team   | `apps/web/src/modules/platform-governance/accounts-profile/profile-presence`               | Account Profile facts            | product composition | Aligned   |
| Organization Account       | Product Team   | `apps/web/src/modules/platform-governance/accounts-profile/organization-account`           | Organization identity facts      | product composition | Aligned   |
| Organization Participation | Product Team   | `apps/web/src/modules/platform-governance/participation-teams/organization-participation`  | Membership/Invitation/Team facts | product composition | Aligned   |
| Repository                 | Product Team   | `apps/web/src/modules/collaboration/repository-work/repository`                            | Repository/access facts          | product composition | Aligned   |
| Issues                     | Product Team   | `apps/web/src/modules/collaboration/repository-work/issues`                                | no downstream contract v1        | product composition | Aligned   |
| Social Curation            | Product Team   | `apps/web/src/modules/engagement/social-discovery/social-curation`                         | Repository Star facts            | product composition | Aligned   |

Evidence: Context Map equality, topology gate, cross-context checker,
dependency-cruiser, architecture fixtures, Account/Repository tests and production build. Browser E2E remains pending.
