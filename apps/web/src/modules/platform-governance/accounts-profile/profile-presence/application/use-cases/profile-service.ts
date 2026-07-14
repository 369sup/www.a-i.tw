import type {
  ProfileDirectoryApiV1,
  AccountProfileV1,
} from "../../contracts/v1/public";
import { defineAccountProfile } from "../../domain/profile-presence/entities/profile";
import { createUpdateProfileHandler } from "../commands/update-profile/handler";
import type { UpdateProfileCommand } from "../commands/update-profile/command";
import type { ProfileAccountDirectory } from "../ports/outbound/account-directory.port";
import type { ProfileStore } from "../ports/outbound/profile-store.port";

export interface ProfileService extends ProfileDirectoryApiV1 {
  resolve(accountId: string): Promise<AccountProfileV1 | undefined>;
  update(input: UpdateProfileCommand): Promise<AccountProfileV1>;
}

export function createProfileService(
  accounts: ProfileAccountDirectory,
  profiles: ProfileStore,
): ProfileService {
  const updateProfile = createUpdateProfileHandler(accounts, profiles);
  return {
    async resolve(accountId) {
      return profiles.find(accountId);
    },
    async save(profile) {
      await profiles.save(defineAccountProfile(profile));
    },
    async update(input) {
      return updateProfile.execute(input);
    },
  };
}
