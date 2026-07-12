import type { AccountDirectoryApiV1 } from "@/src/modules/account/contracts/account/public";

import type { AccountOwnerDirectory } from "../../../../application/projects/ports/outbound/account-owner-directory.port";

export class AccountOwnerDirectoryAdapter implements AccountOwnerDirectory {
  constructor(private readonly accounts: AccountDirectoryApiV1) {}

  async isOwner(input: { accountId: string; principalId: string }) {
    return (
      (await this.accounts.membership(input.accountId, input.principalId))
        ?.role === "owner"
    );
  }
}
