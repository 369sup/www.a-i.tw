import type { PersonalAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/user-account/contracts/v1/public";
import type { OrganizationAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/organization-account/contracts/v1/public";
import type { OrganizationParticipationApiV1 } from "@/src/modules/platform-governance/participation-teams/organization-participation/contracts/v1/public";

import type { AccountDirectory } from "../../../application/ports/outbound/account-directory.port";

export class AccountDirectoryAdapter implements AccountDirectory {
  constructor(
    private readonly personalAccounts: PersonalAccountDirectoryApiV1,
    private readonly organizations: OrganizationAccountDirectoryApiV1,
    private readonly participation: OrganizationParticipationApiV1,
  ) {}

  async eligibility(accountId: string) {
    return (
      (await this.personalAccounts.eligibility(accountId)) ??
      (await this.organizations.eligibility(accountId))
    );
  }

  async membership(accountId: string, principalId: string) {
    const personal = await this.personalAccounts.resolve(accountId);
    if (personal?.personalPrincipalId === principalId)
      return {
        accountId,
        principalId,
        role: "owner" as const,
        status: "active" as const,
      };
    return this.participation.membership(accountId, principalId);
  }
}
