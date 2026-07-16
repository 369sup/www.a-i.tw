import type {
  OrganizationAccountApiV1,
  OrganizationEligibilityV1,
  OrganizationRefV1,
  ProvisionOrganizationAccountV1,
} from "../../contracts/v1/public";
import type { OrganizationAccount } from "../../domain/organization-account/aggregates/organization-account";
import { createCreateAccountHandler } from "../commands/create-account/handler";
import type { CreateAccountCommand } from "../commands/create-account/command";
import type { ProfileDirectory } from "../ports/outbound/profile-directory-port";
import type { AccountStore } from "../ports/outbound/account-store-port";

export interface AccountService extends OrganizationAccountApiV1 {
  listAccounts(): Promise<OrganizationRefV1[]>;
  resolve(accountId: string): Promise<OrganizationRefV1 | undefined>;
  eligibility(
    accountId: string,
  ): Promise<OrganizationEligibilityV1 | undefined>;
  create(input: CreateAccountCommand): Promise<OrganizationRefV1>;
  provision(input: ProvisionOrganizationAccountV1): Promise<OrganizationRefV1>;
}

export function createAccountService(
  store: AccountStore,
  profiles: ProfileDirectory,
  nextAccountId: () => string,
): AccountService {
  const createAccount = createCreateAccountHandler(
    store,
    profiles,
    nextAccountId,
  );

  const toRef = async (
    account: OrganizationAccount,
  ): Promise<OrganizationRefV1 | undefined> => {
    if (account.status === "provisioning") return undefined;
    return {
      accountId: account.id,
      handle: account.handle,
      kind: account.kind,
      status: account.status,
    };
  };

  return {
    async listAccounts() {
      return (await Promise.all((await store.list()).map(toRef))).filter(
        (account): account is OrganizationRefV1 => Boolean(account),
      );
    },
    async resolve(accountId) {
      const account = await store.find(accountId);
      return account ? toRef(account) : undefined;
    },
    async eligibility(accountId) {
      const account = await store.find(accountId);
      if (!account) return undefined;
      const reference = await toRef(account);
      return (
        reference && {
          account: reference,
          canOwnRepository: account.status === "active",
        }
      );
    },
    async create(input) {
      return createAccount.execute(input);
    },
    async provision(input) {
      return createAccount.execute({ ...input, kind: "organization" });
    },
  };
}
