"use server";

// Final App Router binding for Context-owned repository console commands.

import { revalidatePath } from "next/cache";
import { getProductComposition } from "@/src/composition/product-composition";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

function repositoryVisibility(formData: FormData) {
  const visibility = value(formData, "visibility");
  if (visibility === "public" || visibility === "internal") return visibility;
  return "private";
}

export async function createAccountAction(formData: FormData) {
  const { accounts } = getProductComposition();
  const session = await requireConsoleAuthentication();
  await accounts.create({
    principal: session.principal,
    handle: value(formData, "handle"),
    displayName: value(formData, "displayName"),
    kind:
      value(formData, "kind") === "organization" ? "organization" : "personal",
  });
  revalidatePath("/repositories", "layout");
}

export async function inviteOrganizationMemberAction(formData: FormData) {
  const { identity, memberships } = getProductComposition();
  const session = await requireConsoleAuthentication();
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
  const { memberships } = getProductComposition();
  const session = await requireConsoleAuthentication();
  return memberships.accept({
    invitationId: value(formData, "invitationId"),
    principal: session.principal,
  });
}

export async function removeOrganizationMemberAction(formData: FormData) {
  const { memberships } = getProductComposition();
  const session = await requireConsoleAuthentication();
  await memberships.remove({
    accountId: value(formData, "accountId"),
    principalId: value(formData, "principalId"),
    actor: session.principal,
  });
  revalidatePath("/repositories", "layout");
}

export async function updateTeamAction(formData: FormData) {
  const { teams } = getProductComposition();
  const session = await requireConsoleAuthentication();
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
  revalidatePath("/repositories", "layout");
}

export async function createRepositoryAction(formData: FormData) {
  const { repositories } = getProductComposition();
  const session = await requireConsoleAuthentication();
  await repositories.create({
    principal: session.principal,
    ownerAccountId: value(formData, "ownerAccountId"),
    name: value(formData, "name"),
    description: value(formData, "description"),
    homepageUrl: value(formData, "homepageUrl"),
    visibility: repositoryVisibility(formData),
  });
  revalidatePath("/repositories", "layout");
}

export async function updateRepositoryAction(formData: FormData) {
  const { repositories } = getProductComposition();
  const session = await requireConsoleAuthentication();
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
      repositoryVisibility(formData),
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
  revalidatePath("/repositories", "layout");
}

export async function updateInteractionLimitAction(formData: FormData) {
  const { communitySafety } = getProductComposition();
  const session = await requireConsoleAuthentication();
  const repositoryId = value(formData, "repositoryId");
  const intent = value(formData, "intent");
  if (intent === "activate")
    await communitySafety.activate({
      repositoryId,
      principal: session.principal,
      kind: "collaborators_only",
      expiry: "one_day",
    });
  if (intent === "remove")
    await communitySafety.remove({
      repositoryId,
      principal: session.principal,
    });
  revalidatePath("/repositories", "layout");
}

export async function updateRepositoryStarAction(formData: FormData) {
  const { socialCuration } = getProductComposition();
  const session = await requireConsoleAuthentication();
  const repositoryId = value(formData, "repositoryId");
  const intent = value(formData, "intent");
  if (intent === "star")
    await socialCuration.star({ repositoryId, principal: session.principal });
  if (intent === "unstar")
    await socialCuration.unstar({ repositoryId, principal: session.principal });
  revalidatePath("/repositories", "layout");
}

export async function updateIssueAction(formData: FormData) {
  const { identity, issues, notifications, subscriptions } =
    getProductComposition();
  const session = await requireConsoleAuthentication();
  const intent = value(formData, "intent");
  if (intent === "create-issue") {
    const issue = await issues.createIssue({
      repositoryId: value(formData, "repositoryId"),
      title: value(formData, "title"),
      body: value(formData, "body"),
      actor: session.principal,
    });
    await subscriptions.participate(
      session.principal.principalId,
      `issue:${issue.issueId}`,
    );
  }
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
    const issue = await issues.setAssignee({
      issueId: value(formData, "issueId"),
      principal,
      assigned: true,
      actor: session.principal,
    });
    if (principal.principalId !== session.principal.principalId)
      await notifications.notify({
        recipientPrincipalId: principal.principalId,
        subjectRef: `issue:${issue.issueId}`,
        threadRef: `repository:${value(formData, "repositoryId")}`,
        reason: "assign",
        title: `Assigned: ${issue.title}`,
        href: `/repositories?repository=${encodeURIComponent(value(formData, "repositoryId"))}`,
      });
  }
  if (intent === "comment")
    await issues.comment({
      issueId: value(formData, "issueId"),
      actor: session.principal,
      body: value(formData, "body"),
    });
  revalidatePath("/repositories", "layout");
}

export async function updateDiscussionAction(formData: FormData) {
  const { discussions, notifications, subscriptions } = getProductComposition();
  const session = await requireConsoleAuthentication();
  const intent = value(formData, "intent");
  if (intent === "create-discussion") {
    const discussion = await discussions.create({
      repositoryId: value(formData, "repositoryId"),
      categoryId: value(formData, "categoryId"),
      title: value(formData, "title"),
      body: value(formData, "body"),
      actor: session.principal,
    });
    await subscriptions.participate(
      session.principal.principalId,
      `discussion:${discussion.discussionId}`,
    );
  }
  if (intent === "comment") {
    const discussion = await discussions.comment({
      discussionId: value(formData, "discussionId"),
      body: value(formData, "body"),
      actor: session.principal,
    });
    const subjectRef = `discussion:${discussion.discussionId}`;
    const recipients = await subscriptions.resolveRecipients({
      repositoryId: discussion.repositoryId,
      subjectRef,
      eventType: "discussions",
      actorPrincipalId: session.principal.principalId,
    });
    await Promise.all(
      recipients.map((recipient) =>
        notifications.notify({
          recipientPrincipalId: recipient.principalId,
          subjectRef,
          threadRef: `repository:${discussion.repositoryId}`,
          reason: recipient.reason,
          title: `New comment: ${discussion.title}`,
          href: `/repositories?repository=${encodeURIComponent(discussion.repositoryId)}`,
        }),
      ),
    );
    await subscriptions.participate(session.principal.principalId, subjectRef);
  }
  if (intent === "mark-answer")
    await discussions.markAnswer({
      discussionId: value(formData, "discussionId"),
      commentId: value(formData, "commentId"),
      actor: session.principal,
    });
  revalidatePath("/repositories", "layout");
}

export async function updateRepositorySubscriptionAction(formData: FormData) {
  const { subscriptions } = getProductComposition();
  const session = await requireConsoleAuthentication();
  const mode = value(formData, "mode");
  if (
    mode !== "participating" &&
    mode !== "all" &&
    mode !== "custom" &&
    mode !== "ignore"
  )
    throw new Error("Invalid Repository watch mode.");
  await subscriptions.watchRepository({
    principalId: session.principal.principalId,
    repositoryId: value(formData, "repositoryId"),
    mode,
    eventTypes: mode === "custom" ? ["issues", "discussions"] : [],
  });
  revalidatePath("/repositories", "layout");
}
