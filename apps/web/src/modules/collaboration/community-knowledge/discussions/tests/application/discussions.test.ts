import { describe, expect, it } from "vitest";

import {
  InMemoryDiscussionCategoryStore,
  InMemoryDiscussionStore,
} from "../../adapters/outbound/persistence/in-memory-discussions";
import { createDiscussionsService } from "../../application/use-cases/discussions-service";

const author = { principalId: "principal-author", status: "active" as const };
const commenter = {
  principalId: "principal-commenter",
  status: "active" as const,
};

function fixture(triagers: readonly string[] = [], interactionAllowed = true) {
  let sequence = 0;
  const allowed = async ({
    principal,
    action,
  }: Parameters<
    import("../../application/ports/outbound/repository-discussion-participation.port").RepositoryDiscussionParticipation["allowed"]
  >[0]) =>
    principal.status === "active" &&
    (action !== "discussion:triage" ||
      triagers.includes(principal.principalId));
  return createDiscussionsService(
    new InMemoryDiscussionStore(),
    new InMemoryDiscussionCategoryStore([
      {
        id: "category-q-and-a",
        repositoryId: "repository-1",
        slug: "q-and-a",
        name: "Q&A",
        acceptsAnswers: true,
      },
    ]),
    { exists: async () => true, allowed },
    { allowed: async () => interactionAllowed },
    () => `discussion-${++sequence}`,
    () => `comment-${++sequence}`,
  );
}

async function discussionWithComment(service: ReturnType<typeof fixture>) {
  const discussion = await service.create({
    repositoryId: "repository-1",
    categoryId: "category-q-and-a",
    title: "Question",
    body: "What is the answer?",
    actor: author,
  });
  return service.comment({
    discussionId: discussion.discussionId,
    body: "The answer",
    actor: commenter,
  });
}

describe("Discussions service", () => {
  it("creates a Q&A Discussion, comments, and lets the author mark an answer", async () => {
    const service = fixture();
    const discussion = await discussionWithComment(service);
    await expect(
      service.markAnswer({
        discussionId: discussion.discussionId,
        commentId: discussion.comments[0]!.commentId,
        actor: author,
      }),
    ).resolves.toMatchObject({
      acceptedAnswerCommentId: discussion.comments[0]!.commentId,
    });
  });

  it("lets a triager, but not another reader, mark an answer", async () => {
    const service = fixture([commenter.principalId]);
    const discussion = await discussionWithComment(service);
    await expect(
      service.markAnswer({
        discussionId: discussion.discussionId,
        commentId: discussion.comments[0]!.commentId,
        actor: commenter,
      }),
    ).resolves.toBeDefined();

    const denied = fixture();
    const deniedDiscussion = await discussionWithComment(denied);
    await expect(denied.list("repository-1", commenter)).resolves.toMatchObject(
      {
        discussions: [{ canMarkAnswer: false }],
      },
    );
    await expect(
      denied.markAnswer({
        discussionId: deniedDiscussion.discussionId,
        commentId: deniedDiscussion.comments[0]!.commentId,
        actor: commenter,
      }),
    ).rejects.toThrow("participation denied");
  });

  it("rejects a Category outside the Repository scope", async () => {
    await expect(
      fixture().create({
        repositoryId: "repository-other",
        categoryId: "category-q-and-a",
        title: "Question",
        body: "Body",
        actor: author,
      }),
    ).rejects.toThrow("outside the Repository scope");
  });

  it("rejects comments when Community Safety limits interaction", async () => {
    const service = fixture([], false);
    const discussion = await service.create({
      repositoryId: "repository-1",
      categoryId: "category-q-and-a",
      title: "Question",
      body: "Body",
      actor: author,
    });
    await expect(
      service.comment({
        discussionId: discussion.discussionId,
        body: "Blocked comment",
        actor: commenter,
      }),
    ).rejects.toThrow("interaction limit");
  });
});
