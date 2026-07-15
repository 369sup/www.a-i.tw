import { InvalidRepositoryAccessGrantError } from "../errors/invalid-repository-access-grant-error";
import {
  createRepositoryRole,
  type RepositoryRole,
} from "../value-objects/repository-role";

export type RepositoryAccessSubject =
  | Readonly<{ type: "principal"; principalId: string }>
  | Readonly<{ type: "team"; teamId: string }>;

export type RepositoryAccessGrant = Readonly<{
  repositoryId: string;
  subject: RepositoryAccessSubject;
  role: RepositoryRole;
}>;

export function createRepositoryAccessGrant(input: {
  repositoryId: string;
  subject: RepositoryAccessSubject;
  role: string;
}): RepositoryAccessGrant {
  const repositoryId = requiredId(input.repositoryId, "Repository id");
  const subject =
    input.subject.type === "principal"
      ? ({
          type: "principal",
          principalId: requiredId(input.subject.principalId, "Principal id"),
        } as const)
      : ({
          type: "team",
          teamId: requiredId(input.subject.teamId, "Team id"),
        } as const);
  return {
    repositoryId,
    subject,
    role: createRepositoryRole(input.role),
  };
}

function requiredId(input: string, label: string) {
  const value = input.trim();
  if (!value)
    throw new InvalidRepositoryAccessGrantError(`${label} is required.`);
  return value;
}
