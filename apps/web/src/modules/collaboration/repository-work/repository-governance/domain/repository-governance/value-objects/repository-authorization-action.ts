export const repositoryAuthorizationActions = [
  "repository:read",
  "repository:rename",
  "repository:change-visibility",
  "repository:archive",
  "repository:unarchive",
  "repository:manage-access",
  "repository:configure-features",
  "issue:read",
  "issue:create",
  "issue:comment",
  "issue:triage",
  "issue:manage",
  "discussion:read",
  "discussion:create",
  "discussion:comment",
  "discussion:triage",
  "wiki:read",
  "wiki:write",
  "community-safety:manage",
  "community-safety:interact",
] as const;

export type RepositoryAuthorizationAction =
  (typeof repositoryAuthorizationActions)[number];
