import type { OrganizationRefV1 } from "../../../contracts/v1/public";
import {
  activateOrganizationAccount,
  createOrganizationAccount,
  resumeOrganizationAccountProvisioning,
} from "../../../domain/organization-account/aggregates/organization-account";
import type { CreateAccountUseCase } from "../../ports/inbound/create-account-use-case";
import type { ProfileDirectory } from "../../ports/outbound/profile-directory-port";
import type { AccountStore } from "../../ports/outbound/account-store-port";
import type { CreateAccountCommand } from "./command";

export function createCreateAccountHandler(
  store: AccountStore,
  profiles: ProfileDirectory,
  nextAccountId: () => string,
): CreateAccountUseCase {
  return {
    async execute(command: CreateAccountCommand): Promise<OrganizationRefV1> {
      if (command.principal.status !== "active")
        throw new Error("An active principal is required.");

      const proposed = createOrganizationAccount({
        id: nextAccountId(),
        handle: command.handle,
      });
      const existing = await store.findByHandle(proposed.handle);
      if (existing && existing.status !== "provisioning") {
        throw new Error("Account handle is already in use.");
      }
      const account = existing
        ? resumeOrganizationAccountProvisioning(existing, command)
        : proposed;

      if (!existing) await store.save(account);
      await profiles.initialize({
        accountId: account.id,
        displayName: command.displayName,
        bio: "",
      });
      const activated = activateOrganizationAccount(account);
      await store.save(activated);

      return {
        accountId: activated.id,
        handle: activated.handle,
        kind: activated.kind,
        status: "active",
      };
    },
  };
}
