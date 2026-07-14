import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProductComposition } from "@/src/composition/product-composition";

export const SESSION_COOKIE = "a_i_session";

export async function currentAuthentication() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return undefined;
  const composition = getProductComposition();
  const authentication = await composition.identity.currentPrincipal(token);
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
  };
}

export async function requireAuthentication() {
  const authentication = await currentAuthentication();
  if (!authentication) redirect("/login");
  return authentication;
}
