"use server";

import { redirect } from "next/navigation";
import { getProductComposition } from "@/src/composition/product-composition";
import {
  browserSessionToken,
  clearBrowserSession,
  establishBrowserSession,
} from "@/src/modules/platform-governance/authentication-identity/authentication-security/public-api";

const value = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export async function loginAction(formData: FormData) {
  try {
    const session = await getProductComposition().identity.login(
      value(formData, "login"),
      value(formData, "password"),
    );
    await establishBrowserSession(session);
  } catch {
    redirect("/login?error=invalid-credentials");
  }
  redirect("/repositories");
}

export async function logoutAction() {
  const token = await browserSessionToken();
  if (token) await getProductComposition().identity.revokeSession(token);
  await clearBrowserSession();
  redirect("/login");
}
