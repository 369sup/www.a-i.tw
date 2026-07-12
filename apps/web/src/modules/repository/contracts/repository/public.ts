export type RepositoryVisibilityV1 = "public" | "private";
export type RepositoryRoleV1 = "read" | "write" | "maintain" | "admin";
export type RepositoryRefV1 = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
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
    | "team-grant"
    | "insufficient-access"
    | "archived"
    | "unauthenticated";
  effectiveRole?: RepositoryRoleV1;
}>;

export type RepositoryCollaborationScopeV1 = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
  status: "active" | "archived";
}>;

export type RepositoryParticipationActionV1 =
  | "issue:read"
  | "issue:create"
  | "issue:comment"
  | "issue:triage"
  | "issue:manage";
export type RepositoryParticipationDecisionV1 = Readonly<{
  repositoryId: string;
  principalId: string;
  action: RepositoryParticipationActionV1;
  allowed: boolean;
  reason: "owner" | "public" | "grant" | "archived" | "denied";
}>;

export interface RepositoryParticipationApiV1 {
  collaborationScope(
    repositoryId: string,
  ): Promise<RepositoryCollaborationScopeV1 | undefined>;
  participation(input: {
    repositoryId: string;
    principal: Readonly<{
      principalId: string;
      status: "active" | "disabled";
    }>;
    action: RepositoryParticipationActionV1;
  }): Promise<RepositoryParticipationDecisionV1>;
}
