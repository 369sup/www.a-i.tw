import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value.error";

declare const discussionIdBrand: unique symbol;

export type DiscussionId = string & {
  readonly [discussionIdBrand]: "DiscussionId";
};

export function createDiscussionId(input: string): DiscussionId {
  const value = input.trim();
  if (!value) throw new InvalidDiscussionValueError("id");
  return value as DiscussionId;
}
