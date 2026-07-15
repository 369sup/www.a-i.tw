import type { PersonalAccountRefV1 } from "../../contracts/v1/public";
import {
  activatePersonalAccount,
  createPersonalAccount,
  resumePersonalAccountProvisioning,
} from "../../domain/user-account/aggregates/personal-account";
import { createPrincipalReference } from "../../domain/user-account/value-objects/principal-reference";
import type { ProfileDirectory } from "../ports/outbound/profile-directory-port";
import type { UserAccountStore } from "../ports/outbound/user-account-store-port";

export function createUserAccountService(
  store: UserAccountStore,
  profiles: ProfileDirectory,
  nextId: () => string,
) {
  const toRef = async (
    accountId: string,
  ): Promise<PersonalAccountRefV1 | undefined> => {
    const account = await store.findAccount(accountId);
    if (!account || account.status === "provisioning") return undefined;
    const profile = await profiles.resolve(accountId);
    return profile
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
      const account = await store.findByPrincipal(
        createPrincipalReference(principalId),
      );
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
      const principalId = createPrincipalReference(input.principalId);
      const existing = await store.findByPrincipal(principalId);
      if (existing && existing.status !== "provisioning") {
        throw new Error("Principal already has a Personal Account.");
      }
      const account = existing
        ? resumePersonalAccountProvisioning(existing, {
            handle: input.handle,
          })
        : createPersonalAccount({
            id: nextId(),
            handle: input.handle,
            principalId,
          });
      const profile = {
        accountId: account.id,
        displayName: input.displayName,
        bio: "",
      };
      if (!existing) await store.saveAccount(account);
      await profiles.save(profile);
      const activated = activatePersonalAccount(account);
      await store.saveAccount(activated);
      return (await toRef(activated.id))!;
    },
    async profile(accountId: string) {
      return profiles.resolve(accountId);
    },
  };
}
