import type { PersonalAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/user-account/contracts/v1/public";
import type { OrganizationParticipationApiV1 } from "@/src/modules/platform-governance/participation-teams/organization-participation/contracts/v1/public";

import type { AccountOwnerDirectory } from "../../../application/ports/outbound/account-owner-directory-port";

export class AccountOwnerDirectoryAdapter implements AccountOwnerDirectory {
  constructor(
    private readonly personalAccounts: PersonalAccountDirectoryApiV1,
    private readonly participation: OrganizationParticipationApiV1,
  ) {}

  async isOwner(input: { accountId: string; principalId: string }) {
    const personal = await this.personalAccounts.resolve(input.accountId);
    if (personal?.personalPrincipalId === input.principalId) return true;
    return (
      (await this.participation.membership(input.accountId, input.principalId))
        ?.role === "owner"
    );
  }
}
