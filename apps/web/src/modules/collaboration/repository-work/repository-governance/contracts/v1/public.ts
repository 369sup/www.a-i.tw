export type RepositoryVisibilityV1 = "public" | "private" | "internal";
export type RepositoryRefV1 = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
  name: string;
  description: string;
  homepageUrl?: string;
  visibility: RepositoryVisibilityV1;
  status: "active" | "archived" | "disabled";
}>;
export type RepositoryCollaborationScopeV1 = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
  visibility: RepositoryVisibilityV1;
  status: "active" | "archived" | "disabled";
  features: Readonly<{ wikiEnabled: boolean }>;
}>;

export type RepositoryParticipationActionV1 =
  | "repository:read"
  | "issue:read"
  | "issue:create"
  | "issue:comment"
  | "issue:triage"
  | "issue:manage"
  | "discussion:read"
  | "discussion:create"
  | "discussion:comment"
  | "discussion:triage"
  | "wiki:read"
  | "wiki:write"
  | "community-safety:manage"
  | "community-safety:interact";
export type RepositoryParticipationDecisionV1 = Readonly<{
  repositoryId: string;
  principalId: string;
  action: RepositoryParticipationActionV1;
  allowed: boolean;
  reason: "owner" | "public" | "grant" | "archived" | "disabled" | "denied";
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

// Export only deliberate, versioned Published Language. Never expose Context internals.
export type RepositoryRoleV1 =
  "read" | "triage" | "write" | "maintain" | "admin";

export type RepositoryAuthorizationActionV1 =
  | "repository:read"
  | "repository:rename"
  | "repository:change-visibility"
  | "repository:archive"
  | "repository:unarchive"
  | "repository:manage-access"
  | "repository:configure-features"
  | "issue:read"
  | "issue:create"
  | "issue:comment"
  | "issue:triage"
  | "issue:manage"
  | "discussion:read"
  | "discussion:create"
  | "discussion:comment"
  | "discussion:triage"
  | "wiki:read"
  | "wiki:write"
  | "community-safety:manage"
  | "community-safety:interact";

export type RepositoryAccessSubjectV1 =
  | Readonly<{ type: "principal"; principalId: string }>
  | Readonly<{ type: "team"; teamId: string }>;

export type RepositoryAuthorizationResourceV1 = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
  visibility: "public" | "private" | "internal";
  status: "active" | "archived" | "disabled";
}>;

export type RepositoryAuthorizationPrincipalV1 = Readonly<{
  principalId: string;
  status: "active" | "disabled";
}>;

export type RepositoryAuthorizationDecisionV1 = Readonly<{
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
  effectiveRole?: RepositoryRoleV1;
}>;

export interface RepositoryAuthorizationApiV1 {
  decideRepositoryAccess(input: {
    repository: RepositoryAuthorizationResourceV1;
    principal?: RepositoryAuthorizationPrincipalV1;
    action: RepositoryAuthorizationActionV1;
  }): Promise<RepositoryAuthorizationDecisionV1>;
  grantRepositoryAccess(input: {
    repository: RepositoryAuthorizationResourceV1;
    actor: RepositoryAuthorizationPrincipalV1;
    subject: RepositoryAccessSubjectV1;
    role: RepositoryRoleV1;
  }): Promise<void>;
}
