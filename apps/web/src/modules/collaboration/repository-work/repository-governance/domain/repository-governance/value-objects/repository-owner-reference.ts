import { InvalidRepositoryOwnerError } from "../errors/invalid-repository-owner-error";

export type RepositoryOwnerReference = Readonly<
  | { type: "personal-account"; accountId: string; login: string }
  | { type: "organization"; accountId: string; login: string }
>;

export function createRepositoryOwnerReference(input: {
  accountId: string;
  login: string;
  kind: "personal" | "organization";
}): RepositoryOwnerReference {
  const accountId = input.accountId.trim();
  const login = input.login.trim().toLowerCase();
  if (!accountId || !login) throw new InvalidRepositoryOwnerError();
  return input.kind === "personal"
    ? { type: "personal-account", accountId, login }
    : { type: "organization", accountId, login };
}
