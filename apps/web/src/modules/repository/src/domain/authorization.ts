import type { AccessGrant, Repository, RepositoryRole } from "./repository";

export type RepositoryAccessDecision = Readonly<{
  allowed: boolean;
  reason:
    | "owner"
    | "public-read"
    | "direct-grant"
    | "insufficient-access"
    | "archived"
    | "unauthenticated";
  effectiveRole?: RepositoryRole;
}>;

export type RepositoryAction =
  | "read"
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
    (item) => item.principalId === input.principalId,
  );
  if (grant && rank[grant.role] >= rank[required[input.action]])
    return { allowed: true, reason: "direct-grant", effectiveRole: grant.role };
  return {
    allowed: false,
    reason: "insufficient-access",
    effectiveRole: grant?.role,
  };
}
