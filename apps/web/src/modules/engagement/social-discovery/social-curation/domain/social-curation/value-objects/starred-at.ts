import { InvalidRepositoryStarError } from "../errors/invalid-repository-star-error";

export type StarredAt = string;

export function createStarredAt(value: Date): StarredAt {
  if (Number.isNaN(value.getTime()))
    throw new InvalidRepositoryStarError(
      "Repository Star creation time must be valid.",
    );
  return value.toISOString();
}
