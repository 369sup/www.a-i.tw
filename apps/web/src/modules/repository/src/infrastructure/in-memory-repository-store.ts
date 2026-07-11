import type {
  AccessGrantStore,
  RepositoryStore,
} from "../application/repository-service";
import type { AccessGrant, Repository } from "../domain/repository";

export class InMemoryRepositoryStore implements RepositoryStore {
  private readonly items = new Map<string, Repository>();
  constructor(seed: Repository[] = []) {
    seed.forEach((item) => this.items.set(item.id, item));
  }
  async list() {
    return [...this.items.values()];
  }
  async find(id: string) {
    return this.items.get(id);
  }
  async findByOwnerAndName(ownerAccountId: string, name: string) {
    return [...this.items.values()].find(
      (item) => item.ownerAccountId === ownerAccountId && item.name === name,
    );
  }
  async save(repository: Repository) {
    this.items.set(repository.id, repository);
  }
}

export class InMemoryAccessGrantStore implements AccessGrantStore {
  private readonly grants = new Map<string, AccessGrant>();
  async list(repositoryId: string) {
    return [...this.grants.values()].filter(
      (item) => item.repositoryId === repositoryId,
    );
  }
  async save(grant: AccessGrant) {
    this.grants.set(`${grant.repositoryId}:${grant.principalId}`, grant);
  }
}
