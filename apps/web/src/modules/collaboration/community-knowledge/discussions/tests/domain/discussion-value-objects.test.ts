import { describe, expect, it } from "vitest";

import { createDiscussionCategory } from "../../domain/discussions/aggregates/discussion-category";
import {
  addDiscussionComment,
  createDiscussion,
  markDiscussionAnswer,
  restoreDiscussion,
} from "../../domain/discussions/aggregates/discussion";

describe("Discussion Domain", () => {
  const discussion = () =>
    createDiscussion({
      id: "discussion-1",
      repositoryId: "repository-1",
      categoryId: "category-q-and-a",
      authorPrincipalId: "principal-author",
      title: "  How should this work?  ",
      body: "  Explain the boundary.  ",
    });

  it("constructs normalized Context-owned values", () => {
    const value = discussion();
    expect(value.title).toBe("How should this work?");
    expect(value.body).toBe("Explain the boundary.");
    expect(
      createDiscussionCategory({
        id: "category-1",
        repositoryId: "repository-1",
        slug: " Q and A ",
        name: "Q&A",
        acceptsAnswers: true,
      }).slug,
    ).toBe("q-and-a");
    expect(
      () =>
        discussion().title &&
        createDiscussion({
          id: "discussion-2",
          repositoryId: "repository-1",
          categoryId: "category-q-and-a",
          authorPrincipalId: "principal-author",
          title: " ",
          body: "Body",
        }),
    ).toThrow("Discussion title");
  });

  it("marks only an active Comment from the same answerable Discussion", () => {
    const withComment = addDiscussionComment(discussion(), {
      id: "comment-1",
      authorPrincipalId: "principal-commenter",
      body: "The answer",
    });
    expect(
      markDiscussionAnswer(withComment, {
        commentId: "comment-1",
        categoryAcceptsAnswers: true,
      }).acceptedAnswer,
    ).toEqual({ commentId: "comment-1" });
    expect(() =>
      markDiscussionAnswer(withComment, {
        commentId: "comment-other",
        categoryAcceptsAnswers: true,
      }),
    ).toThrow("outside this Discussion");
    expect(() =>
      markDiscussionAnswer(withComment, {
        commentId: "comment-1",
        categoryAcceptsAnswers: false,
      }),
    ).toThrow("does not accept answers");
  });

  it("rejects a minimized persisted Comment as an accepted answer", () => {
    expect(() =>
      restoreDiscussion({
        id: "discussion-1",
        repositoryId: "repository-1",
        categoryId: "category-1",
        authorPrincipalId: "principal-author",
        title: "Question",
        body: "Body",
        state: "open",
        comments: [
          {
            id: "comment-1",
            authorPrincipalId: "principal-commenter",
            body: "Hidden",
            status: "minimized",
          },
        ],
        acceptedAnswerCommentId: "comment-1",
      }),
    ).toThrow("active Comment");
  });
});
