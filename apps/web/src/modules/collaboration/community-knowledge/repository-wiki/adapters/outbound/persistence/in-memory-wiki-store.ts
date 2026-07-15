import type { WikiStore } from "../../../application/ports/outbound/wiki-store-port";
import type { Wiki } from "../../../domain/repository-wiki/aggregates/wiki";

export function createInMemoryWikiStore(seed: readonly Wiki[] = []): WikiStore {
  const wikis = new Map(seed.map((wiki) => [wiki.repositoryId, wiki]));
  return {
    async findByRepositoryId(repositoryId) {
      return wikis.get(repositoryId);
    },
    async save(wiki) {
      wikis.set(wiki.repositoryId, wiki);
    },
  };
}
