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
  | "read"
  | "participate"
  | "rename"
  | "change-visibility"
  | "archive"
  | "unarchive"
  | "manage-access";
const rank: Record<RepositoryRole, number> = {
  read: 1,
  write: 2,
  maintain: 3,
  admin: 4,
};
const required: Record<RepositoryAction, RepositoryRole> = {
  read: "read",
  participate: "write",
  rename: "maintain",
  "change-visibility": "admin",
  archive: "admin",
  unarchive: "admin",
  "manage-access": "admin",
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
    !["read", "unarchive"].includes(input.action) &&
    input.repository.status === "archived"
  )
    return { allowed: false, reason: "archived" };
  if (input.action === "read" && input.repository.visibility === "public")
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
