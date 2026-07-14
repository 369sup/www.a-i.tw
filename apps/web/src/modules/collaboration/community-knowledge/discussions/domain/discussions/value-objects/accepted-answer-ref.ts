import {
  createDiscussionCommentId,
  type DiscussionCommentId,
} from "./discussion-comment-id";

export type AcceptedAnswerRef = Readonly<{
  commentId: DiscussionCommentId;
}>;

export function createAcceptedAnswerRef(commentId: string): AcceptedAnswerRef {
  return { commentId: createDiscussionCommentId(commentId) };
}
