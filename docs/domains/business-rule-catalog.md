# Business rule and invariant catalog

狀態：Current baseline / extensions proposed

| Rule                                                      | Owner                    | Enforcement            | Evidence                  | Status   |
| --------------------------------------------------------- | ------------------------ | ---------------------- | ------------------------- | -------- |
| Disabled Principal cannot authenticate                    | Identity & Access        | Domain policy          | identity service test     | Current  |
| Account handle is normalized and unique                   | Account                  | Domain + Application   | Account test              | Current  |
| Membership is organization-only and invitation-based      | Account                  | Domain + Application   | membership service tests  | Current  |
| Owner invites/removes; only invitee accepts before expiry | Account                  | Domain + Application   | membership service tests  | Current  |
| Only active owner Account may create Repository           | Account + Repository ACL | Repository Application | product E2E               | Current  |
| Repository name is unique in owner namespace              | Repository               | Domain + Application   | service behavior          | Current  |
| Archived Repository rejects mutation except unarchive     | Repository               | authorization + Domain | test + E2E                | Current  |
| Owner is not stored as collaborator grant                 | Repository               | authorization policy   | Repository test           | Current  |
| Enterprise does not become Repository owner               | Account                  | not implemented        | product decision required | Proposed |

新增規則必須記錄 owner、scope、trigger、enforcement point、violation outcome 與 test。
