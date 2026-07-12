import type { EnterpriseRepositoryGovernanceApiV1 } from "@/src/modules/enterprise-governance/contracts/enterprise-governance/public";

import type { EnterpriseRepositoryGovernance } from "../../../../application/repository/ports/outbound/enterprise-repository-governance.port";

export class EnterpriseRepositoryGovernanceAdapter implements EnterpriseRepositoryGovernance {
  constructor(
    private readonly enterpriseGovernance: EnterpriseRepositoryGovernanceApiV1,
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
