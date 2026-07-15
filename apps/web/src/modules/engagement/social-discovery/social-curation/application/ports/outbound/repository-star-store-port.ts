import type { RepositoryStar } from "../../../domain/social-curation/aggregates/repository-star";

export interface RepositoryStarStore {
  find(
    principalId: string,
    repositoryId: string,
  ): Promise<RepositoryStar | undefined>;
  listByPrincipal(principalId: string): Promise<readonly RepositoryStar[]>;
  save(star: RepositoryStar): Promise<void>;
  delete(principalId: string, repositoryId: string): Promise<void>;
}
