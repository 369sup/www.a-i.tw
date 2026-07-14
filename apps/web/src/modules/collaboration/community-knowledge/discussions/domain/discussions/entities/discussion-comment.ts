import {
  createDiscussionAuthorRef,
  type DiscussionAuthorRef,
} from "../value-objects/discussion-references";
import {
  createDiscussionCommentBody,
  type DiscussionCommentBody,
} from "../value-objects/discussion-comment-body";
import {
  createDiscussionCommentId,
  type DiscussionCommentId,
} from "../value-objects/discussion-comment-id";

export type DiscussionComment = Readonly<{
  id: DiscussionCommentId;
  author: DiscussionAuthorRef;
  body: DiscussionCommentBody;
  status: "active" | "minimized";
}>;

export function createDiscussionComment(input: {
  id: string;
  authorPrincipalId: string;
  body: string;
  status?: "active" | "minimized";
}): DiscussionComment {
  return {
    id: createDiscussionCommentId(input.id),
    author: createDiscussionAuthorRef(input.authorPrincipalId),
    body: createDiscussionCommentBody(input.body),
    status: input.status ?? "active",
  };
}
