export type RepositoryPrincipalView = Readonly<{
  principalId: string;
  handle: string;
  displayName: string;
  status: "active" | "disabled";
}>;

export type RepositoryAuthenticationView = Readonly<{
  principal: RepositoryPrincipalView;
  authenticatedAt: string;
}>;

type AccountScopeView = Readonly<{
  accountId: string;
  handle: string;
  kind: "personal" | "organization";
  status: "active" | "suspended";
}>;

type RepositoryView = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
  name: string;
  description: string;
  visibility: "public" | "private" | "internal";
  status: "active" | "archived" | "disabled";
}>;

type RepositoryAction =
  | "issue:read"
  | "issue:create"
  | "issue:comment"
  | "issue:triage"
  | "issue:manage";

type RepositoryDecisionView = Readonly<{
  repositoryId: string;
  principalId: string;
  action: RepositoryAction;
  allowed: boolean;
  reason: "owner" | "public" | "grant" | "archived" | "disabled" | "denied";
}>;

export type RepositoryCapabilityKey =
  "repository.overview" | "issue.read" | "issue.create" | "issue.manage";

export type RepositoryCapabilityContextV1 = Readonly<{
  envelope: Readonly<{
    viewer: RepositoryPrincipalView;
    actor: RepositoryPrincipalView;
    credential: Readonly<{
      type: "browser-session";
      method: "mock-password";
      assurance: "single-factor";
      authenticatedAt: string;
    }>;
    correlationId: string;
    activeScope: Readonly<{
      type: "personal" | "organization";
      accountId: string;
    }>;
  }>;
  owner: AccountScopeView;
  organization?: AccountScopeView;
  repository: RepositoryView;
  capability: Readonly<{
    key: RepositoryCapabilityKey;
    resourceType: "repository";
  }>;
  requestedAction: RepositoryAction;
  authorizationDecision: RepositoryDecisionView;
}>;

export interface AccountContextPort {
  resolve(accountId: string): Promise<AccountScopeView | undefined>;
}

export interface RepositoryContextPort {
  resolve(
    repositoryId: string,
    principal: RepositoryPrincipalView,
  ): Promise<RepositoryView | undefined>;
  authorize(input: {
    repositoryId: string;
    principal: RepositoryPrincipalView;
    action: RepositoryAction;
  }): Promise<RepositoryDecisionView>;
}

const capabilities: Readonly<
  Record<RepositoryCapabilityKey, RepositoryAction>
> = {
  "repository.overview": "issue:read",
  "issue.read": "issue:read",
  "issue.create": "issue:create",
  "issue.manage": "issue:manage",
};

export function createRepositoryCapabilityContextResolver(
  accounts: AccountContextPort,
  repositories: RepositoryContextPort,
) {
  return async function resolve(input: {
    authentication: RepositoryAuthenticationView;
    activeScopeAccountId: string;
    repositoryId: string;
    capabilityKey: RepositoryCapabilityKey;
    correlationId: string;
  }): Promise<RepositoryCapabilityContextV1> {
    const requestedAction = capabilities[input.capabilityKey];
    const repository = await repositories.resolve(
      input.repositoryId,
      input.authentication.principal,
    );
    if (!repository) throw new Error("Repository context cannot be resolved.");
    if (repository.ownerAccountId !== input.activeScopeAccountId)
      throw new Error("Repository is outside the active Account scope.");

    const owner = await accounts.resolve(repository.ownerAccountId);
    if (!owner) throw new Error("Repository owner cannot be resolved.");
    const authorizationDecision = await repositories.authorize({
      repositoryId: repository.repositoryId,
      principal: input.authentication.principal,
      action: requestedAction,
    });

    return {
      envelope: {
        viewer: input.authentication.principal,
        actor: input.authentication.principal,
        credential: {
          type: "browser-session",
          method: "mock-password",
          assurance: "single-factor",
          authenticatedAt: input.authentication.authenticatedAt,
        },
        correlationId: input.correlationId,
        activeScope: {
          type: owner.kind === "organization" ? "organization" : "personal",
          accountId: owner.accountId,
        },
      },
      owner,
      organization: owner.kind === "organization" ? owner : undefined,
      repository,
      capability: { key: input.capabilityKey, resourceType: "repository" },
      requestedAction,
      authorizationDecision,
    };
  };
}
