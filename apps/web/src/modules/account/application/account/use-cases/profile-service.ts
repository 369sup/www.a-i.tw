import type { AccountProfileV1 } from "../../../contracts/account/public";
import {
  defineAccountProfile,
  type AccountProfile,
} from "../../../domain/account/entities/profile";
import type { AccountStore } from "./account-service";

export interface ProfileStore {
  find(accountId: string): Promise<AccountProfile | undefined>;
  save(profile: AccountProfile): Promise<void>;
}

export interface ProfileService {
  resolve(accountId: string): Promise<AccountProfileV1 | undefined>;
  update(input: AccountProfile): Promise<AccountProfileV1>;
}

export function createProfileService(
  accounts: AccountStore,
  profiles: ProfileStore,
): ProfileService {
  return {
    async resolve(accountId) {
      return profiles.find(accountId);
    },
    async update(input) {
      if (!(await accounts.find(input.accountId)))
        throw new Error("Account not found.");
      const profile = defineAccountProfile(input);
      await profiles.save(profile);
      return profile;
    },
  };
}
