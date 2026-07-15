import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value-error";

declare const discussionCommentIdBrand: unique symbol;

export type DiscussionCommentId = string & {
  readonly [discussionCommentIdBrand]: "DiscussionCommentId";
};

export function createDiscussionCommentId(input: string): DiscussionCommentId {
  const value = input.trim();
  if (!value) throw new InvalidDiscussionValueError("comment id");
  return value as DiscussionCommentId;
}
