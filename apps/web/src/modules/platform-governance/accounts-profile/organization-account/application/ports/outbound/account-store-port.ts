import type { OrganizationAccount } from "../../../domain/organization-account/aggregates/organization-account";
import type { AccountHandle } from "../../../domain/organization-account/value-objects/account-handle";

export interface AccountStore {
  list(): Promise<OrganizationAccount[]>;
  find(accountId: string): Promise<OrganizationAccount | undefined>;
  findByHandle(handle: AccountHandle): Promise<OrganizationAccount | undefined>;
  save(account: OrganizationAccount): Promise<void>;
}
