import type { RepositoryParticipationApiV1 } from "../../../../../repository-work/repository-governance/contracts/v1/public";
import type { RepositoryWikiParticipation } from "../../../application/ports/outbound/repository-wiki-participation.port";

export function createRepositoryWikiParticipationAdapter(
  repositories: RepositoryParticipationApiV1,
): RepositoryWikiParticipation {
  return {
    async scope(repositoryId) {
      const scope = await repositories.collaborationScope(repositoryId);
      return (
        scope && {
          repositoryId: scope.repositoryId,
          status: scope.status,
          wikiEnabled: scope.features.wikiEnabled,
        }
      );
    },
    async allowed(input) {
      const decision = await repositories.participation({
        repositoryId: input.repositoryId,
        principal: input.principal,
        action: input.action === "read" ? "wiki:read" : "wiki:write",
      });
      return decision.allowed;
    },
  };
}
