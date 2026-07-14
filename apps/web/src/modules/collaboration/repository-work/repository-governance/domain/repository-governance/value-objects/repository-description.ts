declare const repositoryDescriptionBrand: unique symbol;

export type RepositoryDescription = string & {
  readonly [repositoryDescriptionBrand]: "RepositoryDescription";
};

export function createRepositoryDescription(
  input: string,
): RepositoryDescription {
  return input.trim() as RepositoryDescription;
}
