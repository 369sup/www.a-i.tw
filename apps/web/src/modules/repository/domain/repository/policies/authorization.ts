import type {
  AccessGrant,
  Repository,
  RepositoryRole,
} from "../aggregates/repository";

export type RepositoryAccessDecision = Readonly<{
  allowed: boolean;
  reason:
    | "owner"
    | "public-read"
    | "direct-grant"
    | "team-grant"
    | "insufficient-access"
    | "archived"
    | "unauthenticated";
  effectiveRole?: RepositoryRole;
}>;

export type RepositoryAction =
  | "repository:read"
  | "repository:rename"
  | "repository:change-visibility"
  | "repository:archive"
  | "repository:unarchive"
  | "repository:manage-access"
  | "issue:read"
  | "issue:create"
  | "issue:comment"
  | "issue:triage"
  | "issue:manage";
const rank: Record<RepositoryRole, number> = {
  read: 1,
  write: 2,
  maintain: 3,
  admin: 4,
};
const required: Record<RepositoryAction, RepositoryRole> = {
  "repository:read": "read",
  "repository:rename": "maintain",
  "repository:change-visibility": "admin",
  "repository:archive": "admin",
  "repository:unarchive": "admin",
  "repository:manage-access": "admin",
  "issue:read": "read",
  "issue:create": "write",
  "issue:comment": "write",
  "issue:triage": "write",
  "issue:manage": "admin",
};

export function decideRepositoryAccess(input: {
  repository: Repository;
  principalId?: string;
  ownerPrincipalId: string;
  action: RepositoryAction;
  grants: AccessGrant[];
  teamIds?: readonly string[];
}): RepositoryAccessDecision {
  if (
    !["repository:read", "issue:read", "repository:unarchive"].includes(
      input.action,
    ) &&
    input.repository.status === "archived"
  )
    return { allowed: false, reason: "archived" };
  if (
    ["repository:read", "issue:read"].includes(input.action) &&
    input.repository.visibility === "public"
  )
    return { allowed: true, reason: "public-read", effectiveRole: "read" };
  if (!input.principalId) return { allowed: false, reason: "unauthenticated" };
  if (input.principalId === input.ownerPrincipalId)
    return { allowed: true, reason: "owner", effectiveRole: "admin" };
  const grant = input.grants.find(
    (item) =>
      item.subject.type === "principal" &&
      item.subject.principalId === input.principalId,
  );
  if (grant && rank[grant.role] >= rank[required[input.action]])
    return { allowed: true, reason: "direct-grant", effectiveRole: grant.role };
  const teamGrant = input.grants
    .filter(
      (item) =>
        item.subject.type === "team" &&
        input.teamIds?.includes(item.subject.teamId),
    )
    .sort((left, right) => rank[right.role] - rank[left.role])[0];
  if (teamGrant && rank[teamGrant.role] >= rank[required[input.action]])
    return {
      allowed: true,
      reason: "team-grant",
      effectiveRole: teamGrant.role,
    };
  return {
    allowed: false,
    reason: "insufficient-access",
    effectiveRole: grant?.role ?? teamGrant?.role,
  };
}
