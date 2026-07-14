import type { RepositoryParticipationApiV1 } from "@/src/modules/collaboration/repository-work/repository-governance/contracts/v1/public";

import type { RepositoryDiscussionParticipation } from "../../../application/ports/outbound/repository-discussion-participation.port";

export class RepositoryDiscussionParticipationAdapter implements RepositoryDiscussionParticipation {
  constructor(private readonly repositoryApi: RepositoryParticipationApiV1) {}

  async exists(repositoryId: string) {
    return Boolean(await this.repositoryApi.collaborationScope(repositoryId));
  }

  async allowed(
    input: Parameters<RepositoryDiscussionParticipation["allowed"]>[0],
  ) {
    return (await this.repositoryApi.participation(input)).allowed;
  }
}
