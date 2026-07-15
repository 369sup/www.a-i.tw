import type { RepositoryInteractionLimit } from "../../../domain/community-safety/aggregates/repository-interaction-limit";

export interface RepositoryInteractionLimitStore {
  find(repositoryId: string): Promise<RepositoryInteractionLimit | undefined>;
  save(limit: RepositoryInteractionLimit): Promise<void>;
}
