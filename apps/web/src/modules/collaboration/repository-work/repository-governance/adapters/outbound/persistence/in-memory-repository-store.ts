import type { RepositoryStore } from "../../../application/use-cases/repository-service";
import {
  createRepository,
  type Repository,
} from "../../../domain/repository-governance/aggregates/repository";

export type RepositorySeed = Readonly<{
  id: string;
  owner: Readonly<{
    accountId: string;
    login: string;
    kind: "personal" | "organization";
  }>;
  name: string;
  description: string;
  homepageUrl?: string;
  visibility: "public" | "private" | "internal";
}>;

export class InMemoryRepositoryStore implements RepositoryStore {
  private readonly items = new Map<string, Repository>();
  constructor(seed: RepositorySeed[] = []) {
    seed.map(createRepository).forEach((item) => this.items.set(item.id, item));
  }
  async list() {
    return [...this.items.values()];
  }
  async find(id: string) {
    return this.items.get(id);
  }
  async findByOwnerAndName(ownerAccountId: string, name: string) {
    return [...this.items.values()].find(
      (item) => item.owner.accountId === ownerAccountId && item.name === name,
    );
  }
  async save(repository: Repository) {
    this.items.set(repository.id, repository);
  }
}
