import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value.error";

declare const discussionTitleBrand: unique symbol;

export type DiscussionTitle = string & {
  readonly [discussionTitleBrand]: "DiscussionTitle";
};

export function createDiscussionTitle(input: string): DiscussionTitle {
  const value = input.trim();
  if (!value) throw new InvalidDiscussionValueError("title");
  return value as DiscussionTitle;
}
