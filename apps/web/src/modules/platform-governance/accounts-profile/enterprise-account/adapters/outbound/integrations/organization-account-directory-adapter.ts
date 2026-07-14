import type { OrganizationAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/organization-account/contracts/v1/public";

import type { OrganizationAccountDirectory } from "../../../application/ports/outbound/organization-account-directory-port";

export class OrganizationAccountDirectoryAdapter implements OrganizationAccountDirectory {
  constructor(private readonly accounts: OrganizationAccountDirectoryApiV1) {}

  async resolve(organizationAccountId: string) {
    const result = await this.accounts.eligibility(organizationAccountId);
    return result
      ? {
          organizationAccountId: result.account.accountId,
          status: result.account.status,
        }
      : undefined;
  }
}
