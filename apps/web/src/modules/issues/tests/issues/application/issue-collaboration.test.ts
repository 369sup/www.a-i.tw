import { describe, expect, it } from "vitest";
import { createIssueCollaborationService } from "../../../application/issues/use-cases/issues-collaboration-service";
import { InMemoryIssueCollaborationStore } from "../../../infrastructure/issues/repositories/in-memory-issue-collaboration";
describe("Issue collaboration", () => {
  const issueDirectory = {
    find: async (id: string) =>
      ["issue-1", "issue-2", "issue-3"].includes(id)
        ? { id, repositoryId: "repository-1" }
        : undefined,
  };
  it("comments and records blocking dependencies", async () => {
    const service = createIssueCollaborationService(
      new InMemoryIssueCollaborationStore(),
      issueDirectory,
      () => "id-1",
      () => new Date(0),
    );
    await expect(
      service.comment({
        issueId: "issue-1",
        authorPrincipalId: "user-1",
        body: "Update",
      }),
    ).resolves.toMatchObject({ body: "Update" });
    await expect(service.block("issue-1", "issue-2")).resolves.toEqual({
      blockedIssueId: "issue-1",
      blockingIssueId: "issue-2",
    });
  });

  it("rejects a dependency cycle", async () => {
    const service = createIssueCollaborationService(
      new InMemoryIssueCollaborationStore(),
      issueDirectory,
      () => crypto.randomUUID(),
      () => new Date(0),
    );
    await service.block("issue-1", "issue-2");
    await service.block("issue-2", "issue-3");
    await expect(service.block("issue-3", "issue-1")).rejects.toThrow("cycle");
  });
});
