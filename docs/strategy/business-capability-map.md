# Business capability map

狀態：Baseline / runtime scope annotated

| Capability                             | Owner                          | Classification | Current scope                             | Runtime           |
| -------------------------------------- | ------------------------------ | -------------- | ----------------------------------------- | ----------------- |
| Principal attribution and demo session | Identity & Access              | Supporting     | active/disabled Principal, session        | Current           |
| Authentication provider                | Identity & Access              | Generic        | assurance/provider requirements           | Proposed          |
| Account ownership                      | Account                        | Supporting     | personal/organization, handle, namespace  | Current           |
| Organization membership                | Account                        | Core extension | invite, accept, remove, relationship fact | Current in-memory |
| Repository governance                  | Repository                     | Core           | visibility, lifecycle, grants, decisions  | Current           |
| Template catalog reference             | Master Template / Sub Template | Supporting     | list/get catalog                          | Current           |
| Team and team-based Repository access  | Account + Repository           | Core extension | follows Membership                        | Proposed          |

Git/code、commits、branches、PR、Actions、packages、billing 與 notifications are out
of the current product scope. New capability requires owner、classification、
change driver、build/buy/integrate decision and Context impact.
