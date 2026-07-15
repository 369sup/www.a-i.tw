import type { Account } from "../../../domain/organization-account/aggregates/account";
import type { AccountHandle } from "../../../domain/organization-account/value-objects/account-handle";

export interface AccountStore {
  list(): Promise<Account[]>;
  find(accountId: string): Promise<Account | undefined>;
  findByHandle(handle: AccountHandle): Promise<Account | undefined>;
  save(account: Account): Promise<void>;
}
