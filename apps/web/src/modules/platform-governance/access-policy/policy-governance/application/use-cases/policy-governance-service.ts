import {
  defaultRepositoryVisibilityPolicy,
  type RepositoryVisibilityPolicy,
} from "../../domain/policy-governance/aggregates/repository-visibility-policy";
import type { PolicyEnterpriseDirectory } from "../ports/outbound/enterprise-directory.port";
import type { RepositoryPolicyStore } from "../ports/outbound/repository-policy-store.port";

export function createPolicyGovernanceService(
  store: RepositoryPolicyStore,
  enterprises: PolicyEnterpriseDirectory,
) {
  return {
    async initialize(enterpriseId: string) {
      await store.save(enterpriseId, defaultRepositoryVisibilityPolicy);
    },
    async set(enterpriseId: string, policy: RepositoryVisibilityPolicy) {
      await store.save(enterpriseId, policy);
    },
    async get(enterpriseId: string) {
      return (
        (await store.find(enterpriseId)) ?? defaultRepositoryVisibilityPolicy
      );
    },
    async constraintsForOrganization(organizationAccountId: string) {
      const enterprise = await enterprises.findByOrganization(
        organizationAccountId,
      );
      return enterprise
        ? {
            status: "governed" as const,
            organizationAccountId,
            enterpriseId: enterprise.enterpriseId,
            ...(await this.get(enterprise.enterpriseId)),
          }
        : { status: "unaffiliated" as const, organizationAccountId };
    },
  };
}
