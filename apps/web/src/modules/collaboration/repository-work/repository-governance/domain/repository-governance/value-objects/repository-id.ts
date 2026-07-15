import { InvalidRepositoryIdError } from "../errors/invalid-repository-id-error";

declare const repositoryIdBrand: unique symbol;

export type RepositoryId = string & {
  readonly [repositoryIdBrand]: "RepositoryId";
};

export function createRepositoryId(input: string): RepositoryId {
  const value = input.trim();
  if (!value) throw new InvalidRepositoryIdError();
  return value as RepositoryId;
}
