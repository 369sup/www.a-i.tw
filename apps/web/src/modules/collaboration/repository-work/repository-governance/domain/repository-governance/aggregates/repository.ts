import {
  createRepositoryDescription,
  type RepositoryDescription,
} from "../value-objects/repository-description";
import {
  createRepositoryId,
  type RepositoryId,
} from "../value-objects/repository-id";
import {
  createRepositoryHomepageUrl,
  type RepositoryHomepageUrl,
} from "../value-objects/repository-homepage-url";
import {
  createRepositoryNameWithOwner,
  type RepositoryNameWithOwner,
} from "../value-objects/repository-name-with-owner";
import {
  createRepositoryName,
  type RepositoryName,
} from "../value-objects/repository-name";
import {
  createRepositoryOwnerReference,
  type RepositoryOwnerReference,
} from "../value-objects/repository-owner-reference";
import type { RepositoryState } from "../value-objects/repository-state";
import {
  createRepositoryVisibility,
  type RepositoryVisibility,
} from "../value-objects/repository-visibility";

export type Repository = Readonly<{
  id: RepositoryId;
  owner: RepositoryOwnerReference;
  name: RepositoryName;
  nameWithOwner: RepositoryNameWithOwner;
  description: RepositoryDescription;
  homepageUrl?: RepositoryHomepageUrl;
  visibility: RepositoryVisibility;
  status: RepositoryState;
  features: Readonly<{ wikiEnabled: boolean }>;
}>;

export function normalizeRepositoryName(value: string): string {
  return createRepositoryName(value);
}

export function createRepository(input: {
  id: string;
  owner: {
    accountId: string;
    login: string;
    kind: "personal" | "organization";
  };
  name: string;
  description: string;
  homepageUrl?: string;
  visibility: RepositoryVisibility;
}): Repository {
  const owner = createRepositoryOwnerReference(input.owner);
  const name = createRepositoryName(input.name);
  return {
    id: createRepositoryId(input.id),
    owner,
    name,
    nameWithOwner: createRepositoryNameWithOwner(owner, name),
    description: createRepositoryDescription(input.description),
    homepageUrl: input.homepageUrl?.trim()
      ? createRepositoryHomepageUrl(input.homepageUrl)
      : undefined,
    visibility: createRepositoryVisibility(input.visibility),
    status: "active",
    features: { wikiEnabled: true },
  };
}

export function configureRepositoryWiki(
  repository: Repository,
  enabled: boolean,
): Repository {
  if (repository.status === "archived")
    throw new Error("Archived repositories cannot change Wiki availability.");
  return {
    ...repository,
    features: { ...repository.features, wikiEnabled: enabled },
  };
}

export function renameRepository(
  repository: Repository,
  name: string,
): Repository {
  if (repository.status === "archived")
    throw new Error("Archived repositories cannot be renamed.");
  const normalizedName = createRepositoryName(name);
  return {
    ...repository,
    name: normalizedName,
    nameWithOwner: createRepositoryNameWithOwner(
      repository.owner,
      normalizedName,
    ),
  };
}

export function changeVisibility(
  repository: Repository,
  visibility: RepositoryVisibility,
): Repository {
  if (repository.status === "archived")
    throw new Error("Archived repositories cannot change visibility.");
  return { ...repository, visibility };
}

export function archiveRepository(repository: Repository): Repository {
  if (repository.status === "archived")
    throw new Error("Repository is already archived.");
  return { ...repository, status: "archived" };
}

export function unarchiveRepository(repository: Repository): Repository {
  if (repository.status !== "archived")
    throw new Error("Repository is not archived.");
  return { ...repository, status: "active" };
}
