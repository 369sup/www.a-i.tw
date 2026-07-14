import type { RepositoryAccessGrantStore } from "../../../application/ports/outbound/repository-access-grant-store.port";
import {
  createRepositoryAccessGrant,
  type RepositoryAccessGrant,
} from "../../../domain/repository-governance/aggregates/repository-access-grant";

export type RepositoryAccessGrantSeed = Readonly<{
  repositoryId: string;
  subject:
    | Readonly<{ type: "principal"; principalId: string }>
    | Readonly<{ type: "team"; teamId: string }>;
  role: string;
}>;

export class InMemoryRepositoryAccessGrantStore implements RepositoryAccessGrantStore {
  private readonly grants = new Map<string, RepositoryAccessGrant>();

  constructor(seed: readonly RepositoryAccessGrantSeed[] = []) {
    seed.map(createRepositoryAccessGrant).forEach((grant) => this.store(grant));
  }

  async list(repositoryId: string) {
    return [...this.grants.values()].filter(
      (grant) => grant.repositoryId === repositoryId,
    );
  }

  async save(grant: RepositoryAccessGrant) {
    this.store(createRepositoryAccessGrant(grant));
  }

  private store(grant: RepositoryAccessGrant) {
    const subjectId =
      grant.subject.type === "principal"
        ? grant.subject.principalId
        : grant.subject.teamId;
    this.grants.set(
      `${grant.repositoryId}:${grant.subject.type}:${subjectId}`,
      grant,
    );
  }
}
