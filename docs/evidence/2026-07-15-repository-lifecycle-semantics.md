# Repository lifecycle semantic evidence

Date: 2026-07-15

Status: Archive/delete/restore non-Code semantics confirmed; provider-disabled transition remains undocumented

## Scope

Resolve the canonical GitHub non-Code stop condition for Repository archive、delete、restore and `isDisabled` without
promoting a new runtime capability. Context7 `/github/docs` was queried first; focused current GitHub Docs product and
schema pages were then checked because Context7 did not return the deletion/restoration constraints.

## Confirmed semantics

- Archive is a reversible live-Repository state. Repository resources and permissions become read-only, and
  collaborators or Teams cannot be added or removed until unarchive.
- Delete removes the live Repository. Public forks remain, private forks are deleted, and Team permissions are
  permanently deleted. Organization or enterprise policy may prevent an otherwise authorized deletion.
- Some deleted Repositories can be restored within 90 days. Self-service restoration is blocked by a non-empty fork
  network, the Repository may take up to one hour to appear as restorable, and Team permissions are not restored.
- REST and GraphQL Repository representations expose `disabled`/`isDisabled`, but the official product documentation
  defines no Repository owner/admin disable or enable command, cause taxonomy, recovery process or transition matrix.

## Modeling decision

```text
live Repository state = active | archived
deleted Repository     = retained deletion/restoration record, not a live state
provider disabled      = external observation, not an inferred owner-controlled transition
```

Repository owns the live lifecycle and deletion/restoration process. Authorization may consume archived or external
provider-restriction facts and fail closed, but it does not own those facts.

## Runtime impact and debt

No runtime source was changed. The Current `RepositoryState` and published contracts still include `disabled` as a
fail-closed compatibility value across Repository authorization consumers. Removing or separating it would be a
cross-Context contract change and requires its own approved first use case, compatibility analysis and G1-G7 runtime
gate. This evidence only prevents future work from inventing a user-controlled disable/enable lifecycle.

## Sources

- [Archiving repositories](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories)
- [Deleting a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository)
- [Restoring a deleted repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/restoring-a-deleted-repository)
- [Repository GraphQL object](https://docs.github.com/en/graphql/reference/objects#repository)
- [REST API endpoints for repositories](https://docs.github.com/en/rest/repos/repos)

## Verification plan

- `pnpm docs:check`
- `git diff --check`
- focused diff inspection
