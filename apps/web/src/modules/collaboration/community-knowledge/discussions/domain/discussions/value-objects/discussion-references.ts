import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value-error";

export type DiscussionRepositoryRef = Readonly<{ repositoryId: string }>;
export type DiscussionAuthorRef = Readonly<{ principalId: string }>;

export function createDiscussionRepositoryRef(
  repositoryId: string,
): DiscussionRepositoryRef {
  const value = repositoryId.trim();
  if (!value) throw new InvalidDiscussionValueError("Repository reference");
  return { repositoryId: value };
}

export function createDiscussionAuthorRef(
  principalId: string,
): DiscussionAuthorRef {
  const value = principalId.trim();
  if (!value) throw new InvalidDiscussionValueError("author reference");
  return { principalId: value };
}
