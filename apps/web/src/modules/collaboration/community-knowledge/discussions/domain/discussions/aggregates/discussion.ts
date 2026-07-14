import {
  createAcceptedAnswerRef,
  type AcceptedAnswerRef,
} from "../value-objects/accepted-answer-ref";
import {
  createDiscussionCategoryId,
  type DiscussionCategoryId,
} from "../value-objects/discussion-category-id";
import { createDiscussionComment } from "../entities/discussion-comment";
import type { DiscussionComment } from "../entities/discussion-comment";
import {
  createDiscussionBody,
  type DiscussionBody,
} from "../value-objects/discussion-body";
import {
  createDiscussionId,
  type DiscussionId,
} from "../value-objects/discussion-id";
import {
  createDiscussionAuthorRef,
  createDiscussionRepositoryRef,
  type DiscussionAuthorRef,
  type DiscussionRepositoryRef,
} from "../value-objects/discussion-references";
import {
  createDiscussionState,
  type DiscussionState,
} from "../value-objects/discussion-state";
import {
  createDiscussionTitle,
  type DiscussionTitle,
} from "../value-objects/discussion-title";

export type Discussion = Readonly<{
  id: DiscussionId;
  repository: DiscussionRepositoryRef;
  categoryId: DiscussionCategoryId;
  author: DiscussionAuthorRef;
  title: DiscussionTitle;
  body: DiscussionBody;
  state: DiscussionState;
  comments: readonly DiscussionComment[];
  acceptedAnswer?: AcceptedAnswerRef;
}>;

export function createDiscussion(input: {
  id: string;
  repositoryId: string;
  categoryId: string;
  authorPrincipalId: string;
  title: string;
  body: string;
}): Discussion {
  return {
    id: createDiscussionId(input.id),
    repository: createDiscussionRepositoryRef(input.repositoryId),
    categoryId: createDiscussionCategoryId(input.categoryId),
    author: createDiscussionAuthorRef(input.authorPrincipalId),
    title: createDiscussionTitle(input.title),
    body: createDiscussionBody(input.body),
    state: "open",
    comments: [],
  };
}

export function restoreDiscussion(input: {
  id: string;
  repositoryId: string;
  categoryId: string;
  authorPrincipalId: string;
  title: string;
  body: string;
  state: string;
  comments: readonly {
    id: string;
    authorPrincipalId: string;
    body: string;
    status: "active" | "minimized";
  }[];
  acceptedAnswerCommentId?: string;
}): Discussion {
  const comments = input.comments.map(createDiscussionComment);
  if (
    input.acceptedAnswerCommentId &&
    !comments.some(
      (comment) =>
        comment.id === input.acceptedAnswerCommentId &&
        comment.status === "active",
    )
  )
    throw new Error("Accepted answer must reference an active Comment.");
  return {
    id: createDiscussionId(input.id),
    repository: createDiscussionRepositoryRef(input.repositoryId),
    categoryId: createDiscussionCategoryId(input.categoryId),
    author: createDiscussionAuthorRef(input.authorPrincipalId),
    title: createDiscussionTitle(input.title),
    body: createDiscussionBody(input.body),
    state: createDiscussionState(input.state),
    comments,
    acceptedAnswer: input.acceptedAnswerCommentId
      ? createAcceptedAnswerRef(input.acceptedAnswerCommentId)
      : undefined,
  };
}

export function addDiscussionComment(
  discussion: Discussion,
  input: { id: string; authorPrincipalId: string; body: string },
): Discussion {
  if (discussion.state !== "open")
    throw new Error("Closed Discussion cannot accept comments.");
  const comment = createDiscussionComment(input);
  if (discussion.comments.some((existing) => existing.id === comment.id))
    throw new Error("Discussion Comment id already exists.");
  return { ...discussion, comments: [...discussion.comments, comment] };
}

export function markDiscussionAnswer(
  discussion: Discussion,
  input: { commentId: string; categoryAcceptsAnswers: boolean },
): Discussion {
  if (discussion.state !== "open")
    throw new Error("Closed Discussion cannot accept an answer.");
  if (!input.categoryAcceptsAnswers)
    throw new Error("Discussion Category does not accept answers.");
  const comment = discussion.comments.find(
    (candidate) => candidate.id === input.commentId,
  );
  if (!comment) throw new Error("Answer Comment is outside this Discussion.");
  if (comment.status !== "active")
    throw new Error("Minimized Comment cannot be marked as an answer.");
  return {
    ...discussion,
    acceptedAnswer: createAcceptedAnswerRef(comment.id),
  };
}
