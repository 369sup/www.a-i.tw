# Wave 0 runtime gap audit

狀態：Historical Wave 0 baseline — verified 2026-07-16

This file is a dated audit snapshot. Current delivery state is owned by
[`completion-matrix.md`](completion-matrix.md); do not use this file as the current portfolio count or resume entry.

## Conclusion

All 20 existing runtime Contexts have a Domain/Application/adapter/composition slice and at least one passing Vitest.
This is not sufficient for this initiative's strict completion standard: none currently has all required test layers
and a direct Playwright flow covering success, validation failure and the principal state transition.

The full Web module suite passed 70 files and 157 tests during this audit. Serena resolved each representative use-case
factory to Context composition, app composition or tests, and reported no diagnostics for the sampled runtime symbols
and `apps/web/src/composition/product-composition.ts`.

## Runtime completion matrix

`P-inline` means the persistence Port is still declared inside the use-case module instead of
`application/ports/outbound`.

| Context                         | Core slice      | Tests present                       | Web flow                               | Direct Playwright | Principal gap                            |
| ------------------------------- | --------------- | ----------------------------------- | -------------------------------------- | ----------------- | ---------------------------------------- |
| `audit-compliance`              | Full core slice | Domain/Application/adapter          | Authenticated audit evidence query     | No                | Direct acceptance                        |
| `community-safety`              | Full core slice | Domain/Application/adapter          | Repository interaction limit           | No                | Direct acceptance                        |
| `discussions`                   | Full core slice | Domain/Application/adapter          | Create/comment/accept answer           | Yes               | Full three-scenario acceptance           |
| `repository-wiki`               | Full core slice | Domain/Application/adapter          | Repository inspector create/read       | Yes               | Broader failure/authorization acceptance |
| `repository-governance`         | Full core slice | Domain/Application/adapter          | Repository lifecycle/access            | Yes               | Full three-scenario acceptance           |
| `work-planning`                 | Full core slice | Domain/Application/adapter          | `/projects` create/add/reload          | Yes               | Broader failure/authorization acceptance |
| `work-tracking`                 | Full core slice | Domain/Application/adapter          | Issue lifecycle                        | Yes               | Complete acceptance                      |
| `app-management`                | Full core slice | Domain/Application/adapter          | `/settings/apps`                       | Yes               | Full three-scenario acceptance           |
| `activity-feed`                 | Full core slice | Domain/Application/adapter          | Recipient-scoped Dashboard feed        | No                | Direct acceptance                        |
| `search-discovery`              | Full core slice | Domain/Application                  | `/search` and product search API       | Yes               | Adapter/contract/architecture coverage   |
| `social-curation`               | Full core slice | Domain/Application/adapter          | Star/unstar                            | Yes               | Full three-scenario acceptance           |
| `subscriptions-notifications`   | Full core slice | Domain/Application                  | Inbox/triage/unsubscribe               | Yes               | Adapter/contract/architecture coverage   |
| `administrative-access-control` | Full core slice | Domain/Application/adapter          | Founding owner assignment              | No                | Direct acceptance                        |
| `policy-governance`             | Full core slice | Domain/Application/adapter          | Enterprise policy settings             | No                | Direct acceptance                        |
| `enterprise-account`            | Full core slice | Domain/Application/adapter/contract | Enterprise settings                    | No                | Direct acceptance                        |
| `organization-account`          | Full core slice | Domain/Application/adapter/contract | Create Organization                    | Yes               | Full three-scenario acceptance           |
| `profile-presence`              | Full core slice | Domain/Application/adapter/contract | Account profile initialization/resolve | No                | Direct acceptance                        |
| `user-account`                  | Full core slice | Domain/Application/adapter/contract | Create Personal Account                | No                | Direct acceptance                        |
| `authentication-security`       | Full core slice | Domain/Application/adapter          | Sign in/session/logout                 | Yes               | Full three-scenario acceptance           |
| `organization-participation`    | Full core slice | Domain/Application/adapter          | Invitation/membership/team             | No                | Direct acceptance                        |

## Cross-cutting gaps

- The four inline persistence-Port gaps identified by the baseline audit are repaired.
- The six Domain-test gaps identified by the baseline audit are repaired.
- Eleven of twenty runtime Contexts now have direct Playwright coverage.
- Sixteen Contexts publish a non-empty V1 contract; only Enterprise Account, Organization Account, Profile Presence
  and User Account currently have contract tests.
- No runtime Context currently has a Context-local `tests/architecture` test.

Focused Serena analysis confirms that `currentDashboard()` already calls `composition.activityFeed.list()` but
exposes only `activityCount`. The prototype has no approved source-Context relationship or producer adapter. A
dashboard control that directly writes an arbitrary Feed Item would turn a recipient projection into user-authored
source truth, so it is not an acceptable Web-gap repair.

## Validation note

`pnpm arch:check` currently stops in the repository baseline topology check because `.agents`, `.codex`, `.github`,
`.semgrep` and `.serena` do not contain the repository-level `README.md` files required by that check. This audit did
not alter those unrelated roots or treat the failure as product-runtime evidence.

Wave 0 focused validation on 2026-07-16:

- Audit Compliance: 3 files, 5 tests passed.
- Activity Feed: 3 files, 4 tests passed.
- Repository Wiki: 4 files, 8 tests passed.
- Work Planning: 4 files, 9 tests passed.
- Work Tracking: 6 files, 22 tests passed.
- Administrative Access Control: 3 files, 6 tests passed.
- Policy Governance: 4 files, 5 tests passed.
- Web typecheck and production build passed.
- The Work Planning and Repository Wiki Playwright flow passed after the production build.
- Semgrep scanned 589 files with zero findings.
