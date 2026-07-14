// Export Context-owned factories and adapters for apps/web/src/server/composition only.
import { createInMemoryWikiStore } from "../adapters/outbound/persistence/in-memory-wiki-store";
import { createRepositoryWikiService } from "../application/use-cases/repository-wiki-service";
import type { RepositoryWikiParticipation } from "../application/ports/outbound/repository-wiki-participation.port";

export { createRepositoryWikiParticipationAdapter } from "../adapters/outbound/integrations/repository-wiki-participation.adapter";

export function createKnowledgeWikiComposition(
  repositories: RepositoryWikiParticipation,
) {
  return createRepositoryWikiService(createInMemoryWikiStore(), repositories);
}
