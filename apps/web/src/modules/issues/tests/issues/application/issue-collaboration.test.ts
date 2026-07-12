import { describe, expect, it } from "vitest";
import { createIssueCollaborationService } from "../../../application/issues/use-cases/issues-collaboration-service";
import { InMemoryIssueCollaborationStore } from "../../../infrastructure/issues/repositories/in-memory-issue-collaboration";
describe("Issue collaboration", () => {
  it("comments and records blocking dependencies", async () => {
    const service = createIssueCollaborationService(
      new InMemoryIssueCollaborationStore(),
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
});
