import type { EnterpriseAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/enterprise-account/contracts/v1/public";
import type { PolicyEnterpriseDirectory } from "../../../application/ports/outbound/enterprise-directory-port";

export class PolicyEnterpriseDirectoryAdapter implements PolicyEnterpriseDirectory {
  constructor(private readonly enterprises: EnterpriseAccountDirectoryApiV1) {}

  async findByOrganization(organizationAccountId: string) {
    const enterprise = await this.enterprises.findByOrganization(
      organizationAccountId,
    );
    return enterprise && { enterpriseId: enterprise.enterpriseId };
  }
}
