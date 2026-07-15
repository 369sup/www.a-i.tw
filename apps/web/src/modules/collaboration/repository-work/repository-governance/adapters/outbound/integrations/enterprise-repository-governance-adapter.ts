import type { RepositoryPolicyDecisionApiV1 } from "@/src/modules/platform-governance/access-policy/policy-governance/contracts/v1/public";

import type { EnterpriseRepositoryGovernance } from "../../../application/ports/outbound/enterprise-repository-governance-port";

export class EnterpriseRepositoryGovernanceAdapter implements EnterpriseRepositoryGovernance {
  constructor(
    private readonly enterpriseGovernance: RepositoryPolicyDecisionApiV1,
  ) {}

  async constraintsForOwner(ownerAccountId: string) {
    const result =
      await this.enterpriseGovernance.constraintsForOrganization(
        ownerAccountId,
      );
    return result.status === "governed"
      ? {
          publicRepositoryCreation: result.publicRepositoryCreation,
          publicVisibilityChange: result.publicVisibilityChange,
        }
      : {
          publicRepositoryCreation: "allowed" as const,
          publicVisibilityChange: "allowed" as const,
        };
  }
}
