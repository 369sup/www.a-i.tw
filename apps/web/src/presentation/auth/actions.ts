"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import { SESSION_COOKIE } from "@/src/server/auth/session";

const value = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export async function loginAction(formData: FormData) {
  try {
    const session = await getProductWorkspace().identity.login(
      value(formData, "login"),
      value(formData, "password"),
    );
    (await cookies()).set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
  } catch {
    redirect("/login?error=invalid-credentials");
  }
  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) await getProductWorkspace().identity.revokeSession(token);
  cookieStore.delete(SESSION_COOKIE);
  redirect("/");
}
