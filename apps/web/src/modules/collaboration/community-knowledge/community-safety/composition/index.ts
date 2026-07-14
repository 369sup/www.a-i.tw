// Export Context-owned factories and adapters for apps/web/src/server/composition only.
import { createInMemoryRepositoryInteractionLimitStore } from "../adapters/outbound/persistence/in-memory-repository-interaction-limit-store";
import type { RepositorySafetyParticipation } from "../application/ports/outbound/repository-safety-participation.port";
import { createCommunitySafetyService } from "../application/use-cases/community-safety-service";

export { createRepositorySafetyParticipationAdapter } from "../adapters/outbound/integrations/repository-safety-participation.adapter";

export function createCommunitySafetyComposition(
  repositories: RepositorySafetyParticipation,
  now: () => Date = () => new Date(),
) {
  return createCommunitySafetyService(
    createInMemoryRepositoryInteractionLimitStore(),
    repositories,
    now,
  );
}
