import type { EnterpriseStore } from "../../../application/enterprise-governance/use-cases/enterprise-governance-service";
import type { Enterprise } from "../../../domain/enterprise-governance/aggregates/enterprise";

export class InMemoryEnterpriseStore implements EnterpriseStore {
  private readonly enterprises = new Map<string, Enterprise>();

  constructor(seed: readonly Enterprise[] = []) {
    for (const enterprise of seed)
      this.enterprises.set(enterprise.id, enterprise);
  }

  async list() {
    return [...this.enterprises.values()];
  }

  async find(enterpriseId: string) {
    return this.enterprises.get(enterpriseId);
  }

  async findByOrganization(organizationAccountId: string) {
    return [...this.enterprises.values()].find((enterprise) =>
      enterprise.organizationAffiliations.some(
        (item) => item.organizationAccountId === organizationAccountId,
      ),
    );
  }

  async save(enterprise: Enterprise) {
    this.enterprises.set(enterprise.id, enterprise);
  }
}
