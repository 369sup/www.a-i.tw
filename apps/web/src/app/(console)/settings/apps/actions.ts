"use server";

import { revalidatePath } from "next/cache";
import { getProductComposition } from "@/src/composition/product-composition";
import { requireAuthentication } from "@/src/presentation/authentication/browser-session";

const optionalString = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  return text || undefined;
};

export async function registerGitHubAppAction(formData: FormData) {
  const authentication = await requireAuthentication();
  const description = optionalString(formData.get("description"));
  const callbackUrl = optionalString(formData.get("callbackUrl"));
  await getProductComposition().appManagement.register({
    principalId: authentication.principal.principalId,
    name: String(formData.get("name") ?? ""),
    ...(description ? { description } : {}),
    homepageUrl: String(formData.get("homepageUrl") ?? ""),
    ...(callbackUrl ? { callbackUrl } : {}),
  });
  revalidatePath("/settings/apps");
}
