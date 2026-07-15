import type { CommunitySafetyApiV1 } from "../../../../../community-knowledge/community-safety/contracts/v1/public";
import type { CommunityInteractionSafety } from "../../../application/ports/outbound/community-interaction-safety-port";

export class CommunityInteractionSafetyAdapter implements CommunityInteractionSafety {
  constructor(private readonly safety: CommunitySafetyApiV1) {}

  async allowed(input: Parameters<CommunityInteractionSafety["allowed"]>[0]) {
    return (await this.safety.decide(input)).allowed;
  }
}
