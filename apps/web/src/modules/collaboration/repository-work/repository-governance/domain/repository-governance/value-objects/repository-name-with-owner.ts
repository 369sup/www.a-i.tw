import type { RepositoryName } from "./repository-name";
import type { RepositoryOwnerReference } from "./repository-owner-reference";

declare const repositoryNameWithOwnerBrand: unique symbol;

export type RepositoryNameWithOwner = string & {
  readonly [repositoryNameWithOwnerBrand]: "RepositoryNameWithOwner";
};

export function createRepositoryNameWithOwner(
  owner: RepositoryOwnerReference,
  name: RepositoryName,
): RepositoryNameWithOwner {
  return `${owner.login}/${name}` as RepositoryNameWithOwner;
}
