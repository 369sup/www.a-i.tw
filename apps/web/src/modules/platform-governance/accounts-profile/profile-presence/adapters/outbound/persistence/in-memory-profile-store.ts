import type { ProfileStore } from "../../../application/ports/outbound/profile-store.port";
import {
  defineAccountProfile,
  type AccountProfile,
  type DefineAccountProfileInput,
} from "../../../domain/profile-presence/entities/profile";

export class InMemoryProfileStore implements ProfileStore {
  private readonly profiles = new Map<string, AccountProfile>();

  constructor(seed: readonly DefineAccountProfileInput[] = []) {
    seed.forEach((item) => {
      const profile = defineAccountProfile(item);
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
