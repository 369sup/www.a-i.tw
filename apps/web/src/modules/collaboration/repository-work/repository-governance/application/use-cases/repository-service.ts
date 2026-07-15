import type {
  RepositoryCollaborationScopeV1,
  RepositoryParticipationActionV1,
  RepositoryParticipationDecisionV1,
  RepositoryRefV1,
  RepositoryVisibilityV1,
} from "../../contracts/v1/public";
import {
  archiveRepository,
  changeVisibility,
  configureRepositoryWiki,
  createRepository,
  renameRepository,
  unarchiveRepository,
  type Repository,
} from "../../domain/repository-governance/aggregates/repository";
import type { RepositoryPrincipal } from "../ports/inbound/repository-principal";
import type { AccountDirectory } from "../ports/outbound/account-directory-port";
import type { EnterpriseRepositoryGovernance } from "../ports/outbound/enterprise-repository-governance-port";
import type {
  RepositoryAuthorization,
  RepositoryAuthorizationAction,
  RepositoryAuthorizationDecision,
  RepositoryAuthorizationRole,
} from "../ports/outbound/repository-authorization-port";

export interface RepositoryStore {
  list(): Promise<Repository[]>;
  find(repositoryId: string): Promise<Repository | undefined>;
  findByOwnerAndName(
    ownerAccountId: string,
    name: string,
  ): Promise<Repository | undefined>;
  save(repository: Repository): Promise<void>;
}
export interface RepositoryService {
  listVisible(principal?: RepositoryPrincipal): Promise<RepositoryRefV1[]>;
  get(
    repositoryId: string,
    principal?: RepositoryPrincipal,
  ): Promise<
    | { repository: RepositoryRefV1; decision: RepositoryAuthorizationDecision }
    | undefined
  >;
  create(input: {
    principal: RepositoryPrincipal;
    ownerAccountId: string;
    name: string;
    description: string;
    homepageUrl?: string;
    visibility: RepositoryVisibilityV1;
  }): Promise<RepositoryRefV1>;
  rename(
    repositoryId: string,
    name: string,
    principal: RepositoryPrincipal,
  ): Promise<RepositoryRefV1>;
  setVisibility(
    repositoryId: string,
    visibility: RepositoryVisibilityV1,
    principal: RepositoryPrincipal,
  ): Promise<RepositoryRefV1>;
  setArchived(
    repositoryId: string,
    archived: boolean,
    principal: RepositoryPrincipal,
  ): Promise<RepositoryRefV1>;
  setWikiEnabled(
    repositoryId: string,
    enabled: boolean,
    principal: RepositoryPrincipal,
  ): Promise<void>;
  grant(
    repositoryId: string,
    granteePrincipalId: string,
    role: RepositoryAuthorizationRole,
    principal: RepositoryPrincipal,
  ): Promise<void>;
  grantTeam(
    repositoryId: string,
    teamId: string,
    role: RepositoryAuthorizationRole,
    principal: RepositoryPrincipal,
  ): Promise<void>;
  collaborationScope(
    repositoryId: string,
  ): Promise<RepositoryCollaborationScopeV1 | undefined>;
  participation(input: {
    repositoryId: string;
    principal: RepositoryPrincipal;
    action: RepositoryParticipationActionV1;
  }): Promise<RepositoryParticipationDecisionV1>;
}

export function createRepositoryService(
  store: RepositoryStore,
  accounts: AccountDirectory,
  enterpriseGovernance: EnterpriseRepositoryGovernance,
  authorization: RepositoryAuthorization,
  nextId: () => string,
): RepositoryService {
  async function decision(
    repository: Repository,
    action: RepositoryAuthorizationAction,
    principal?: RepositoryPrincipal,
  ) {
    return authorization.decide({
      repository: toAuthorizationResource(repository),
      principal,
      action,
    });
  }
  async function requireAllowed(
    repository: Repository,
    action: RepositoryAuthorizationAction,
    principal: RepositoryPrincipal,
  ) {
    const result = await decision(repository, action, principal);
    if (!result.allowed)
      throw new Error(`Repository action denied: ${result.reason}.`);
  }
  return {
    async collaborationScope(repositoryId) {
      const repository = await store.find(repositoryId);
      return (
        repository && {
          repositoryId: repository.id,
          ownerAccountId: repository.owner.accountId,
          visibility: repository.visibility,
          status: repository.status,
          features: repository.features,
        }
      );
    },
    async participation(input) {
      const repository = await store.find(input.repositoryId);
      if (!repository)
        return {
          repositoryId: input.repositoryId,
          principalId: input.principal.principalId,
          action: input.action,
          allowed: false,
          reason: "denied",
        };
      const action: RepositoryAuthorizationAction = input.action;
      const result = await decision(repository, action, input.principal);
      const reason =
        result.reason === "owner"
          ? "owner"
          : result.reason === "public-read"
            ? "public"
            : result.reason === "archived"
              ? "archived"
              : result.reason === "disabled"
                ? "disabled"
                : result.allowed
                  ? "grant"
                  : "denied";
      return {
        repositoryId: repository.id,
        principalId: input.principal.principalId,
        action: input.action,
        allowed: result.allowed,
        reason,
      };
    },
    async listVisible(principal) {
      const visible: RepositoryRefV1[] = [];
      for (const repository of await store.list())
        if ((await decision(repository, "repository:read", principal)).allowed)
          visible.push(toRef(repository));
      return visible;
    },
    async get(repositoryId, principal) {
      const repository = await store.find(repositoryId);
      if (!repository) return undefined;
      const result = await decision(repository, "repository:read", principal);
      return result.allowed
        ? { repository: toRef(repository), decision: result }
        : undefined;
    },
    async create(input) {
      const eligibility = await accounts.eligibility(input.ownerAccountId);
      if (!eligibility?.canOwnRepository)
        throw new Error("Owner account cannot own repositories.");
      const membership = await accounts.membership(
        input.ownerAccountId,
        input.principal.principalId,
      );
      if (membership?.role !== "owner")
        throw new Error("Only an account owner can create repositories.");
      if (input.visibility === "public") {
        const constraints = await enterpriseGovernance.constraintsForOwner(
          input.ownerAccountId,
        );
        if (constraints.publicRepositoryCreation === "forbidden")
          throw new Error(
            "Enterprise policy forbids Public Repository creation.",
          );
      }
      const repository = createRepository({
        id: nextId(),
        owner: {
          accountId: eligibility.account.accountId,
          login: eligibility.account.handle,
          kind: eligibility.account.kind,
        },
        name: input.name,
        description: input.description,
        homepageUrl: input.homepageUrl,
        visibility: input.visibility,
      });
      if (
        await store.findByOwnerAndName(
          repository.owner.accountId,
          repository.name,
        )
      )
        throw new Error("Repository name already exists in this namespace.");
      await store.save(repository);
      return toRef(repository);
    },
    async rename(repositoryId, name, principal) {
      const repository = await required(store, repositoryId);
      await requireAllowed(repository, "repository:rename", principal);
      const updated = renameRepository(repository, name);
      if (await store.findByOwnerAndName(updated.owner.accountId, updated.name))
        throw new Error("Repository name already exists in this namespace.");
      await store.save(updated);
      return toRef(updated);
    },
    async setVisibility(repositoryId, visibility, principal) {
      const repository = await required(store, repositoryId);
      await requireAllowed(
        repository,
        "repository:change-visibility",
        principal,
      );
      if (visibility === "public") {
        const constraints = await enterpriseGovernance.constraintsForOwner(
          repository.owner.accountId,
        );
        if (constraints.publicVisibilityChange === "forbidden")
          throw new Error(
            "Enterprise policy forbids Public Repository visibility.",
          );
      }
      const updated = changeVisibility(repository, visibility);
      await store.save(updated);
      return toRef(updated);
    },
    async setArchived(repositoryId, archived, principal) {
      const repository = await required(store, repositoryId);
      await requireAllowed(
        repository,
        archived ? "repository:archive" : "repository:unarchive",
        principal,
      );
      const updated = archived
        ? archiveRepository(repository)
        : unarchiveRepository(repository);
      await store.save(updated);
      return toRef(updated);
    },
    async setWikiEnabled(repositoryId, enabled, principal) {
      const repository = await required(store, repositoryId);
      await requireAllowed(
        repository,
        "repository:configure-features",
        principal,
      );
      await store.save(configureRepositoryWiki(repository, enabled));
    },
    async grant(repositoryId, granteePrincipalId, role, principal) {
      const repository = await required(store, repositoryId);
      await authorization.grant({
        repository: toAuthorizationResource(repository),
        actor: principal,
        subject: { type: "principal", principalId: granteePrincipalId },
        role,
      });
    },
    async grantTeam(repositoryId, teamId, role, principal) {
      const repository = await required(store, repositoryId);
      await authorization.grant({
        repository: toAuthorizationResource(repository),
        actor: principal,
        subject: { type: "team", teamId },
        role,
      });
    },
  };
}

async function required(store: RepositoryStore, id: string) {
  const item = await store.find(id);
  if (!item) throw new Error("Repository not found.");
  return item;
}
function toRef(repository: Repository): RepositoryRefV1 {
  return {
    repositoryId: repository.id,
    ownerAccountId: repository.owner.accountId,
    name: repository.name,
    description: repository.description,
    homepageUrl: repository.homepageUrl,
    visibility: repository.visibility,
    status: repository.status,
  };
}

function toAuthorizationResource(
  repository: Repository,
): import("../ports/outbound/repository-authorization-port").RepositoryAuthorizationResource {
  return {
    repositoryId: repository.id,
    ownerAccountId: repository.owner.accountId,
    visibility: repository.visibility,
    status: repository.status,
  };
}
