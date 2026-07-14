# Community Safety

狀態：Approved first vertical slice / broader moderation lifecycle deferred

## Product problem

Public Repository maintainers need a temporary, explicit way to reduce disruptive non-Code interactions without
changing Repository visibility, deleting community content or rewriting Repository access grants.

## First actor outcome

> A Repository owner or administrator activates a one-day `collaborators_only` Interaction Limit for a public
> Repository. Until removal or expiry, opening an Issue and adding Issue or Discussion comments succeeds only for an
> active Principal with Repository `write` access.

GitHub documents Repository interaction limits as temporary controls for public Repositories. The official model also
supports `existing_users`, `contributors_only`, `collaborators_only` and longer expiry choices. The first slice selects
only `collaborators_only + one_day` because it can be decided from authoritative Repository access facts without
introducing excluded source-code contribution history.

## Ubiquitous Language and ownership

| Term                          | Meaning                                                                                 | Owner                                         |
| ----------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------- |
| `RepositoryInteractionLimit`  | The temporary non-Code interaction rule for one public Repository.                      | Community Safety                              |
| `InteractionLimitKind`        | The eligible actor class; the first slice supports only `collaborators_only`.           | Community Safety                              |
| `InteractionLimitExpiry`      | The configured duration; the first slice supports only `one_day`.                       | Community Safety                              |
| `InteractionLimitDecision`    | Allow/deny result for `open_issue`, `issue_comment` or `discussion_comment`.            | Community Safety                              |
| `RepositorySafetyEligibility` | Repository existence, visibility, lifecycle and the actor's management/access decision. | Repository facade over Authorization & Policy |

## First-slice invariants

1. A Repository Interaction Limit is identified by `RepositoryId`; only one active rule may exist per Repository.
2. Activation is valid only for an existing, active, public Repository.
3. Activation and removal require an active Principal and a fail-closed Repository owner/admin management decision.
4. The first slice accepts only `collaborators_only` and `one_day`; unsupported official variants fail validation.
5. `expiresAt` is derived from the activation instant and one-day duration; an expired rule no longer restricts interaction.
6. While active, `open_issue`, `issue_comment` and `discussion_comment` require a fail-closed Repository `write` decision.
7. Removal records the rule as removed without changing Repository access grants or deleting Issues, Discussions or comments.
8. A User- or Organization-wide limit is recognized as a higher-level future owner; Repository rules must not override it.

## Boundaries

Community Safety owns the rule, expiry/removal lifecycle and interaction decision. It does not own Repository visibility
or lifecycle, Repository Roles or Access Grants, Issue/Discussion/comment state, authentication, organization-wide
limits, abuse reports, blocking, content redaction, conversation locks, notification delivery or audit records.

The first dependency flow is:

```text
RepositoryParticipationApiV1
    -> Community Safety-owned RepositorySafetyParticipation adapter
    -> RepositoryInteractionLimit command/query service
    -> CommunitySafetyApiV1
    -> Issues/Discussions-owned InteractionSafety ports and ACLs
```

Unavailable Repository facts or access decisions fail closed for activation, removal and restricted interactions.

## Deferred

- `existing_users` and account-age facts;
- `contributors_only` and contribution-history facts;
- three-day, one-week, one-month and six-month durations;
- User- and Organization-wide Interaction Limits and override orchestration;
- reactions and editing existing comments or titles;
- content reports, moderation cases, hide/redact, locks, blocking and appeals;
- Pull Requests and all Code contribution semantics;
- durable persistence, audit, notification and webhook consumers.

## Official evidence

- [REST API endpoints for repository interactions](https://docs.github.com/en/rest/interactions/repos)
- [Limiting interactions in your organization](https://docs.github.com/en/communities/moderating-comments-and-conversations/limiting-interactions-in-your-organization)
