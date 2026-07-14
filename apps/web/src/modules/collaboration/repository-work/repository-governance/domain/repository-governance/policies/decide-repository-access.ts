import type { RepositoryAccessGrant } from "../aggregates/repository-access-grant";
import type { RepositoryAuthorizationAction } from "../value-objects/repository-authorization-action";
import {
  highestRepositoryRole,
  repositoryRoleSatisfies,
  type RepositoryRole,
} from "../value-objects/repository-role";

export type RepositoryAuthorizationDecision = Readonly<{
  allowed: boolean;
  reason:
    | "owner"
    | "public-read"
    | "direct-grant"
    | "team-grant"
    | "insufficient-access"
    | "archived"
    | "disabled"
    | "unauthenticated";
  effectiveRole?: RepositoryRole;
}>;

const requiredRole: Record<RepositoryAuthorizationAction, RepositoryRole> = {
  "repository:read": "read",
  "repository:rename": "admin",
  "repository:change-visibility": "admin",
  "repository:archive": "admin",
  "repository:unarchive": "admin",
  "repository:manage-access": "admin",
  "repository:configure-features": "admin",
  "issue:read": "read",
  "issue:create": "read",
  "issue:comment": "read",
  "issue:triage": "triage",
  "issue:manage": "write",
  "discussion:read": "read",
  "discussion:create": "read",
  "discussion:comment": "read",
  "discussion:triage": "triage",
  "wiki:read": "read",
  "wiki:write": "write",
  "community-safety:manage": "admin",
  "community-safety:interact": "write",
};

const anonymousReadActions: readonly RepositoryAuthorizationAction[] = [
  "repository:read",
  "issue:read",
  "discussion:read",
  "wiki:read",
];

export function decideRepositoryAccess(input: {
  repository: Readonly<{
    repositoryId: string;
    visibility: "public" | "private" | "internal";
    status: "active" | "archived" | "disabled";
  }>;
  principalId?: string;
  ownerPrincipalId?: string;
  action: RepositoryAuthorizationAction;
  grants: readonly RepositoryAccessGrant[];
  teamIds?: readonly string[];
}): RepositoryAuthorizationDecision {
  if (input.repository.status === "disabled")
    return { allowed: false, reason: "disabled" };
  if (
    input.repository.status === "archived" &&
    ![
      "repository:read",
      "issue:read",
      "discussion:read",
      "wiki:read",
      "repository:unarchive",
    ].includes(input.action)
  )
    return { allowed: false, reason: "archived" };
  if (
    input.repository.visibility === "public" &&
    anonymousReadActions.includes(input.action)
  )
    return { allowed: true, reason: "public-read", effectiveRole: "read" };
  if (!input.principalId) return { allowed: false, reason: "unauthenticated" };
  if (input.ownerPrincipalId === input.principalId)
    return { allowed: true, reason: "owner", effectiveRole: "admin" };
  if (
    input.repository.visibility === "public" &&
    requiredRole[input.action] === "read"
  )
    return { allowed: true, reason: "public-read", effectiveRole: "read" };

  const directRoles = input.grants
    .filter(
      (grant) =>
        grant.subject.type === "principal" &&
        grant.subject.principalId === input.principalId,
    )
    .map((grant) => grant.role);
  const teamRoles = input.grants
    .filter(
      (grant) =>
        grant.subject.type === "team" &&
        input.teamIds?.includes(grant.subject.teamId),
    )
    .map((grant) => grant.role);
  const directRole = highestRepositoryRole(directRoles);
  const teamRole = highestRepositoryRole(teamRoles);
  const effectiveRole = highestRepositoryRole(
    [directRole, teamRole].filter(
      (role): role is RepositoryRole => role !== undefined,
    ),
  );
  if (
    effectiveRole &&
    repositoryRoleSatisfies(effectiveRole, requiredRole[input.action])
  )
    return {
      allowed: true,
      reason:
        teamRole === effectiveRole && directRole !== effectiveRole
          ? "team-grant"
          : "direct-grant",
      effectiveRole,
    };
  return {
    allowed: false,
    reason: "insufficient-access",
    effectiveRole,
  };
}
