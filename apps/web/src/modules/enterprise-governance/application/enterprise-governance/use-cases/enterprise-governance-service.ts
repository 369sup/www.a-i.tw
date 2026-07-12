import type {
  EnterpriseRepositoryGovernanceApiV1,
  EnterpriseSummaryV1,
} from "../../../contracts/enterprise-governance/public";
import {
  affiliateOrganization,
  createEnterprise,
  requireEnterpriseOwner,
  setRepositoryVisibilityPolicy,
  type Enterprise,
  type RepositoryVisibilityPolicy,
} from "../../../domain/enterprise-governance/aggregates/enterprise";
import type { OrganizationDirectory } from "../ports/outbound/organization-directory.port";

export interface EnterpriseStore {
  list(): Promise<Enterprise[]>;
  find(enterpriseId: string): Promise<Enterprise | undefined>;
  findByOrganization(
    organizationAccountId: string,
  ): Promise<Enterprise | undefined>;
  save(enterprise: Enterprise): Promise<void>;
}

export interface EnterpriseGovernanceService extends EnterpriseRepositoryGovernanceApiV1 {
  create(input: {
    name: string;
    actorPrincipalId: string;
  }): Promise<EnterpriseSummaryV1>;
  affiliateOrganization(input: {
    enterpriseId: string;
    organizationAccountId: string;
    actorPrincipalId: string;
  }): Promise<EnterpriseSummaryV1>;
  setRepositoryVisibilityPolicy(input: {
    enterpriseId: string;
    policy: RepositoryVisibilityPolicy;
    actorPrincipalId: string;
  }): Promise<EnterpriseSummaryV1>;
}

export function createEnterpriseGovernanceService(
  store: EnterpriseStore,
  organizations: OrganizationDirectory,
  nextId: () => string,
  clock: () => Date,
): EnterpriseGovernanceService {
  const summary = (enterprise: Enterprise): EnterpriseSummaryV1 => ({
    enterpriseId: enterprise.id,
    name: enterprise.name,
    organizationAccountIds: enterprise.organizationAffiliations.map(
      (item) => item.organizationAccountId,
    ),
    repositoryVisibilityPolicy: enterprise.repositoryVisibilityPolicy,
  });
  const required = async (enterpriseId: string) => {
    const enterprise = await store.find(enterpriseId);
    if (!enterprise) throw new Error("Enterprise not found.");
    return enterprise;
  };
  return {
    async create(input) {
      const enterprise = createEnterprise({
        id: nextId(),
        name: input.name,
        foundingOwnerPrincipalId: input.actorPrincipalId,
      });
      await store.save(enterprise);
      return summary(enterprise);
    },
    async affiliateOrganization(input) {
      const enterprise = await required(input.enterpriseId);
      requireEnterpriseOwner(enterprise, input.actorPrincipalId);
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
    async setRepositoryVisibilityPolicy(input) {
      const enterprise = await required(input.enterpriseId);
      requireEnterpriseOwner(enterprise, input.actorPrincipalId);
      const updated = setRepositoryVisibilityPolicy(enterprise, input.policy);
      await store.save(updated);
      return summary(updated);
    },
    async constraintsForOrganization(organizationAccountId) {
      const enterprise = await store.findByOrganization(organizationAccountId);
      return enterprise
        ? {
            status: "governed",
            organizationAccountId,
            enterpriseId: enterprise.id,
            ...enterprise.repositoryVisibilityPolicy,
          }
        : { status: "unaffiliated", organizationAccountId };
    },
  };
}
