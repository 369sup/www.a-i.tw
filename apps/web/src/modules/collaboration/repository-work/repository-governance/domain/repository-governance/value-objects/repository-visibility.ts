export type RepositoryVisibility = "public" | "private" | "internal";

export function createRepositoryVisibility(
  input: string,
): RepositoryVisibility {
  if (input === "public" || input === "private" || input === "internal")
    return input;
  throw new Error(
    "Repository visibility must be public, private, or internal.",
  );
}
