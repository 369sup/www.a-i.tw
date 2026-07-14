import type {
  OrganizationEligibilityV1,
  OrganizationRefV1,
} from "../../contracts/v1/public";
import type { Account } from "../../domain/organization-account/aggregates/account";
import { createCreateAccountHandler } from "../commands/create-account/handler";
import type { CreateAccountCommand } from "../commands/create-account/command";
import type { ProfileDirectory } from "../ports/outbound/profile-directory.port";
import type { AccountStore } from "../ports/outbound/account-store.port";
import type { OrganizationMembershipWriter } from "../ports/outbound/organization-membership-writer.port";

export interface AccountService {
  listAccounts(): Promise<OrganizationRefV1[]>;
  resolve(accountId: string): Promise<OrganizationRefV1 | undefined>;
  eligibility(
    accountId: string,
  ): Promise<OrganizationEligibilityV1 | undefined>;
  create(input: CreateAccountCommand): Promise<OrganizationRefV1>;
}

export function createAccountService(
  store: AccountStore,
  profiles: ProfileDirectory,
  memberships: OrganizationMembershipWriter,
  nextAccountId: () => string,
  nextMembershipId: () => string,
  clock: () => Date,
): AccountService {
  const createAccount = createCreateAccountHandler(
    store,
    profiles,
    memberships,
    nextAccountId,
    nextMembershipId,
    clock,
  );

  const toRef = async (account: Account): Promise<OrganizationRefV1> => {
    const profile = await profiles.resolve(account.id);
    if (!profile) throw new Error("Account Profile not found.");
    return {
      accountId: account.id,
      handle: account.handle,
      displayName: profile.displayName,
      kind: account.kind,
      status: account.status,
    };
  };

  return {
    async listAccounts() {
      return Promise.all((await store.list()).map(toRef));
    },
    async resolve(accountId) {
      const account = await store.find(accountId);
      return account && toRef(account);
    },
    async eligibility(accountId) {
      const account = await store.find(accountId);
      return (
        account && {
          account: await toRef(account),
          canOwnRepository: account.status === "active",
        }
      );
    },
    async create(input) {
      return createAccount.execute(input);
    },
  };
}
