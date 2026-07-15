import type { RepositoryAccessGrant } from "../../../domain/repository-governance/aggregates/repository-access-grant";

export interface RepositoryAccessGrantStore {
  list(repositoryId: string): Promise<RepositoryAccessGrant[]>;
  save(grant: RepositoryAccessGrant): Promise<void>;
}
