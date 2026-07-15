import type { RepositoryParticipationApiV1 } from "../../../../../repository-work/repository-governance/contracts/v1/public";
import type { RepositorySafetyParticipation } from "../../../application/ports/outbound/repository-safety-participation-port";

export function createRepositorySafetyParticipationAdapter(
  repositories: RepositoryParticipationApiV1,
): RepositorySafetyParticipation {
  return {
    async scope(repositoryId) {
      const scope = await repositories.collaborationScope(repositoryId);
      return (
        scope && {
          repositoryId: scope.repositoryId,
          visibility: scope.visibility,
          status: scope.status,
        }
      );
    },
    async allowed(input) {
      const result = await repositories.participation({
        repositoryId: input.repositoryId,
        principal: input.principal,
        action:
          input.action === "manage"
            ? "community-safety:manage"
            : "community-safety:interact",
      });
      return result.allowed;
    },
  };
}
