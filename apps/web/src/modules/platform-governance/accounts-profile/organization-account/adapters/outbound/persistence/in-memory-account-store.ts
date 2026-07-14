import type { AccountStore } from "../../../application/ports/outbound/account-store.port";
import {
  createOrganization,
  type Account,
} from "../../../domain/organization-account/aggregates/account";

type AccountSeed = Readonly<{
  id: string;
  handle: string;
  kind: "organization";
  status?: "active";
}>;

export class InMemoryAccountStore implements AccountStore {
  private readonly accounts = new Map<string, Account>();
  constructor(seed: readonly AccountSeed[] = []) {
    seed.forEach((item) => {
      const account = createOrganization(item);
      this.accounts.set(account.id, account);
    });
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
