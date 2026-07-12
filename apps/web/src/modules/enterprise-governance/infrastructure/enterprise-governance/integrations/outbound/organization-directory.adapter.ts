import type { AccountDirectoryApiV1 } from "@/src/modules/account/contracts/account/public";

import type { OrganizationDirectory } from "../../../../application/enterprise-governance/ports/outbound/organization-directory.port";

export class OrganizationDirectoryAdapter implements OrganizationDirectory {
  constructor(private readonly accounts: AccountDirectoryApiV1) {}

  async resolve(organizationAccountId: string) {
    const result = await this.accounts.eligibility(organizationAccountId);
    return result?.account.kind === "organization"
      ? {
          organizationAccountId: result.account.accountId,
          status: result.account.status,
        }
      : undefined;
  }
}
