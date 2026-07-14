# Discussions, Community and Wiki

狀態：Discussion Q&A Current in-memory / Knowledge Wiki and Community Safety first slices Approved

| Family      | GitHub language                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| Discussions | Discussion, Category, Comment, Reply, Answer, Announcement, Spotlight        |
| Moderation  | Lock, edit, delete, interaction limit, block, report                         |
| Community   | Code of conduct, contribution guideline, support resource, community profile |
| Wiki        | Wiki, Wiki page, sidebar, footer, page history and permission                |

Discussion is exploratory conversation; Issue is actionable work; Wiki is durable collaborative
knowledge. Conversion between Discussion and Issue crosses owner boundaries and will require explicit
contracts.

## Current Q&A slice

- Owner: `collaboration/discussions`.
- Source of truth: `DiscussionCategory` and `Discussion`.
- Actor outcome: an authenticated Repository participant creates a Q&A Discussion, adds a Comment, and the Discussion
  author or a Principal with Repository `triage` access marks an active Comment from that Discussion as the accepted
  Answer.
- Every Discussion belongs to one Repository-scoped Category. The current composition provides one answerable `Q&A`
  Category per seeded Repository; Category administration remains Research.
- Discussions consumes Repository participation through its own Port and ACL. Missing Repository scope, inactive
  Principal, archived/disabled Repository or denied access fails closed.

Current Context-owned values are Discussion／Category／Comment identities, Category slug, title/body, author and
Repository references, lifecycle state and accepted-answer reference. Internal Domain types never cross the Context
boundary.

Organization Discussions, announcements, polls, reply threads, minimizing, unmarking answers, closing/locking,
moderation, transfer, labels, durable persistence, notifications and search projections remain out of scope.

## Approved Knowledge Wiki slice

Repository Wiki is a separate Bounded Context at `collaboration/community-knowledge/repository-wiki`. It owns Wiki/Page
identity, title/content invariants and create/read behavior. Repository owns feature availability and publishes the
Repository-scoped participation decision; Discussions owns no Wiki state. See
[`repository-wiki.md`](repository-wiki.md).

## Approved Community Safety slice

Community Safety is a separate Bounded Context at `collaboration/community-knowledge/community-safety`. It owns a
temporary public-Repository `collaborators_only` Interaction Limit and the decision consumed by Issue creation and
Issue/Discussion comment commands. Repository/Authorization retain access facts, and source Contexts retain content
state. See [`community-safety.md`](community-safety.md).
