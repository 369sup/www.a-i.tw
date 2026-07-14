import { describe, expect, it } from "vitest";
import { createIssuesService } from "../../application/use-cases/issues-service";
import {
  InMemoryIssueNumberSequence,
  InMemoryIssueStore,
  InMemoryLabelStore,
} from "../../adapters/outbound/persistence/in-memory-issues";

describe("issues", () => {
  const owner = {
    principalId: "owner",
    handle: "owner",
    displayName: "Owner",
    status: "active" as const,
  };
  const service = (interactionAllowed = true) =>
    createIssuesService(
      new InMemoryIssueStore(),
      new InMemoryLabelStore(),
      new InMemoryIssueNumberSequence(),
      {
        exists: async () => true,
        allowed: async ({ principal }) => principal.status === "active",
      },
      { allowed: async () => interactionAllowed },
      (() => {
        let id = 0;
        return () => `issue-${++id}`;
      })(),
      (() => {
        let id = 0;
        return () => `label-${++id}`;
      })(),
    );
  it("creates, classifies, assigns and closes an Issue", async () => {
    const work = service();
    const issue = await work.createIssue({
      repositoryId: "repo",
      title: "Research",
      body: "",
      actor: owner,
    });
    const label = await work.createLabel({
      repositoryId: "repo",
      name: "Priority",
      color: "ff0000",
      description: "",
      actor: owner,
    });
    await work.setLabel({
      issueId: issue.issueId,
      labelId: label.id,
      applied: true,
      actor: owner,
    });
    await work.setAssignee({
      issueId: issue.issueId,
      principal: owner,
      assigned: true,
      actor: owner,
    });
    await expect(
      work.setClosed({ issueId: issue.issueId, closed: true, actor: owner }),
    ).resolves.toMatchObject({
      status: "closed",
      labelIds: [label.id],
      assigneePrincipalIds: [owner.principalId],
    });
  });
  it("fails closed when Repository participation is denied", async () => {
    const denied = { ...owner, status: "disabled" as const };
    await expect(
      service().createIssue({
        repositoryId: "repo",
        title: "No",
        body: "",
        actor: denied,
      }),
    ).rejects.toThrow("participation denied");
  });
  it("rejects Issue creation when Community Safety limits interaction", async () => {
    await expect(
      service(false).createIssue({
        repositoryId: "repo",
        title: "Limited",
        body: "",
        actor: owner,
      }),
    ).rejects.toThrow("interaction limit");
  });
});
