# Use case catalog

狀態：Current / approved first vertical slice

| Context            | Candidate use cases                                                        | Approval condition                                     |
| ------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| Identity & Access  | select demo Principal; authenticate; revoke session                        | an active Principal is required for mutation           |
| Account            | create personal/organization Account; resolve by handle                    | normalized unique handle and active owner              |
| Account Membership | invite, accept and remove organization Membership                          | owner invites/removes; invitee accepts before expiry   |
| Account Team       | create Team; add and remove active organization members                    | organization owner manages Team membership             |
| Repository         | create/list/get/rename/archive; manage visibility and grants               | valid owner, unique owner/name and access decision     |
| Work Management    | create/list/close/reopen Issue; create/apply/remove Label; assign/unassign | Repository participation decision and scope invariants |

第一階段使用 in-memory adapters，讓上述流程可由產品 UX 完整操作。Repository direct/Team grants
共用 Repository policy；Account 不發布 Repository Role。Repository transfer、enterprise governance、
production credential 與持久化延後；UI 不得自行重做授權或 invariant。
