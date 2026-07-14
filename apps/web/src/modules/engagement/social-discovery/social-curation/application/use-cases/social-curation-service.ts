import type {
  RepositoryStarV1,
  SocialCurationApiV1,
  SocialCurationPrincipalV1,
} from "../../contracts/v1/public";
import { createRepositoryStar } from "../../domain/social-curation/aggregates/repository-star";
import { createRepositoryStarKey } from "../../domain/social-curation/value-objects/repository-star-key";
import type { RepositoryStarParticipation } from "../ports/outbound/repository-star-participation.port";
import type { RepositoryStarStore } from "../ports/outbound/repository-star-store.port";

function requireActive(principal: SocialCurationPrincipalV1) {
  if (principal.status !== "active")
    throw new Error("Active User Principal is required for Repository Stars.");
}

async function requireReadable(
  repositories: RepositoryStarParticipation,
  input: {
    repositoryId: string;
    principal: SocialCurationPrincipalV1;
  },
) {
  const key = createRepositoryStarKey({
    principalId: input.principal.principalId,
    repositoryId: input.repositoryId,
  });
  if (
    !(await repositories.canRead({ ...input, repositoryId: key.repositoryId }))
  )
    throw new Error("Repository Star target is unavailable.");
  return key;
}

function toContract(star: RepositoryStarV1): RepositoryStarV1 {
  return { ...star };
}

export function createSocialCurationService(
  store: RepositoryStarStore,
  repositories: RepositoryStarParticipation,
  now: () => Date,
): SocialCurationApiV1 {
  return {
    async star(input) {
      requireActive(input.principal);
      const key = await requireReadable(repositories, input);
      const current = await store.find(key.principalId, key.repositoryId);
      if (current) return toContract(current);
      const star = createRepositoryStar({ ...key, starredAt: now() });
      await store.save(star);
      return toContract(star);
    },
    async unstar(input) {
      requireActive(input.principal);
      const key = await requireReadable(repositories, input);
      await store.delete(key.principalId, key.repositoryId);
    },
    async isStarred(input) {
      requireActive(input.principal);
      const key = await requireReadable(repositories, input);
      return Boolean(await store.find(key.principalId, key.repositoryId));
    },
    async list(principal) {
      requireActive(principal);
      const records = await store.listByPrincipal(principal.principalId);
      const readable = await Promise.all(
        records.map(async (star) => ({
          star,
          allowed: await repositories.canRead({
            repositoryId: star.repositoryId,
            principal,
          }),
        })),
      );
      return readable
        .filter((item) => item.allowed)
        .map((item) => toContract(item.star))
        .sort((left, right) => right.starredAt.localeCompare(left.starredAt));
    },
  };
}
