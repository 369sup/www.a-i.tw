import type {
  ProfileDirectoryApiV1,
  AccountProfileV1,
} from "../../contracts/v1/public";
import {
  initializeAccountProfile,
  profilesAreEqual,
} from "../../domain/profile-presence/aggregates/account-profile";
import { ProfileAlreadyInitializedError } from "../../domain/profile-presence/errors/profile-already-initialized-error";
import { createUpdateProfileHandler } from "../commands/update-profile/handler";
import type { UpdateProfileCommand } from "../commands/update-profile/command";
import type { ProfileStore } from "../ports/outbound/profile-store-port";

export interface ProfileService extends ProfileDirectoryApiV1 {
  resolve(accountId: string): Promise<AccountProfileV1 | undefined>;
  initialize(profile: AccountProfileV1): Promise<AccountProfileV1>;
  update(input: UpdateProfileCommand): Promise<AccountProfileV1>;
}

export function createProfileService(profiles: ProfileStore): ProfileService {
  const directory = createProfileDirectoryService(profiles);
  const updateProfile = createUpdateProfileHandler(profiles);
  return {
    ...directory,
    async update(input) {
      return updateProfile.execute(input);
    },
  };
}

export function createProfileDirectoryService(
  profiles: ProfileStore,
): ProfileDirectoryApiV1 {
  return {
    async resolve(accountId) {
      return profiles.find(accountId);
    },
    async initialize(profile) {
      const candidate = initializeAccountProfile(profile);
      const existing = await profiles.find(candidate.accountId);
      if (existing) {
        if (!profilesAreEqual(existing, candidate)) {
          throw new ProfileAlreadyInitializedError();
        }
        return existing;
      }
      await profiles.save(candidate);
      return candidate;
    },
  };
}
