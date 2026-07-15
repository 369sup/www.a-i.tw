import type { UserAccountStore } from "../../../application/ports/outbound/user-account-store-port";
import {
  activatePersonalAccount,
  createPersonalAccount,
  type PersonalAccount,
} from "../../../domain/user-account/aggregates/personal-account";

export class InMemoryUserAccountStore implements UserAccountStore {
  private readonly accounts = new Map<string, PersonalAccount>();
  constructor(
    seed: readonly { id: string; handle: string; principalId: string }[] = [],
  ) {
    for (const item of seed) {
      const account = activatePersonalAccount(createPersonalAccount(item));
      this.accounts.set(account.id, account);
    }
  }
  async listAccounts() {
    return [...this.accounts.values()];
  }
  async findAccount(accountId: string) {
    return this.accounts.get(accountId);
  }
  async findByPrincipal(principalId: string) {
    return [...this.accounts.values()].find(
      (value) => value.principalId === principalId,
    );
  }
  async saveAccount(account: PersonalAccount) {
    this.accounts.set(account.id, account);
  }
}
