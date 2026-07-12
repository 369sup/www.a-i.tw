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

export async function inviteOrganizationMemberAction(formData: FormData) {
  const { identity, memberships } = await getProductWorkspace();
  const session = await identity.currentPrincipal();
  if (!session) throw new Error("Authentication required.");
  const invitee = (await identity.listPrincipals()).find(
    (principal) => principal.principalId === value(formData, "principalId"),
  );
  if (!invitee) throw new Error("Principal not found.");
  return memberships.invite({
    accountId: value(formData, "accountId"),
    actor: session.principal,
    invitee,
  });
}

export async function acceptOrganizationInvitationAction(formData: FormData) {
  const { identity, memberships } = await getProductWorkspace();
  const session = await identity.currentPrincipal();
  if (!session) throw new Error("Authentication required.");
  return memberships.accept({
    invitationId: value(formData, "invitationId"),
    principal: session.principal,
  });
}

export async function removeOrganizationMemberAction(formData: FormData) {
  const { identity, memberships } = await getProductWorkspace();
  const session = await identity.currentPrincipal();
  if (!session) throw new Error("Authentication required.");
  await memberships.remove({
    accountId: value(formData, "accountId"),
    principalId: value(formData, "principalId"),
    actor: session.principal,
  });
  revalidatePath("/workspace", "layout");
}

export async function updateTeamAction(formData: FormData) {
  const { identity, teams } = await getProductWorkspace();
  const session = await identity.currentPrincipal();
  if (!session) throw new Error("Authentication required.");
  const intent = value(formData, "intent");
  if (intent === "create")
    await teams.create({
      accountId: value(formData, "accountId"),
      name: value(formData, "name"),
      actor: session.principal,
    });
  if (intent === "add-member")
    await teams.addMember({
      teamId: value(formData, "teamId"),
      principalId: value(formData, "principalId"),
      actor: session.principal,
    });
  if (intent === "remove-member")
    await teams.removeMember({
      teamId: value(formData, "teamId"),
      principalId: value(formData, "principalId"),
      actor: session.principal,
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
  if (intent === "grant-team")
    await repositories.grantTeam(
      repositoryId,
      value(formData, "teamId"),
      value(formData, "role") as "read" | "write" | "maintain" | "admin",
      session.principal,
    );
  revalidatePath("/workspace", "layout");
}

export async function updateWorkItemAction(formData: FormData) {
  const { identity, workManagement } = await getProductWorkspace();
  const session = await identity.currentPrincipal();
  if (!session) throw new Error("Authentication required.");
  const intent = value(formData, "intent");
  if (intent === "create-issue")
    await workManagement.createIssue({
      repositoryId: value(formData, "repositoryId"),
      title: value(formData, "title"),
      body: value(formData, "body"),
      actor: session.principal,
    });
  if (intent === "close-issue" || intent === "reopen-issue")
    await workManagement.setClosed({
      issueId: value(formData, "issueId"),
      closed: intent === "close-issue",
      actor: session.principal,
    });
  if (intent === "create-label")
    await workManagement.createLabel({
      repositoryId: value(formData, "repositoryId"),
      name: value(formData, "name"),
      color: value(formData, "color"),
      description: value(formData, "description"),
      actor: session.principal,
    });
  if (intent === "apply-label")
    await workManagement.setLabel({
      issueId: value(formData, "issueId"),
      labelId: value(formData, "labelId"),
      applied: true,
      actor: session.principal,
    });
  if (intent === "assign") {
    const principal = (await identity.listPrincipals()).find(
      (item) => item.principalId === value(formData, "principalId"),
    );
    if (!principal) throw new Error("Principal not found.");
    await workManagement.setAssignee({
      issueId: value(formData, "issueId"),
      principal,
      assigned: true,
      actor: session.principal,
    });
  }
  revalidatePath("/workspace", "layout");
}
