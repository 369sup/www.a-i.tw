import type { AccountStore } from "../../../application/ports/outbound/account-store-port";
import {
  rehydrateOrganizationAccount,
  type OrganizationAccount,
} from "../../../domain/organization-account/aggregates/organization-account";

type AccountSeed = Readonly<{
  id: string;
  handle: string;
  kind: "organization";
  status?: "provisioning" | "active" | "suspended";
}>;

export class InMemoryAccountStore implements AccountStore {
  private readonly accounts = new Map<string, OrganizationAccount>();
  constructor(seed: readonly AccountSeed[] = []) {
    seed.forEach((item) => {
      const account = rehydrateOrganizationAccount({
        ...item,
        status: item.status ?? "active",
      });
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
  async save(account: OrganizationAccount) {
    this.accounts.set(account.id, account);
  }
}
