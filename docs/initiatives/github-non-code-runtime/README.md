# GitHub non-code runtime expansion

狀態：Approved / implementation in progress

## Outcome

Implement the approved GitHub non-code Published Language as app-local Bounded Contexts while preserving
`Presentation / Infrastructure -> Application -> Domain` and server-only concrete composition.

## Ownership and first use cases

| Owner         | Type         | First use case                                                                    | Published references consumed             |
| ------------- | ------------ | --------------------------------------------------------------------------------- | ----------------------------------------- |
| Issues        | Core         | Manage Issue lifecycle, Labels, Assignees, Comments, Milestones and relationships | Principal, Repository collaboration scope |
| Account       | Supporting   | Read Profile facts                                                                | Principal and Account refs                |
| Experience    | Presentation | Compose Dashboard from owner-provided query results                               | Account, Repository and Issue summaries   |
| Projects      | Core         | Create a Project and plan an Issue as a Project Item                              | Account, Repository and Issue refs        |
| Discussions   | Core         | Create and answer a Repository Discussion                                         | Principal and Repository refs             |
| Notifications | Supporting   | Subscribe and triage Notification Inbox items                                     | Principal and resource refs               |
| Search        | Supporting   | Index and query viewer-visible non-code resources                                 | Public resource search documents          |
| Activity Feed | Supporting   | Record and list viewer feed items                                                 | Actor and resource refs                   |
| Audit         | Supporting   | Record and query immutable administrative observations                            | Actor, action and target refs             |

## Invariants

- Experience surfaces never own Domain truth.
- Search, Feed, Notification and Audit records are distinct models.
- Search and Profile visibility never grant access.
- Notification subscription is distinct from Follow, Star and Assignment.
- Audit observations are immutable and do not replace owner Domain events.
- No Context imports another Context's Domain, Application, Infrastructure or composition internals.

## Out of scope

Git, files, commits, branches, Pull Requests, code review, Actions, Code Search, Gists, releases and deployment.
