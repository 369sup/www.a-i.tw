import { InvalidRepositoryStarError } from "../errors/invalid-repository-star.error";

export type RepositoryStarKey = Readonly<{
  principalId: string;
  repositoryId: string;
}>;

export function createRepositoryStarKey(input: {
  principalId: string;
  repositoryId: string;
}): RepositoryStarKey {
  const principalId = input.principalId.trim();
  const repositoryId = input.repositoryId.trim();
  if (!principalId)
    throw new InvalidRepositoryStarError(
      "Repository Star Principal identity must not be empty.",
    );
  if (!repositoryId)
    throw new InvalidRepositoryStarError(
      "Repository Star Repository identity must not be empty.",
    );
  return { principalId, repositoryId };
}
