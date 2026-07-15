import { defineAccountProfile } from "../../../domain/profile-presence/entities/profile";
import type { UpdateProfileUseCase } from "../../ports/inbound/update-profile-use-case";
import type { ProfileAccountDirectory } from "../../ports/outbound/account-directory-port";
import type { ProfileStore } from "../../ports/outbound/profile-store-port";

export function createUpdateProfileHandler(
  accounts: ProfileAccountDirectory,
  profiles: ProfileStore,
): UpdateProfileUseCase {
  return {
    async execute(command) {
      if (!(await accounts.exists(command.accountId)))
        throw new Error("Account not found.");

      const profile = defineAccountProfile(command);
      await profiles.save(profile);
      return profile;
    },
  };
}
