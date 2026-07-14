import "server-only";

import { currentBrowserAuthentication } from "@/src/modules/platform-governance/authentication-identity/authentication-security/public-api";
import { getProductComposition } from "@/src/composition/product-composition";

export async function currentPublicAuthentication() {
  const composition = getProductComposition();
  const authentication = await currentBrowserAuthentication(
    composition.identity,
  );
  if (!authentication) return undefined;

  const personalAccount = (await composition.accounts.listAccounts()).find(
    (account) =>
      "personalPrincipalId" in account &&
      account.personalPrincipalId === authentication.principalId,
  );

  return {
    ...authentication,
    principal: {
      principalId: authentication.principalId,
      status: authentication.status,
      handle: personalAccount?.handle ?? authentication.principalId,
      displayName: personalAccount?.displayName ?? authentication.principalId,
    },
  } as const;
}
