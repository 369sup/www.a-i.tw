import type { Wiki } from "../../../domain/repository-wiki/aggregates/wiki";

export interface WikiStore {
  findByRepositoryId(repositoryId: string): Promise<Wiki | undefined>;
  save(wiki: Wiki): Promise<void>;
}
