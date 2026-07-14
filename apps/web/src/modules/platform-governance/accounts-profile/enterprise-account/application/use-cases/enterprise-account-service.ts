import type {
  EnterpriseAccountDirectoryApiV1,
  EnterpriseSummaryV1,
} from "../../contracts/v1/public";
import {
  affiliateOrganization,
  createEnterprise,
  type Enterprise,
} from "../../domain/enterprise-account/aggregates/enterprise";
import type { OrganizationAccountDirectory } from "../ports/outbound/organization-account-directory-port";

export interface EnterpriseStore {
  list(): Promise<Enterprise[]>;
  find(enterpriseId: string): Promise<Enterprise | undefined>;
  findByOrganization(
    organizationAccountId: string,
  ): Promise<Enterprise | undefined>;
  save(enterprise: Enterprise): Promise<void>;
}

export interface EnterpriseAccountService extends EnterpriseAccountDirectoryApiV1 {
  list(): Promise<EnterpriseSummaryV1[]>;
  create(input: { name: string }): Promise<EnterpriseSummaryV1>;
  affiliateOrganization(input: {
    enterpriseId: string;
    organizationAccountId: string;
  }): Promise<EnterpriseSummaryV1>;
}

export function createEnterpriseAccountService(
  store: EnterpriseStore,
  organizations: OrganizationAccountDirectory,
  nextId: () => string,
  clock: () => Date,
): EnterpriseAccountService {
  const summary = (enterprise: Enterprise): EnterpriseSummaryV1 => ({
    enterpriseId: enterprise.id,
    name: enterprise.name,
    organizationAccountIds: enterprise.organizationAffiliations.map(
      (item) => item.organizationAccountId,
    ),
  });
  return {
    async list() {
      return (await store.list()).map(summary);
    },
    async create(input) {
      const enterprise = createEnterprise({ id: nextId(), name: input.name });
      await store.save(enterprise);
      return summary(enterprise);
    },
    async affiliateOrganization(input) {
      const enterprise = await store.find(input.enterpriseId);
      if (!enterprise) throw new Error("Enterprise not found.");
      const organization = await organizations.resolve(
        input.organizationAccountId,
      );
      if (!organization || organization.status !== "active")
        throw new Error("Active Organization Account not found.");
      const existing = await store.findByOrganization(
        input.organizationAccountId,
      );
      if (existing && existing.id !== enterprise.id)
        throw new Error("Organization is already governed by an Enterprise.");
      const updated = affiliateOrganization(
        enterprise,
        input.organizationAccountId,
        clock().toISOString(),
      );
      await store.save(updated);
      return summary(updated);
    },
    async resolve(enterpriseId) {
      const enterprise = await store.find(enterpriseId);
      return enterprise && summary(enterprise);
    },
    async findByOrganization(organizationAccountId) {
      const enterprise = await store.findByOrganization(organizationAccountId);
      return enterprise && summary(enterprise);
    },
  };
}
