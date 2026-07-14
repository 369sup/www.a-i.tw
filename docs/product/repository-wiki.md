# Knowledge Wiki

狀態：Approved first vertical slice / broader lifecycle deferred

## Product problem

Repository collaborators need a durable long-form documentation space whose page identity and content lifecycle are
independent from Repository metadata, Issues and Discussions. The product model must not expose the Git repository used
by GitHub Wiki as a domain concept.

## First actor outcome

> In an enabled, active Repository Wiki, an authenticated actor with Repository `write` access creates the first
> uniquely titled, non-empty Wiki Page and reads it through a Knowledge-owned query.

GitHub documents Wiki as a Repository documentation surface, limits editing to people with write access by default,
allows a public Repository to opt into broader contribution, and preserves hidden content when Wiki is disabled. The
first slice adopts the default write-access rule; public contribution configuration is deferred.

## Ubiquitous Language and ownership

| Term                         | Meaning                                                                                    | Owner                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `Wiki`                       | The single Knowledge space associated with one Repository.                                 | Knowledge Wiki                                |
| `WikiPage`                   | A named long-form document inside a Wiki.                                                  | Knowledge Wiki                                |
| `WikiPageTitle`              | A non-empty display title with a normalized comparison key used for Wiki-local uniqueness. | Knowledge Wiki                                |
| `WikiPageContent`            | Non-empty page body; rendering and Git-backed persistence are Adapter concerns.            | Knowledge Wiki                                |
| `RepositoryWikiAvailability` | Repository existence, active/archive state and whether its Wiki feature is enabled.        | Repository                                    |
| `WikiParticipationDecision`  | The Repository-scoped access decision consumed by Knowledge.                               | Repository facade over Authorization & Policy |

## First-slice invariants

1. One `Wiki` is identified by one `RepositoryId`; Knowledge does not copy Repository ownership or visibility truth.
2. Page creation requires an existing, active Repository with Wiki enabled.
3. Page creation requires an active authenticated Principal and a fail-closed Repository participation decision mapped
   to the default `write` access threshold.
4. A title is trimmed, internal whitespace is collapsed and its lowercase comparison key must be unique within the Wiki.
5. Page content must contain at least one non-whitespace character.
6. Creation publishes the Page immediately in the first slice; draft, revision, sidebar and footer lifecycles are
   deferred.
7. Disabling Wiki hides pages without deleting Knowledge state. Archived Repositories remain readable but reject Wiki
   mutation.

Title normalization is a local product decision required to make uniqueness deterministic; it is not presented as a
GitHub storage-format rule.

## Boundaries

Knowledge Wiki owns `Wiki`, `WikiPage`, title/content invariants and the create/read use cases. It does not own Repository
lifecycle or feature configuration, Repository Roles or Access Grants, authentication, Markdown rendering, files,
commits, branches, Git history, search indexing or notification delivery.

The first dependency is:

```text
RepositoryParticipationApiV1
    -> Knowledge-owned RepositoryWikiParticipationPort adapter
    -> Knowledge create/read use cases
```

Unavailable Repository scope, disabled Wiki, archived mutation, missing Principal or denied access fails closed.

## Deferred

- public-Wiki contribution policy;
- edit, rename, delete and restore Page;
- Page revision history, sidebar, footer and navigation;
- attachments and Markdown rendering;
- Organization-level knowledge;
- search, notification, feed, webhook and audit consumers;
- durable or Git-backed persistence.

## Official evidence

- [About wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis)
- [Disabling wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/disabling-wikis)
