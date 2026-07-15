import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value-error";

declare const discussionBodyBrand: unique symbol;

export type DiscussionBody = string & {
  readonly [discussionBodyBrand]: "DiscussionBody";
};

export function createDiscussionBody(input: string): DiscussionBody {
  const value = input.trim();
  if (!value) throw new InvalidDiscussionValueError("body");
  return value as DiscussionBody;
}
