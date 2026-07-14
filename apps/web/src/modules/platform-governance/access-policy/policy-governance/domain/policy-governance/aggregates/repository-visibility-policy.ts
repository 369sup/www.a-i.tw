export type RepositoryVisibilityPolicy = Readonly<{
  publicRepositoryCreation: "allowed" | "forbidden";
  publicVisibilityChange: "allowed" | "forbidden";
}>;

export const defaultRepositoryVisibilityPolicy: RepositoryVisibilityPolicy = {
  publicRepositoryCreation: "allowed",
  publicVisibilityChange: "allowed",
};
