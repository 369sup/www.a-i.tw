export type RepositoryVisibilityV1 = "public" | "private";
export type RepositoryRoleV1 = "read" | "write" | "maintain" | "admin";
export type RepositoryRefV1 = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
  ownerHandle: string;
  name: string;
  description: string;
  visibility: RepositoryVisibilityV1;
  status: "active" | "archived";
}>;
export type RepositoryAccessDecisionV1 = Readonly<{
  allowed: boolean;
  reason:
    | "owner"
    | "public-read"
    | "direct-grant"
    | "insufficient-access"
    | "archived"
    | "unauthenticated";
  effectiveRole?: RepositoryRoleV1;
}>;
