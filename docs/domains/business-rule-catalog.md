# Business rule and invariant catalog

狀態：Current baseline / extensions proposed

| Rule                                                                                          | Owner                       | Enforcement                   | Evidence                  | Status   |
| --------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------- | ------------------------- | -------- |
| Disabled Principal cannot authenticate                                                        | Identity & Access           | Domain policy                 | identity service test     | Current  |
| Login requires a valid credential resolving an active Principal                               | Identity & Access           | Application + Domain          | identity service tests    | Current  |
| Browser session identifier is opaque and revocable                                            | Identity & Access           | Application + adapter         | identity service + E2E    | Current  |
| Account handle is normalized and unique                                                       | Account                     | Domain + Application          | Account test              | Current  |
| Profile belongs to Account and cannot carry credential or grant                               | Account                     | Domain + Application          | Profile service test      | Current  |
| Membership is organization-only and invitation-based                                          | Account                     | Domain + Application          | membership service tests  | Current  |
| Owner invites/removes; only invitee accepts before expiry                                     | Account                     | Domain + Application          | membership service tests  | Current  |
| Team contains only active organization members                                                | Account                     | Domain + Application          | Team service test         | Current  |
| Team grants are translated into Repository access                                             | Repository ACL              | Domain + Application          | Repository test           | Current  |
| Only active owner Account may create Repository                                               | Account + Repository ACL    | Repository Application        | product E2E               | Current  |
| Repository name is unique in owner namespace                                                  | Repository                  | Domain + Application          | service behavior          | Current  |
| Archived Repository rejects mutation except unarchive                                         | Repository                  | authorization + Domain        | test + E2E                | Current  |
| Owner is not stored as collaborator grant                                                     | Repository                  | authorization policy          | Repository test           | Current  |
| Issue number is unique within Repository scope                                                | Issues                      | Application + sequence        | Issues tests              | Current  |
| Issue Label and Assignment commands apply their own rules; Closed is not blanket immutability | Issues                      | Domain                        | Issues tests              | Current  |
| Assignee requires Repository participation eligibility                                        | Issues ACL                  | Application                   | denied-path test          | Current  |
| Issue dependency requires existing same-scope Issues and an acyclic graph                     | Issues                      | Application + Domain relation | collaboration tests       | Current  |
| Project creation requires Account owner membership                                            | Projects ACL                | Application                   | Projects test             | Current  |
| Project Issue Item requires an existing Issue reference                                       | Projects ACL                | Application                   | Projects test             | Current  |
| Project owns planning metadata but never Issue state                                          | Projects                    | Domain + contract             | typed Project Item test   | Current  |
| Organization can affiliate with at most one Enterprise                                        | Enterprise Governance       | Application + store           | Enterprise tests          | Current  |
| Only Enterprise owner changes affiliation or policy                                           | Enterprise Governance       | Domain                        | Enterprise tests          | Current  |
| Enterprise visibility policy only constrains; Repository owns final decision                  | Enterprise + Repository ACL | Repository Application        | Repository policy tests   | Current  |
| Enterprise does not become Repository owner                                                   | Account                     | not implemented               | product decision required | Proposed |

新增規則必須記錄 owner、scope、trigger、enforcement point、violation outcome 與 test。
