import { createRepositoryStarKey } from "../value-objects/repository-star-key";
import { createStarredAt, type StarredAt } from "../value-objects/starred-at";

export type RepositoryStar = Readonly<{
  principalId: string;
  repositoryId: string;
  starredAt: StarredAt;
}>;

export function createRepositoryStar(input: {
  principalId: string;
  repositoryId: string;
  starredAt: Date;
}): RepositoryStar {
  return {
    ...createRepositoryStarKey(input),
    starredAt: createStarredAt(input.starredAt),
  };
}
