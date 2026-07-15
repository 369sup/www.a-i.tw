import type { RepositoryParticipationApiV1 } from "../../../../../../collaboration/repository-work/repository-governance/contracts/v1/public";
import type { RepositoryStarParticipation } from "../../../application/ports/outbound/repository-star-participation-port";

export function createRepositoryStarParticipationAdapter(
  repositories: RepositoryParticipationApiV1,
): RepositoryStarParticipation {
  return {
    async canRead(input) {
      const decision = await repositories.participation({
        ...input,
        action: "repository:read",
      });
      return decision.allowed;
    },
  };
}
