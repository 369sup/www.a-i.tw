import type { ProfileStore } from "../../../application/ports/outbound/profile-store-port";
import {
  initializeAccountProfile,
  type AccountProfile,
  type AccountProfileInput,
} from "../../../domain/profile-presence/aggregates/account-profile";

export class InMemoryProfileStore implements ProfileStore {
  private readonly profiles = new Map<string, AccountProfile>();

  constructor(seed: readonly AccountProfileInput[] = []) {
    seed.forEach((item) => {
      const profile = initializeAccountProfile(item);
      this.profiles.set(profile.accountId, profile);
    });
  }

  async find(accountId: string) {
    return this.profiles.get(accountId);
  }

  async save(profile: AccountProfile) {
    this.profiles.set(profile.accountId, profile);
  }
}
