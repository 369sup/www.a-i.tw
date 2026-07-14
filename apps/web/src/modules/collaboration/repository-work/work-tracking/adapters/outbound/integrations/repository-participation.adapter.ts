import type { RepositoryParticipationApiV1 } from "@/src/modules/collaboration/repository-work/repository-governance/contracts/v1/public";

import type { RepositoryParticipation } from "../../../application/ports/outbound/repository-participation.port";

export class RepositoryParticipationAdapter implements RepositoryParticipation {
  constructor(private readonly repositoryApi: RepositoryParticipationApiV1) {}

  async exists(repositoryId: string) {
    return Boolean(await this.repositoryApi.collaborationScope(repositoryId));
  }

  async allowed(input: Parameters<RepositoryParticipation["allowed"]>[0]) {
    return (await this.repositoryApi.participation(input)).allowed;
  }
}
