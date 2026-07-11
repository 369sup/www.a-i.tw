import type {
  AccountEligibilityV1,
  MembershipFactV1,
} from "@/src/modules/account/src/contracts/public";
import type { PrincipalRefV1 } from "@/src/modules/identity-access/src/contracts/public";
import type {
  RepositoryAccessDecisionV1,
  RepositoryRefV1,
  RepositoryRoleV1,
  RepositoryVisibilityV1,
} from "../contracts/public";
import {
  decideRepositoryAccess,
  type RepositoryAction,
} from "../domain/authorization";
import {
  archiveRepository,
  changeVisibility,
  createRepository,
  renameRepository,
  unarchiveRepository,
  type AccessGrant,
  type Repository,
} from "../domain/repository";

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
export interface AccountDirectoryGateway {
  eligibility(accountId: string): Promise<AccountEligibilityV1 | undefined>;
  membership(
    accountId: string,
    principalId: string,
  ): Promise<MembershipFactV1 | undefined>;
}
export interface RepositoryService {
  listVisible(principal?: PrincipalRefV1): Promise<RepositoryRefV1[]>;
  get(
    repositoryId: string,
    principal?: PrincipalRefV1,
  ): Promise<
    | { repository: RepositoryRefV1; decision: RepositoryAccessDecisionV1 }
    | undefined
  >;
  create(input: {
    principal: PrincipalRefV1;
    ownerAccountId: string;
    name: string;
    description: string;
    visibility: RepositoryVisibilityV1;
  }): Promise<RepositoryRefV1>;
  rename(
    repositoryId: string,
    name: string,
    principal: PrincipalRefV1,
  ): Promise<RepositoryRefV1>;
  setVisibility(
    repositoryId: string,
    visibility: RepositoryVisibilityV1,
    principal: PrincipalRefV1,
  ): Promise<RepositoryRefV1>;
  setArchived(
    repositoryId: string,
    archived: boolean,
    principal: PrincipalRefV1,
  ): Promise<RepositoryRefV1>;
  grant(
    repositoryId: string,
    granteePrincipalId: string,
    role: RepositoryRoleV1,
    principal: PrincipalRefV1,
  ): Promise<void>;
}

export function createRepositoryService(
  store: RepositoryStore,
  grants: AccessGrantStore,
  accounts: AccountDirectoryGateway,
  nextId: () => string,
): RepositoryService {
  async function decision(
    repository: Repository,
    action: RepositoryAction,
    principal?: PrincipalRefV1,
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
    });
  }
  async function requireAllowed(
    repository: Repository,
    action: RepositoryAction,
    principal: PrincipalRefV1,
  ) {
    const result = await decision(repository, action, principal);
    if (!result.allowed)
      throw new Error(`Repository action denied: ${result.reason}.`);
  }
  return {
    async listVisible(principal) {
      const visible: RepositoryRefV1[] = [];
      for (const repository of await store.list())
        if ((await decision(repository, "read", principal)).allowed)
          visible.push(toRef(repository));
      return visible;
    },
    async get(repositoryId, principal) {
      const repository = await store.find(repositoryId);
      if (!repository) return undefined;
      const result = await decision(repository, "read", principal);
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
        ownerHandle: eligibility.account.handle,
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
      await requireAllowed(repository, "rename", principal);
      const updated = renameRepository(repository, name);
      if (await store.findByOwnerAndName(updated.ownerAccountId, updated.name))
        throw new Error("Repository name already exists in this namespace.");
      await store.save(updated);
      return toRef(updated);
    },
    async setVisibility(repositoryId, visibility, principal) {
      const repository = await required(store, repositoryId);
      await requireAllowed(repository, "change-visibility", principal);
      const updated = changeVisibility(repository, visibility);
      await store.save(updated);
      return toRef(updated);
    },
    async setArchived(repositoryId, archived, principal) {
      const repository = await required(store, repositoryId);
      await requireAllowed(
        repository,
        archived ? "archive" : "unarchive",
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
      await requireAllowed(repository, "manage-access", principal);
      await grants.save({
        repositoryId,
        principalId: granteePrincipalId,
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
    ownerHandle: repository.ownerHandle,
    name: repository.name,
    description: repository.description,
    visibility: repository.visibility,
    status: repository.status,
  };
}
