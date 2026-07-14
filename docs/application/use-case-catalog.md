# Use case catalog

狀態：Current / approved first vertical slice

| Context               | Candidate use cases                                                         | Approval condition                                                 |
| --------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Identity & Access     | Login with credential; resolve opaque browser Session; Logout               | valid credential and active Principal                              |
| Account               | create/resolve Account; resolve/update Profile                              | normalized unique handle; Profile belongs to Account               |
| Account Membership    | invite, accept and remove organization Membership                           | owner invites/removes; invitee accepts before expiry               |
| Account Team          | create Team; add and remove active organization Memberships                 | organization owner manages Team membership; Owner role is eligible |
| Enterprise Governance | create Enterprise; affiliate Organization; set Repository visibility policy | Enterprise owner; active Organization; single affiliation          |
| Repository            | create/list/get/rename/archive; manage visibility and grants                | valid owner, unique owner/name and access decision                 |
| Issues                | create/list/close/reopen Issue; create/apply/remove Label; assign/unassign  | Repository participation decision and scope invariants             |
| Experience Context    | resolve RequestContext and registered Capability for one Repository action  | authenticated Actor; server-resolved resource; owner decision      |
| App Management        | register and list a Personal Account owner's private GitHub Apps            | authenticated active Personal Account owner; unique valid App name |

第一階段使用 in-memory adapters，讓上述流程可由產品 UX 完整操作。Repository direct/Team grants
共用 Repository policy；Account 不發布 Repository Role。Repository transfer、Enterprise Team、
production credential 與持久化延後；UI 不得自行重做授權或 invariant。

正式流程為 `Access → Authentication → Security Verification → Session → Identity Resolution →
Active Account → Membership/Access → Personalization → Personal Dashboard`。此切片只把 Password
mock、Session、Identity Resolution 與既有 Account/Access 組合標記 Current。
