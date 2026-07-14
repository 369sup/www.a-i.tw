"use server";

import { revalidatePath } from "next/cache";
import { requireAuthentication } from "@/src/presentation/authentication/browser-session";
import { getProductComposition } from "@/src/composition/product-composition";

const triageOperations = [
  "mark-read",
  "mark-unread",
  "save",
  "unsave",
  "mark-done",
] as const;

type TriageOperation = (typeof triageOperations)[number];

export async function triageNotificationAction(formData: FormData) {
  const authentication = await requireAuthentication();
  const operation = String(formData.get("operation"));
  if (!triageOperations.includes(operation as TriageOperation))
    throw new Error("Invalid notification triage operation.");
  await getProductComposition().notifications.triage(
    String(formData.get("notificationId")),
    authentication.principal.principalId,
    operation as TriageOperation,
  );
  revalidatePath("/notifications");
}

export async function unsubscribeNotificationAction(formData: FormData) {
  const authentication = await requireAuthentication();
  await getProductComposition().notifications.unsubscribe(
    String(formData.get("notificationId")),
    authentication.principal.principalId,
  );
  revalidatePath("/notifications");
}
