import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value.error";

declare const discussionCommentBodyBrand: unique symbol;

export type DiscussionCommentBody = string & {
  readonly [discussionCommentBodyBrand]: "DiscussionCommentBody";
};

export function createDiscussionCommentBody(
  input: string,
): DiscussionCommentBody {
  const value = input.trim();
  if (!value) throw new InvalidDiscussionValueError("comment body");
  return value as DiscussionCommentBody;
}
