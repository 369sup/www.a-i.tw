import type {
  AccountEligibilityV1,
  AccountRefV1,
} from "../../../contracts/account/public";
import {
  createOrganization,
  createPersonalAccount,
  type Account,
  type AccountKind,
} from "../../../domain/account/aggregates/account";
import { defineAccountProfile } from "../../../domain/account/entities/profile";
import { activateMembership } from "../../../domain/account/entities/membership";
import type { AccountPrincipal } from "../ports/inbound/account-principal";

export interface AccountStore {
  list(): Promise<Account[]>;
  find(accountId: string): Promise<Account | undefined>;
  findByHandle(handle: string): Promise<Account | undefined>;
  save(account: Account): Promise<void>;
}

export interface AccountProfileDirectory {
  find(accountId: string): Promise<{ displayName: string } | undefined>;
  save(profile: {
    accountId: string;
    displayName: string;
    bio: string;
  }): Promise<void>;
}

export interface OrganizationMembershipWriter {
  save(membership: {
    id: string;
    accountId: string;
    principalId: string;
    role: "owner" | "member";
    status: "active" | "removed";
    joinedAt: string;
  }): Promise<void>;
}

export interface AccountService {
  listAccounts(): Promise<AccountRefV1[]>;
  resolve(accountId: string): Promise<AccountRefV1 | undefined>;
  eligibility(accountId: string): Promise<AccountEligibilityV1 | undefined>;
  create(input: {
    principal: AccountPrincipal;
    handle: string;
    displayName: string;
    kind: AccountKind;
  }): Promise<AccountRefV1>;
}

export function createAccountService(
  store: AccountStore,
  profiles: AccountProfileDirectory,
  memberships: OrganizationMembershipWriter,
  nextAccountId: () => string,
  nextMembershipId: () => string,
  clock: () => Date,
): AccountService {
  const toRef = async (account: Account): Promise<AccountRefV1> => {
    const profile = await profiles.find(account.id);
    if (!profile) throw new Error("Account Profile not found.");
    return {
      accountId: account.id,
      handle: account.handle,
      displayName: profile.displayName,
      kind: account.kind,
      status: account.status,
      personalPrincipalId:
        account.kind === "personal" ? account.principalId : undefined,
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
      if (input.principal.status !== "active")
        throw new Error("An active principal is required.");
      const id = nextAccountId();
      const candidate =
        input.kind === "personal"
          ? createPersonalAccount({
              id,
              handle: input.handle,
              principalId: input.principal.principalId,
            })
          : createOrganization({ id, handle: input.handle });
      if (await store.findByHandle(candidate.handle))
        throw new Error("Account handle is already in use.");
      await store.save(candidate);
      await profiles.save(
        defineAccountProfile({
          accountId: candidate.id,
          displayName: input.displayName,
          bio: "",
        }),
      );
      if (candidate.kind === "organization")
        await memberships.save(
          activateMembership({
            id: nextMembershipId(),
            accountId: candidate.id,
            principalId: input.principal.principalId,
            role: "owner",
            joinedAt: clock().toISOString(),
          }),
        );
      return toRef(candidate);
    },
  };
}
