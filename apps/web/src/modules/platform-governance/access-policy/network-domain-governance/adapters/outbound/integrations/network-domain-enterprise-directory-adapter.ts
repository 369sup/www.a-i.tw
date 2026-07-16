import type { EnterpriseAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/enterprise-account/contracts/v1/public";
import type { NetworkDomainEnterpriseDirectory } from "../../../application/ports/outbound/network-domain-enterprise-directory";

export class NetworkDomainEnterpriseDirectoryAdapter implements NetworkDomainEnterpriseDirectory {
  constructor(private readonly enterprises: EnterpriseAccountDirectoryApiV1) {}

  async resolve(enterpriseId: string) {
    const enterprise = await this.enterprises.resolve(enterpriseId);
    return (
      enterprise && {
        enterpriseId: enterprise.enterpriseId,
        name: enterprise.name,
      }
    );
  }
}
