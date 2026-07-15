"use server";

import { redirect } from "next/navigation";
import { getProductComposition } from "@/src/composition/product-composition";
import { currentPublicAuthentication } from "./public-session-composition";

const value = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export async function acceptMembershipInvitationAction(formData: FormData) {
  const authentication = await currentPublicAuthentication();
  if (!authentication) redirect("/sign-in");

  const invitationId = value(formData, "invitationId");
  try {
    await getProductComposition().memberships.accept({
      invitationId,
      principal: authentication.principal,
    });
  } catch {
    redirect(
      `/accept-invitation?invitationId=${encodeURIComponent(invitationId)}&error=invalid-invitation`,
    );
  }

  redirect("/dashboard?invitation=accepted");
}
