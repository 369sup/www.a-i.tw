import { updateAccountProfile } from "../../../domain/profile-presence/aggregates/account-profile";
import type { UpdateProfileUseCase } from "../../ports/inbound/update-profile-use-case";
import type { ProfileStore } from "../../ports/outbound/profile-store-port";

export function createUpdateProfileHandler(
  profiles: ProfileStore,
): UpdateProfileUseCase {
  return {
    async execute(command) {
      const current = await profiles.find(command.accountId);
      if (!current) throw new Error("Profile not found.");
      const profile = updateAccountProfile(current, command);
      await profiles.save(profile);
      return profile;
    },
  };
}
