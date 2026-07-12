import { describe, expect, it } from "vitest";
import { createDiscussionsService } from "../../../application/discussions/use-cases/discussions-service";
import { InMemoryDiscussionStore } from "../../../infrastructure/discussions/repositories/in-memory-discussions";
describe("discussions", () =>
  it("marks an answer", async () => {
    const s = createDiscussionsService(
      new InMemoryDiscussionStore(),
      () => "discussion-1",
    );
    const d = await s.create({
      repositoryId: "repo",
      authorPrincipalId: "user",
      title: "Question",
      body: "?",
    });
    await expect(
      s.markAnswer({ discussionId: d.id, commentId: "comment-1" }),
    ).resolves.toMatchObject({ answerCommentId: "comment-1" });
  }));
