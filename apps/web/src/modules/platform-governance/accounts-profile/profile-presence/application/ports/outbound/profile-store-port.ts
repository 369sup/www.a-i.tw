import type { AccountProfile } from "../../../domain/profile-presence/aggregates/account-profile";

export interface ProfileStore {
  find(accountId: string): Promise<AccountProfile | undefined>;
  save(profile: AccountProfile): Promise<void>;
}
