import type { PersonalAccount } from "../../../domain/user-account/aggregates/personal-account";

export interface UserAccountStore {
  listAccounts(): Promise<readonly PersonalAccount[]>;
  findAccount(accountId: string): Promise<PersonalAccount | undefined>;
  findByPrincipal(principalId: string): Promise<PersonalAccount | undefined>;
  saveAccount(account: PersonalAccount): Promise<void>;
}
