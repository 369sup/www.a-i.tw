import type { PrincipalRefV1 } from "@/src/modules/identity-access/src/contracts/public";
import type { AccountEligibilityV1, AccountRefV1 } from "../contracts/public";
import {
  createAccount,
  type Account,
  type AccountKind,
} from "../domain/account";

export interface AccountStore {
  list(): Promise<Account[]>;
  find(accountId: string): Promise<Account | undefined>;
  findByHandle(handle: string): Promise<Account | undefined>;
  save(account: Account): Promise<void>;
}

export interface AccountService {
  listAccounts(): Promise<AccountRefV1[]>;
  resolve(accountId: string): Promise<AccountRefV1 | undefined>;
  eligibility(accountId: string): Promise<AccountEligibilityV1 | undefined>;
  create(input: {
    principal: PrincipalRefV1;
    handle: string;
    displayName: string;
    kind: AccountKind;
  }): Promise<AccountRefV1>;
}

export function createAccountService(
  store: AccountStore,
  nextId: () => string,
): AccountService {
  return {
    async listAccounts() {
      return (await store.list()).map(toRef);
    },
    async resolve(accountId) {
      const account = await store.find(accountId);
      return account && toRef(account);
    },
    async eligibility(accountId) {
      const account = await store.find(accountId);
      return (
        account && {
          account: toRef(account),
          canOwnRepository: account.status === "active",
        }
      );
    },
    async create(input) {
      if (input.principal.status !== "active")
        throw new Error("An active principal is required.");
      const candidate = createAccount({
        id: nextId(),
        handle: input.handle,
        displayName: input.displayName,
        kind: input.kind,
        ownerPrincipalId: input.principal.principalId,
      });
      if (await store.findByHandle(candidate.handle))
        throw new Error("Account handle is already in use.");
      await store.save(candidate);
      return toRef(candidate);
    },
  };
}

function toRef(account: Account): AccountRefV1 {
  return {
    accountId: account.id,
    handle: account.handle,
    displayName: account.displayName,
    kind: account.kind,
    status: account.status,
  };
}
