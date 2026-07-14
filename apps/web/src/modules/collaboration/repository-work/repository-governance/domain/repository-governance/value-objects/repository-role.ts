import { InvalidRepositoryRoleError } from "../errors/invalid-repository-role.error";

export const repositoryRoles = [
  "read",
  "triage",
  "write",
  "maintain",
  "admin",
] as const;

export type RepositoryRole = (typeof repositoryRoles)[number];

export function createRepositoryRole(input: string): RepositoryRole {
  if (!repositoryRoles.includes(input as RepositoryRole))
    throw new InvalidRepositoryRoleError();
  return input as RepositoryRole;
}

const rank: Record<RepositoryRole, number> = {
  read: 1,
  triage: 2,
  write: 3,
  maintain: 4,
  admin: 5,
};

export function repositoryRoleSatisfies(
  actual: RepositoryRole,
  required: RepositoryRole,
) {
  return rank[actual] >= rank[required];
}

export function highestRepositoryRole(
  roles: readonly RepositoryRole[],
): RepositoryRole | undefined {
  return [...roles].sort((left, right) => rank[right] - rank[left])[0];
}
