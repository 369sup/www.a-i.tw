"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Route } from "next";
import { z } from "zod";

import { getMasterTemplateApplication } from "@/src/server/composition/master-template";

const inputSchema = z.object({
  name: z.string().trim().min(1, "Enter a resource name.").max(64),
});

export type CreateResourceActionState = {
  fieldErrors?: { name?: string[] };
  formError?: string;
};

export const initialCreateResourceActionState: CreateResourceActionState = {};

export async function createResourceAction(
  namespace: string,
  _previousState: CreateResourceActionState,
  formData: FormData,
): Promise<CreateResourceActionState> {
  const parsed = inputSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  // This server-only template principal makes the authentication boundary explicit.
  // A real bounded context replaces it with its Identity & Access adapter.
  const result = await getMasterTemplateApplication().createResource.execute({
    principalId: "template-principal",
    namespaceId: namespace,
    name: parsed.data.name,
  });

  if (!result.ok) {
    if (result.code === "INVALID_NAME") {
      return {
        fieldErrors: { name: ["Use lowercase letters, numbers, and hyphens."] },
      };
    }
    if (result.code === "NAME_TAKEN") {
      return {
        fieldErrors: { name: ["This namespace already has that name."] },
      };
    }
    if (result.code === "FORBIDDEN") {
      return {
        formError: "The current principal cannot create a resource here.",
      };
    }
    return { formError: "This namespace is not available." };
  }

  const listPath = `/architecture/master-template/${namespace}/resources`;
  revalidatePath(listPath);
  redirect(`${listPath}/${result.resourceId}` as Route);
}
