import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProductWorkspace } from "../composition/product-workspace";

export const SESSION_COOKIE = "a_i_session";

export async function currentAuthentication() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return undefined;
  return getProductWorkspace().identity.currentPrincipal(token);
}

export async function requireAuthentication() {
  const authentication = await currentAuthentication();
  if (!authentication) redirect("/login");
  return authentication;
}
