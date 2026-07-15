import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value-error";

declare const discussionCategoryIdBrand: unique symbol;

export type DiscussionCategoryId = string & {
  readonly [discussionCategoryIdBrand]: "DiscussionCategoryId";
};

export function createDiscussionCategoryId(
  input: string,
): DiscussionCategoryId {
  const value = input.trim();
  if (!value) throw new InvalidDiscussionValueError("category id");
  return value as DiscussionCategoryId;
}
