import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthenticatedPrincipalV1 } from "../../../contracts/v1/public";

const SESSION_COOKIE = "a_i_session";

export interface BrowserSessionIdentity {
  currentPrincipal(
    token: string,
  ): Promise<AuthenticatedPrincipalV1 | undefined>;
}

export async function currentBrowserAuthentication(
  identity: BrowserSessionIdentity,
) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? identity.currentPrincipal(token) : undefined;
}

export async function requireBrowserAuthentication(
  identity: BrowserSessionIdentity,
) {
  const authentication = await currentBrowserAuthentication(identity);
  if (!authentication) redirect("/login");
  return authentication;
}

export async function browserSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function establishBrowserSession(session: {
  token: string;
  expiresAt: string;
}) {
  (await cookies()).set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(session.expiresAt),
  });
}

export async function clearBrowserSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
