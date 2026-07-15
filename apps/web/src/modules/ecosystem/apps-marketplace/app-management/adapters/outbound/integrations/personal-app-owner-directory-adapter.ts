import type { PersonalAccountDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/user-account/contracts/v1/public";

import type { PersonalAppOwnerDirectory } from "../../../application/ports/outbound/personal-app-owner-directory-port";

export function createPersonalAppOwnerDirectoryAdapter(
  accounts: PersonalAccountDirectoryApiV1,
): PersonalAppOwnerDirectory {
  return {
    async resolveByPrincipal(principalId) {
      const account = await accounts.resolveByPrincipal(principalId);
      return (
        account && {
          accountId: account.accountId,
          handle: account.handle,
          status: account.status,
        }
      );
    },
  };
}
