import type { Enterprise } from "../../../domain/enterprise-account/aggregates/enterprise";

export interface EnterpriseStore {
  list(): Promise<Enterprise[]>;
  find(enterpriseId: string): Promise<Enterprise | undefined>;
  findByOrganization(
    organizationAccountId: string,
  ): Promise<Enterprise | undefined>;
  save(enterprise: Enterprise): Promise<void>;
}
