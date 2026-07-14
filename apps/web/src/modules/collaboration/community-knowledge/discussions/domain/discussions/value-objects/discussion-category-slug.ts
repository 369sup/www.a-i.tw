import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value.error";

declare const discussionCategorySlugBrand: unique symbol;

export type DiscussionCategorySlug = string & {
  readonly [discussionCategorySlugBrand]: "DiscussionCategorySlug";
};

export function createDiscussionCategorySlug(
  input: string,
): DiscussionCategorySlug {
  const value = input.trim().toLowerCase().replaceAll(" ", "-");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(value))
    throw new InvalidDiscussionValueError("category slug");
  return value as DiscussionCategorySlug;
}
