import type {
  RepositoryAccessDecisionV1,
  RepositoryCollaborationScopeV1,
  RepositoryParticipationActionV1,
  RepositoryParticipationDecisionV1,
  RepositoryRefV1,
  RepositoryRoleV1,
  RepositoryVisibilityV1,
} from "../../../contracts/repository/public";
import {
  decideRepositoryAccess,
  type RepositoryAction,
} from "../../../domain/repository/policies/authorization";
import {
  archiveRepository,
  changeVisibility,
  createRepository,
  renameRepository,
  unarchiveRepository,
  type AccessGrant,
  type Repository,
} from "../../../domain/repository/aggregates/repository";
import type { RepositoryPrincipal } from "../ports/inbound/repository-principal";
import type { AccountDirectory } from "../ports/outbound/account-directory.port";

export interface RepositoryStore {
  list(): Promise<Repository[]>;
  find(repositoryId: string): Promise<Repository | undefined>;
  findByOwnerAndName(
    ownerAccountId: string,
    name: string,
  ): Promise<Repository | undefined>;
  save(repository: Repository): Promise<void>;
}
export interface AccessGrantStore {
  list(repositoryId: string): Promise<AccessGrant[]>;
  save(grant: AccessGrant): Promise<void>;
}
export interface RepositoryService {
  listVisible(principal?: RepositoryPrincipal): Promise<RepositoryRefV1[]>;
  get(
    repositoryId: string,
    principal?: RepositoryPrincipal,
  ): Promise<
    | { repository: RepositoryRefV1; decision: RepositoryAccessDecisionV1 }
    | undefined
  >;
  create(input: {
    principal: RepositoryPrincipal;
    ownerAccountId: string;
    name: string;
    description: string;
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
  grant(
    repositoryId: string,
    granteePrincipalId: string,
    role: RepositoryRoleV1,
    principal: RepositoryPrincipal,
  ): Promise<void>;
  grantTeam(
    repositoryId: string,
    teamId: string,
    role: RepositoryRoleV1,
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
  grants: AccessGrantStore,
  accounts: AccountDirectory,
  nextId: () => string,
): RepositoryService {
  async function decision(
    repository: Repository,
    action: RepositoryAction,
    principal?: RepositoryPrincipal,
  ) {
    const owner = await accounts.membership(
      repository.ownerAccountId,
      principal?.principalId ?? "",
    );
    const ownerFact =
      owner?.role === "owner" ? owner.principalId : "__account-owner__";
    return decideRepositoryAccess({
      repository,
      principalId: principal?.principalId,
      ownerPrincipalId: ownerFact,
      action,
      grants: await grants.list(repository.id),
      teamIds: principal
        ? await accounts.teamIds(
            repository.ownerAccountId,
            principal.principalId,
          )
        : [],
    });
  }
  async function requireAllowed(
    repository: Repository,
    action: RepositoryAction,
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
          ownerAccountId: repository.ownerAccountId,
          status: repository.status,
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
      const action: RepositoryAction = input.action;
      const result = await decision(repository, action, input.principal);
      const reason =
        result.reason === "owner"
          ? "owner"
          : result.reason === "public-read"
            ? "public"
            : result.reason === "archived"
              ? "archived"
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
      const repository = createRepository({
        id: nextId(),
        ownerAccountId: input.ownerAccountId,
        name: input.name,
        description: input.description,
        visibility: input.visibility,
      });
      if (
        await store.findByOwnerAndName(
          repository.ownerAccountId,
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
      if (await store.findByOwnerAndName(updated.ownerAccountId, updated.name))
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
    async grant(repositoryId, granteePrincipalId, role, principal) {
      const repository = await required(store, repositoryId);
      await requireAllowed(repository, "repository:manage-access", principal);
      await grants.save({
        repositoryId,
        subject: { type: "principal", principalId: granteePrincipalId },
        role,
      });
    },
    async grantTeam(repositoryId, teamId, role, principal) {
      const repository = await required(store, repositoryId);
      await requireAllowed(repository, "repository:manage-access", principal);
      await grants.save({
        repositoryId,
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
    ownerAccountId: repository.ownerAccountId,
    name: repository.name,
    description: repository.description,
    visibility: repository.visibility,
    status: repository.status,
  };
}
