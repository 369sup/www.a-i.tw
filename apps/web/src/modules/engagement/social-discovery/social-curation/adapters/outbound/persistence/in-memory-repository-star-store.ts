import type { RepositoryStarStore } from "../../../application/ports/outbound/repository-star-store-port";
import type { RepositoryStar } from "../../../domain/social-curation/aggregates/repository-star";

const keyOf = (principalId: string, repositoryId: string) =>
  `${principalId}\u0000${repositoryId}`;

export function createInMemoryRepositoryStarStore(
  seed: readonly RepositoryStar[] = [],
): RepositoryStarStore {
  const records = new Map(
    seed.map((star) => [keyOf(star.principalId, star.repositoryId), star]),
  );
  return {
    async find(principalId, repositoryId) {
      return records.get(keyOf(principalId, repositoryId));
    },
    async listByPrincipal(principalId) {
      return [...records.values()].filter(
        (star) => star.principalId === principalId,
      );
    },
    async save(star) {
      records.set(keyOf(star.principalId, star.repositoryId), star);
    },
    async delete(principalId, repositoryId) {
      records.delete(keyOf(principalId, repositoryId));
    },
  };
}
