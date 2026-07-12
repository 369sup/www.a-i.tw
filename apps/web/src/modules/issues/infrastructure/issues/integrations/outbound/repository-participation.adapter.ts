import type { RepositoryParticipationApiV1 } from "@/src/modules/repository/contracts/repository/public";

import type { RepositoryParticipation } from "../../../../application/issues/ports/outbound/repository-participation.port";

export class RepositoryParticipationAdapter implements RepositoryParticipation {
  constructor(private readonly repositoryApi: RepositoryParticipationApiV1) {}

  async exists(repositoryId: string) {
    return Boolean(await this.repositoryApi.collaborationScope(repositoryId));
  }

  async allowed(input: Parameters<RepositoryParticipation["allowed"]>[0]) {
    return (await this.repositoryApi.participation(input)).allowed;
  }
}
