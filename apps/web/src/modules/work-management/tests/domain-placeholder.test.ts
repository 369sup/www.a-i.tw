import { describe, expect, it } from "vitest";
import { createWorkManagementService } from "../src/application/work-management-service";
import {
  InMemoryIssueNumberSequence,
  InMemoryIssueStore,
  InMemoryLabelStore,
} from "../src/infrastructure/in-memory-work-management";

describe("work-management", () => {
  const owner = {
    principalId: "owner",
    handle: "owner",
    displayName: "Owner",
    status: "active" as const,
  };
  const service = () =>
    createWorkManagementService(
      new InMemoryIssueStore(),
      new InMemoryLabelStore(),
      new InMemoryIssueNumberSequence(),
      {
        scope: async (id) => ({
          repositoryId: id,
          ownerAccountId: "account",
          status: "active",
        }),
        allowed: async ({ principal }) => principal.status === "active",
      },
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
});
