import type { PersonalAccountRefV1 } from "../../contracts/v1/public";
import { createPersonalAccount } from "../../domain/user-account/aggregates/personal-account";
import type { ProfileDirectory } from "../ports/outbound/profile-directory.port";
import type { UserAccountStore } from "../ports/outbound/user-account-store.port";

export function createUserAccountService(
  store: UserAccountStore,
  profiles: ProfileDirectory,
  nextId: () => string,
) {
  const toRef = async (
    accountId: string,
  ): Promise<PersonalAccountRefV1 | undefined> => {
    const account = await store.findAccount(accountId);
    const profile = account && (await profiles.resolve(accountId));
    return account && profile
      ? {
          accountId: account.id,
          handle: account.handle,
          displayName: profile.displayName,
          kind: "personal",
          status: account.status,
          personalPrincipalId: account.principalId,
        }
      : undefined;
  };
  return {
    async listAccounts() {
      return (
        await Promise.all(
          (await store.listAccounts()).map((account) => toRef(account.id)),
        )
      ).filter((account): account is PersonalAccountRefV1 => Boolean(account));
    },
    resolve: toRef,
    async resolveByPrincipal(principalId: string) {
      const account = await store.findByPrincipal(principalId);
      return account ? toRef(account.id) : undefined;
    },
    async eligibility(accountId: string) {
      const account = await toRef(accountId);
      return (
        account && { account, canOwnRepository: account.status === "active" }
      );
    },
    async create(input: {
      principalId: string;
      handle: string;
      displayName: string;
    }) {
      if (await store.findByPrincipal(input.principalId))
        throw new Error("Principal already has a Personal Account.");
      const account = createPersonalAccount({
        id: nextId(),
        handle: input.handle,
        principalId: input.principalId,
      });
      const profile = {
        accountId: account.id,
        displayName: input.displayName,
        bio: "",
      };
      await store.saveAccount(account);
      await profiles.save(profile);
      return (await toRef(account.id))!;
    },
    async profile(accountId: string) {
      return profiles.resolve(accountId);
    },
  };
}
