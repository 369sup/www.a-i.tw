# Use case catalog

狀態：Current / approved first vertical slice

| Context            | Candidate use cases                                          | Approval condition                                   |
| ------------------ | ------------------------------------------------------------ | ---------------------------------------------------- |
| Identity & Access  | select demo Principal; authenticate; revoke session          | an active Principal is required for mutation         |
| Account            | create personal/organization Account; resolve by handle      | normalized unique handle and active owner            |
| Account Membership | invite, accept and remove organization Membership            | owner invites/removes; invitee accepts before expiry |
| Repository         | create/list/get/rename/archive; manage visibility and grants | valid owner, unique owner/name and access decision   |

第一階段使用 in-memory adapters，讓上述流程可由產品 UX 完整操作。Repository transfer、Team、enterprise governance、production credential 與持久化延後；UI 不得自行重做授權或 invariant。
