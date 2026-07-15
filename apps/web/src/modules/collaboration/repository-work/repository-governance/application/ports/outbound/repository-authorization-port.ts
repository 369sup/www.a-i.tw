import type { RepositoryPrincipal } from "../inbound/repository-principal";

export type RepositoryAuthorizationRole =
  "read" | "triage" | "write" | "maintain" | "admin";

export type RepositoryAuthorizationAction =
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

export type RepositoryAuthorizationResource = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
  visibility: "public" | "private" | "internal";
  status: "active" | "archived" | "disabled";
}>;

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
  effectiveRole?: RepositoryAuthorizationRole;
}>;

export interface RepositoryAuthorization {
  decide(input: {
    repository: RepositoryAuthorizationResource;
    principal?: RepositoryPrincipal;
    action: RepositoryAuthorizationAction;
  }): Promise<RepositoryAuthorizationDecision>;
  grant(input: {
    repository: RepositoryAuthorizationResource;
    actor: RepositoryPrincipal;
    subject:
      | Readonly<{ type: "principal"; principalId: string }>
      | Readonly<{ type: "team"; teamId: string }>;
    role: RepositoryAuthorizationRole;
  }): Promise<void>;
}
