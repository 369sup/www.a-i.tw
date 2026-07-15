import { InvalidRepositoryNameError } from "../errors/invalid-repository-name-error";

declare const repositoryNameBrand: unique symbol;

export type RepositoryName = string & {
  readonly [repositoryNameBrand]: "RepositoryName";
};

export function createRepositoryName(input: string): RepositoryName {
  const value = input.trim().toLowerCase().replaceAll(" ", "-");
  if (!/^[a-z0-9._-]{1,100}$/.test(value))
    throw new InvalidRepositoryNameError();
  return value as RepositoryName;
}
