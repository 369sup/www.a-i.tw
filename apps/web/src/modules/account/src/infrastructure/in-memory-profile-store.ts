import type { ProfileStore } from "../application/profile-service";
import type { AccountProfile } from "../domain/profile";

export class InMemoryProfileStore implements ProfileStore {
  private readonly profiles = new Map<string, AccountProfile>();

  constructor(seed: readonly AccountProfile[] = []) {
    seed.forEach((profile) => this.profiles.set(profile.accountId, profile));
  }

  async find(accountId: string) {
    return this.profiles.get(accountId);
  }

  async save(profile: AccountProfile) {
    this.profiles.set(profile.accountId, profile);
  }
}
