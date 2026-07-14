import type { RepositoryPolicyStore } from "../../../application/ports/outbound/repository-policy-store.port";
import type { RepositoryVisibilityPolicy } from "../../../domain/policy-governance/aggregates/repository-visibility-policy";

export class InMemoryRepositoryPolicyStore implements RepositoryPolicyStore {
  private readonly policies = new Map<string, RepositoryVisibilityPolicy>();
  async find(enterpriseId: string) {
    return this.policies.get(enterpriseId);
  }
  async save(enterpriseId: string, policy: RepositoryVisibilityPolicy) {
    this.policies.set(enterpriseId, policy);
  }
}
