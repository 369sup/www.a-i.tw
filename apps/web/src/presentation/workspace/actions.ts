"use server";

import { revalidatePath } from "next/cache";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export async function selectPrincipal(formData: FormData) {
  const { identity } = await getProductWorkspace();
  await identity.authenticate(value(formData, "principalId"));
  revalidatePath("/workspace", "layout");
}

export async function createAccountAction(formData: FormData) {
  const { identity, accounts } = await getProductWorkspace();
  const session = await identity.currentPrincipal();
  if (!session) throw new Error("Authentication required.");
  await accounts.create({
    principal: session.principal,
    handle: value(formData, "handle"),
    displayName: value(formData, "displayName"),
    kind:
      value(formData, "kind") === "organization" ? "organization" : "personal",
  });
  revalidatePath("/workspace", "layout");
}

export async function createRepositoryAction(formData: FormData) {
  const { identity, repositories } = await getProductWorkspace();
  const session = await identity.currentPrincipal();
  if (!session) throw new Error("Authentication required.");
  await repositories.create({
    principal: session.principal,
    ownerAccountId: value(formData, "ownerAccountId"),
    name: value(formData, "name"),
    description: value(formData, "description"),
    visibility:
      value(formData, "visibility") === "public" ? "public" : "private",
  });
  revalidatePath("/workspace", "layout");
}

export async function updateRepositoryAction(formData: FormData) {
  const { identity, repositories } = await getProductWorkspace();
  const session = await identity.currentPrincipal();
  if (!session) throw new Error("Authentication required.");
  const repositoryId = value(formData, "repositoryId");
  const intent = value(formData, "intent");
  if (intent === "rename")
    await repositories.rename(
      repositoryId,
      value(formData, "name"),
      session.principal,
    );
  if (intent === "visibility")
    await repositories.setVisibility(
      repositoryId,
      value(formData, "visibility") === "public" ? "public" : "private",
      session.principal,
    );
  if (intent === "archive")
    await repositories.setArchived(
      repositoryId,
      value(formData, "archived") === "true",
      session.principal,
    );
  if (intent === "grant")
    await repositories.grant(
      repositoryId,
      value(formData, "granteePrincipalId"),
      value(formData, "role") as "read" | "write" | "maintain" | "admin",
      session.principal,
    );
  revalidatePath("/workspace", "layout");
}
