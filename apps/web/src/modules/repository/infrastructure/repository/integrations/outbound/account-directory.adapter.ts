import type { AccountDirectoryApiV1 } from "@/src/modules/account/contracts/account/public";

import type { AccountDirectory } from "../../../../application/repository/ports/outbound/account-directory.port";

export class AccountDirectoryAdapter implements AccountDirectory {
  constructor(private readonly accountApi: AccountDirectoryApiV1) {}

  eligibility(accountId: string) {
    return this.accountApi.eligibility(accountId);
  }

  membership(accountId: string, principalId: string) {
    return this.accountApi.membership(accountId, principalId);
  }

  async teamIds(accountId: string, principalId: string) {
    return (await this.accountApi.teamMemberships(accountId, principalId))
      .teamIds;
  }
}
