import { InvalidInteractionLimitError } from "../errors/invalid-interaction-limit-error";

export type InteractionLimitKind = "collaborators_only";
export type InteractionLimitExpiry = "one_day";
export type RepositoryInteractionLimit = Readonly<{
  repositoryId: string;
  kind: InteractionLimitKind;
  expiry: InteractionLimitExpiry;
  activatedAt: string;
  expiresAt: string;
  removedAt?: string;
}>;

const oneDayMilliseconds = 24 * 60 * 60 * 1000;

export function activateRepositoryInteractionLimit(input: {
  repositoryId: string;
  kind: InteractionLimitKind;
  expiry: InteractionLimitExpiry;
  activatedAt: Date;
}): RepositoryInteractionLimit {
  const repositoryId = input.repositoryId.trim();
  if (!repositoryId)
    throw new InvalidInteractionLimitError(
      "Interaction Limit Repository identity must not be empty.",
    );
  if (Number.isNaN(input.activatedAt.getTime()))
    throw new InvalidInteractionLimitError(
      "Interaction Limit activation time must be valid.",
    );
  return {
    repositoryId,
    kind: input.kind,
    expiry: input.expiry,
    activatedAt: input.activatedAt.toISOString(),
    expiresAt: new Date(
      input.activatedAt.getTime() + oneDayMilliseconds,
    ).toISOString(),
  };
}

export function removeRepositoryInteractionLimit(
  limit: RepositoryInteractionLimit,
  removedAt: Date,
): RepositoryInteractionLimit {
  if (Number.isNaN(removedAt.getTime()))
    throw new InvalidInteractionLimitError(
      "Interaction Limit removal time must be valid.",
    );
  if (!isRepositoryInteractionLimitActive(limit, removedAt))
    throw new InvalidInteractionLimitError(
      "Only an active Interaction Limit can be removed.",
    );
  return { ...limit, removedAt: removedAt.toISOString() };
}

export function isRepositoryInteractionLimitActive(
  limit: RepositoryInteractionLimit,
  at: Date,
): boolean {
  return !limit.removedAt && at.getTime() < Date.parse(limit.expiresAt);
}
