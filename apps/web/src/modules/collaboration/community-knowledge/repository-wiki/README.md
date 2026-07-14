# Knowledge Wiki: repository-wiki

Strategic subdomain `repository-wiki` (`supporting`); owner www.a-i.tw Product Team.

Owns Repository-scoped `Wiki` and `WikiPage` identity, title/content invariants and publication state. Repository owns
existence, lifecycle and Wiki feature availability; Authorization & Policy owns Roles and Access Grants. Git-backed
storage, source files, revisions, search and notifications are outside this Context.

The current in-memory slice lets an active Principal with Repository `write` access create the first uniquely titled,
non-empty Page in an enabled active Repository Wiki, then read it through a Knowledge-owned query. The Context consumes
`RepositoryParticipationApiV1` only through its own outbound Port and ACL.
