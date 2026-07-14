# GitHub non-code capability catalog

狀態：Accepted classification / runtime status annotated

| Capability family                    | Semantic type                         | Candidate owner                     | Runtime                                                  |
| ------------------------------------ | ------------------------------------- | ----------------------------------- | -------------------------------------------------------- |
| Identity & Authentication            | Product Context + control plane       | Identity & Access                   | Current in-memory subset                                 |
| Account, Profile & Presence          | Product Context + experience surface  | Account                             | Account/Profile subset Current                           |
| Membership & Organization Team       | Relationship and delegation           | Account                             | Current in-memory                                        |
| Repository Administration            | Product Context                       | Repository                          | Current non-code subset                                  |
| Role, Permission & Repository Access | Control plane + resource rules        | Resource owner                      | Repository subset Current                                |
| Issues                               | Product Context                       | Issues                              | Issue/Label/Assignment Current                           |
| Projects                             | Product Context + governance boundary | Projects                            | Current in-memory vertical slice                         |
| Discussions, Community & Wiki        | Product Context + candidates          | Discussions / Community / Knowledge | Discussion subset Current                                |
| Social Graph & Interest              | Relationship family                   | Social Graph                        | Research                                                 |
| Search, Discovery & Navigation       | Product Context + experience          | Search / Experience                 | Search index/query subset Current                        |
| Subscription                         | Relationship Context                  | Subscription                        | Research                                                 |
| Notifications                        | Delivery and Inbox Context            | Notification                        | Inbox triage subset Current                              |
| Plan, License & Entitlement          | Commercial control plane              | Commercial / Entitlement            | Research                                                 |
| Billing & Cost Management            | Commercial Domain                     | Billing                             | Research                                                 |
| Apps, Integrations & Marketplace     | Product and delegated authorization   | Apps / Marketplace                  | App Registration first slice Current; remaining Research |
| Sponsorship & Funding                | Commercial Domain                     | Sponsors                            | Research                                                 |
| Enterprise Governance & Assurance    | Governance Domain                     | Enterprise Governance               | Audit subset Current                                     |
| Trust, Safety, Support & Programs    | Policy and operations Domains         | separate owners required            | Research                                                 |
| Client Experience                    | Experience surfaces                   | Experience                          | Web/Dashboard/Activity Feed subset Current               |

This catalog is not a Context Map. A Research row requires G1-G3 before a module, contract, event or
database is created.

## Excluded

Git data, files, commits, branches, tags, forks, clones, Pull Requests, merge/code review, Actions,
Packages, Pages, Codespaces, Copilot, Models, Spark, Code Search, Gists, code security, releases,
deployment and implementation guidance for APIs, CLIs, tokens or webhooks.
