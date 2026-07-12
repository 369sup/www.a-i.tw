import type { AccountStore } from "../../../application/account/use-cases/account-service";
import type { Account } from "../../../domain/account/aggregates/account";

export class InMemoryAccountStore implements AccountStore {
  private readonly accounts = new Map<string, Account>();
  constructor(seed: Account[] = []) {
    seed.forEach((account) => this.accounts.set(account.id, account));
  }
  async list() {
    return [...this.accounts.values()];
  }
  async find(accountId: string) {
    return this.accounts.get(accountId);
  }
  async findByHandle(handle: string) {
    return [...this.accounts.values()].find((item) => item.handle === handle);
  }
  async save(account: Account) {
    this.accounts.set(account.id, account);
  }
}
