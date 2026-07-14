"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProductComposition } from "@/src/composition/product-composition";
import { SESSION_COOKIE } from "@/src/presentation/authentication/browser-session";

const value = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export async function loginAction(formData: FormData) {
  try {
    const session = await getProductComposition().identity.login(
      value(formData, "login"),
      value(formData, "password"),
    );
    (await cookies()).set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(session.expiresAt),
    });
  } catch {
    redirect("/login?error=invalid-credentials");
  }
  redirect("/repositories");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) await getProductComposition().identity.revokeSession(token);
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}
