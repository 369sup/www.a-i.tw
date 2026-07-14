import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value.error";

export type DiscussionState = "open" | "closed";

export function createDiscussionState(input: string): DiscussionState {
  if (input !== "open" && input !== "closed")
    throw new InvalidDiscussionValueError("state");
  return input;
}
