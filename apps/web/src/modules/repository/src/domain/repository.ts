export type RepositoryVisibility = "public" | "private";
export type RepositoryRole = "read" | "write" | "maintain" | "admin";

export type Repository = Readonly<{
  id: string;
  ownerAccountId: string;
  ownerHandle: string;
  name: string;
  description: string;
  visibility: RepositoryVisibility;
  status: "active" | "archived";
}>;

export type AccessGrant = Readonly<{
  repositoryId: string;
  principalId: string;
  role: RepositoryRole;
}>;

export function normalizeRepositoryName(value: string): string {
  const name = value.trim().toLowerCase().replaceAll(" ", "-");
  if (!/^[a-z0-9._-]{1,100}$/.test(name))
    throw new Error("Repository name is invalid.");
  return name;
}

export function createRepository(
  input: Omit<Repository, "name" | "status"> & { name: string },
): Repository {
  const description = input.description.trim();
  return {
    ...input,
    name: normalizeRepositoryName(input.name),
    description,
    status: "active",
  };
}

export function renameRepository(
  repository: Repository,
  name: string,
): Repository {
  if (repository.status === "archived")
    throw new Error("Archived repositories cannot be renamed.");
  return { ...repository, name: normalizeRepositoryName(name) };
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
