import type { PersonalAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/user-account/contracts/v1/public";
import type { OrganizationParticipationApiV1 } from "@/src/modules/platform-governance/participation-teams/organization-participation/contracts/v1/public";

import type { AccountAuthorizationDirectory } from "../../../application/ports/outbound/account-authorization-directory.port";

export class AccountAuthorizationDirectoryAdapter implements AccountAuthorizationDirectory {
  constructor(
    private readonly personalAccounts: PersonalAccountDirectoryApiV1,
    private readonly participation: OrganizationParticipationApiV1,
  ) {}

  async membership(accountId: string, principalId: string) {
    const personal = await this.personalAccounts.resolve(accountId);
    if (personal?.personalPrincipalId === principalId)
      return { principalId, role: "owner" as const, status: "active" as const };
    return this.participation.membership(accountId, principalId);
  }

  async teamIds(accountId: string, principalId: string) {
    return (await this.participation.teamMemberships(accountId, principalId))
      .teamIds;
  }

  team(accountId: string, teamId: string) {
    return this.participation.team(accountId, teamId);
  }
}
