import type {
  CommunityInteractionActionV1,
  CommunityInteractionDecisionV1,
  CommunitySafetyApiV1,
  RepositoryInteractionLimitV1,
} from "../../contracts/v1/public";
import {
  activateRepositoryInteractionLimit,
  isRepositoryInteractionLimitActive,
  removeRepositoryInteractionLimit,
  type RepositoryInteractionLimit,
} from "../../domain/community-safety/aggregates/repository-interaction-limit";
import type { RepositoryInteractionLimitStore } from "../ports/outbound/repository-interaction-limit-store-port";
import type { RepositorySafetyParticipation } from "../ports/outbound/repository-safety-participation-port";

function toContract(
  limit: RepositoryInteractionLimit,
  now: Date,
): RepositoryInteractionLimitV1 {
  return {
    ...limit,
    status: limit.removedAt
      ? "removed"
      : isRepositoryInteractionLimitActive(limit, now)
        ? "active"
        : "expired",
  };
}

async function requirePublicActiveRepository(
  repositories: RepositorySafetyParticipation,
  repositoryId: string,
) {
  const scope = await repositories.scope(repositoryId);
  if (!scope) throw new Error("Repository safety scope not found.");
  if (scope.visibility !== "public")
    throw new Error("Interaction Limits require a public Repository.");
  if (scope.status !== "active")
    throw new Error("Interaction Limits require an active Repository.");
}

export function createCommunitySafetyService(
  store: RepositoryInteractionLimitStore,
  repositories: RepositorySafetyParticipation,
  now: () => Date,
): CommunitySafetyApiV1 {
  async function requireManager(input: {
    repositoryId: string;
    principal: { principalId: string; status: "active" | "disabled" };
  }) {
    if (input.principal.status !== "active")
      throw new Error("Active Principal is required.");
    await requirePublicActiveRepository(repositories, input.repositoryId);
    if (
      !(await repositories.allowed({
        ...input,
        action: "manage",
      }))
    )
      throw new Error("Interaction Limit management denied.");
  }

  return {
    async activate(input) {
      await requireManager(input);
      const current = await store.find(input.repositoryId);
      const at = now();
      if (current && isRepositoryInteractionLimitActive(current, at))
        throw new Error("Repository already has an active Interaction Limit.");
      const limit = activateRepositoryInteractionLimit({
        ...input,
        activatedAt: at,
      });
      await store.save(limit);
      return toContract(limit, at);
    },
    async remove(input) {
      await requireManager(input);
      const current = await store.find(input.repositoryId);
      if (!current) throw new Error("Active Interaction Limit not found.");
      const at = now();
      const removed = removeRepositoryInteractionLimit(current, at);
      await store.save(removed);
      return toContract(removed, at);
    },
    async get(repositoryId) {
      const limit = await store.find(repositoryId);
      return limit && toContract(limit, now());
    },
    async decide(input): Promise<CommunityInteractionDecisionV1> {
      const limit = await store.find(input.repositoryId);
      const at = now();
      if (!limit || !isRepositoryInteractionLimitActive(limit, at))
        return decision(input, true, "no-active-limit");
      if (input.principal.status !== "active")
        return decision(input, false, "interaction-limited");
      try {
        await requirePublicActiveRepository(repositories, input.repositoryId);
        const allowed = await repositories.allowed({
          repositoryId: input.repositoryId,
          principal: input.principal,
          action: "interact",
        });
        return decision(
          input,
          allowed,
          allowed ? "collaborator" : "interaction-limited",
        );
      } catch {
        return decision(input, false, "unavailable");
      }
    },
  };
}

function decision(
  input: {
    repositoryId: string;
    principal: { principalId: string };
    action: CommunityInteractionActionV1;
  },
  allowed: boolean,
  reason: CommunityInteractionDecisionV1["reason"],
): CommunityInteractionDecisionV1 {
  return {
    repositoryId: input.repositoryId,
    principalId: input.principal.principalId,
    action: input.action,
    allowed,
    reason,
  };
}
