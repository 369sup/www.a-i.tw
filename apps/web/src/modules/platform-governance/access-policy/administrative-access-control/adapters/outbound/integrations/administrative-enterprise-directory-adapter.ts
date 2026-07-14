import type { EnterpriseAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/enterprise-account/contracts/v1/public";
import type { EnterpriseDirectory } from "../../../application/ports/outbound/enterprise-directory-port";

export class AdministrativeEnterpriseDirectoryAdapter implements EnterpriseDirectory {
  constructor(private readonly enterprises: EnterpriseAccountDirectoryApiV1) {}

  async exists(enterpriseId: string) {
    return Boolean(await this.enterprises.resolve(enterpriseId));
  }
}
