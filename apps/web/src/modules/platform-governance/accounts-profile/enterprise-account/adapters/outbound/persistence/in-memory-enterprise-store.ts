import type { EnterpriseStore } from "../../../application/ports/outbound/enterprise-store-port";
import {
  rehydrateEnterprise,
  type Enterprise,
} from "../../../domain/enterprise-account/aggregates/enterprise";

type EnterpriseSeed = Readonly<{
  id: string;
  name: string;
  status?: "active";
  organizationAffiliations?: readonly {
    organizationAccountId: string;
    affiliatedAt: string;
  }[];
}>;

export class InMemoryEnterpriseStore implements EnterpriseStore {
  private readonly enterprises = new Map<string, Enterprise>();

  constructor(seed: readonly EnterpriseSeed[] = []) {
    for (const item of seed) {
      const enterprise = rehydrateEnterprise({
        ...item,
        status: item.status ?? "active",
        organizationAffiliations: item.organizationAffiliations ?? [],
      });
      this.enterprises.set(enterprise.id, enterprise);
    }
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
