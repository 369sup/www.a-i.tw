# Social graph and interest

狀態：Current / Repository Star first slice implemented and verified

| Relationship | Subject → Object                | Meaning                                          |
| ------------ | ------------------------------- | ------------------------------------------------ |
| Follow       | User → User/Organization        | Public activity interest                         |
| Star         | User → Repository/Topic         | Bookmark, appreciation and recommendation signal |
| Watch        | User → Repository               | Repository notification subscription             |
| Subscribe    | User → Issue/Discussion         | Thread notification subscription                 |
| Mention      | User/Team → Conversation target | Attention request                                |

Follow, Star and Watch are not interchangeable. Each future owner publishes its own relationship fact;
there is no global mutable social graph table.

## Approved first slice: Repository Star

### Problem and outcome

An authenticated active User needs to bookmark a readable Repository and later find that Repository again without
implicitly subscribing to activity. Social Curation owns this User-to-Repository relation; Repository Governance remains
the owner of Repository identity, lifecycle, visibility and read-access facts.

### Ubiquitous Language and owner

| Term                     | Meaning                                                              | Owner                             |
| ------------------------ | -------------------------------------------------------------------- | --------------------------------- |
| `RepositoryStar`         | A User's active bookmark and interest relation to one Repository     | Social Curation                   |
| `starredAt`              | The instant at which the currently active relation was first created | Social Curation                   |
| Repository read decision | Whether the current User can see the referenced Repository now       | Repository Governance             |
| Watch                    | A request to receive Repository activity notifications               | Subscription, not Social Curation |

The approved Bounded Context is
`apps/web/src/modules/engagement/social-discovery/social-curation`. It is a Supporting Subdomain with
`RepositoryStar` as its source of truth.

### First use case

> An authenticated active User stars or unstars a Repository that the User can read, then lists the User's own starred
> Repository references ordered by `starredAt` descending.

### Invariants

1. The subject is an authenticated active User Principal; Organization and Enterprise Accounts are not actors.
2. A User can have at most one active `RepositoryStar` per Repository.
3. Star and unstar are idempotent. Repeating star does not replace the current relation's `starredAt`; unstar of an
   absent relation is a successful no-op.
4. Star, unstar and current-owner queries fail closed unless Repository Governance confirms `repository:read`.
5. Owner-scoped listing re-evaluates Repository read access and does not disclose a private or otherwise inaccessible
   Repository.
6. Default ordering is `starredAt` descending.
7. Creating or removing a Star does not create or remove a Watch, Notification or Activity Feed item.

### Out of scope

- Topic Stars, Following, public Star Lists and list curation.
- Stargazer counts, ranking, recommendations and Explore projections.
- Notification, Watch or Activity Feed side effects.
- Durable database persistence, REST compatibility endpoints and external event delivery.

### Official evidence

- GitHub describes a Star as a Repository bookmark and approximate interest signal, and states that Stars do not affect
  notifications or the activity feed.
- The authenticated-user Star endpoints require Starring permission plus Repository Metadata read permission.
- The authenticated-user list exposes `starred_at` and defaults to `sort=created&direction=desc`.
- Private Repository Star surfaces are visible only to viewers who retain read access.
