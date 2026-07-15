import type { RepositoryInteractionLimitStore } from "../../../application/ports/outbound/repository-interaction-limit-store-port";
import type { RepositoryInteractionLimit } from "../../../domain/community-safety/aggregates/repository-interaction-limit";

export function createInMemoryRepositoryInteractionLimitStore(
  seed: readonly RepositoryInteractionLimit[] = [],
): RepositoryInteractionLimitStore {
  const records = new Map(seed.map((item) => [item.repositoryId, item]));
  return {
    async find(repositoryId) {
      return records.get(repositoryId);
    },
    async save(limit) {
      records.set(limit.repositoryId, limit);
    },
  };
}
