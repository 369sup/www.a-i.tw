"use server";

import { revalidatePath } from "next/cache";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import { requireAuthentication } from "@/src/server/auth/session";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export async function createAccountAction(formData: FormData) {
  const { accounts } = getProductWorkspace();
  const session = await requireAuthentication();
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
  const { identity, memberships } = getProductWorkspace();
  const session = await requireAuthentication();
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
  const { memberships } = getProductWorkspace();
  const session = await requireAuthentication();
  return memberships.accept({
    invitationId: value(formData, "invitationId"),
    principal: session.principal,
  });
}

export async function removeOrganizationMemberAction(formData: FormData) {
  const { memberships } = getProductWorkspace();
  const session = await requireAuthentication();
  await memberships.remove({
    accountId: value(formData, "accountId"),
    principalId: value(formData, "principalId"),
    actor: session.principal,
  });
  revalidatePath("/workspace", "layout");
}

export async function updateTeamAction(formData: FormData) {
  const { teams } = getProductWorkspace();
  const session = await requireAuthentication();
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
  const { repositories } = getProductWorkspace();
  const session = await requireAuthentication();
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
  const { repositories } = getProductWorkspace();
  const session = await requireAuthentication();
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

export async function updateIssueAction(formData: FormData) {
  const { identity, issues } = getProductWorkspace();
  const session = await requireAuthentication();
  const intent = value(formData, "intent");
  if (intent === "create-issue")
    await issues.createIssue({
      repositoryId: value(formData, "repositoryId"),
      title: value(formData, "title"),
      body: value(formData, "body"),
      actor: session.principal,
    });
  if (intent === "close-issue" || intent === "reopen-issue")
    await issues.setClosed({
      issueId: value(formData, "issueId"),
      closed: intent === "close-issue",
      actor: session.principal,
    });
  if (intent === "create-label")
    await issues.createLabel({
      repositoryId: value(formData, "repositoryId"),
      name: value(formData, "name"),
      color: value(formData, "color"),
      description: value(formData, "description"),
      actor: session.principal,
    });
  if (intent === "apply-label")
    await issues.setLabel({
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
    await issues.setAssignee({
      issueId: value(formData, "issueId"),
      principal,
      assigned: true,
      actor: session.principal,
    });
  }
  revalidatePath("/workspace", "layout");
}
