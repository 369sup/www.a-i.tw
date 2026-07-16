import type { ProfileDirectoryApiV1 } from "@/src/modules/platform-governance/accounts-profile/profile-presence/contracts/v1/public";
import type { ProfileDirectory } from "../../../application/ports/outbound/profile-directory-port";

export class ProfileDirectoryAdapter implements ProfileDirectory {
  constructor(private readonly profiles: ProfileDirectoryApiV1) {}

  async initialize(
    profile: Parameters<ProfileDirectory["initialize"]>[0],
  ): Promise<void> {
    await this.profiles.initialize(profile);
  }
}
