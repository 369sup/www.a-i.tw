// Export Context-owned factories and adapters for apps/web/src/server/composition only.
import { createInMemoryRepositoryStarStore } from "../adapters/outbound/persistence/in-memory-repository-star-store";
import type { RepositoryStarParticipation } from "../application/ports/outbound/repository-star-participation-port";
import { createSocialCurationService } from "../application/use-cases/social-curation-service";

export { createRepositoryStarParticipationAdapter } from "../adapters/outbound/integrations/repository-star-participation-adapter";

export function createSocialCurationComposition(
  repositories: RepositoryStarParticipation,
  now: () => Date = () => new Date(),
) {
  return createSocialCurationService(
    createInMemoryRepositoryStarStore(),
    repositories,
    now,
  );
}
