import type { RepositoryVisibilityPolicy } from "../../../domain/policy-governance/aggregates/repository-visibility-policy";

export interface RepositoryPolicyStore {
  find(enterpriseId: string): Promise<RepositoryVisibilityPolicy | undefined>;
  save(enterpriseId: string, policy: RepositoryVisibilityPolicy): Promise<void>;
}
