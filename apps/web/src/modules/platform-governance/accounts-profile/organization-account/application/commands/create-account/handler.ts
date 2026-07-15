import type { OrganizationRefV1 } from "../../../contracts/v1/public";
import { createOrganization } from "../../../domain/organization-account/aggregates/account";
import type { CreateAccountUseCase } from "../../ports/inbound/create-account-use-case";
import type { ProfileDirectory } from "../../ports/outbound/profile-directory-port";
import type { AccountStore } from "../../ports/outbound/account-store-port";
import type { OrganizationMembershipWriter } from "../../ports/outbound/organization-membership-writer-port";
import type { CreateAccountCommand } from "./command";

export function createCreateAccountHandler(
  store: AccountStore,
  profiles: ProfileDirectory,
  memberships: OrganizationMembershipWriter,
  nextAccountId: () => string,
  nextMembershipId: () => string,
  clock: () => Date,
): CreateAccountUseCase {
  return {
    async execute(command: CreateAccountCommand): Promise<OrganizationRefV1> {
      if (command.principal.status !== "active")
        throw new Error("An active principal is required.");

      const id = nextAccountId();
      const candidate = createOrganization({ id, handle: command.handle });

      if (await store.findByHandle(candidate.handle))
        throw new Error("Account handle is already in use.");

      await store.save(candidate);
      await profiles.save({
        accountId: candidate.id,
        displayName: command.displayName,
        bio: "",
      });

      await memberships.save({
        id: nextMembershipId(),
        accountId: candidate.id,
        principalId: command.principal.principalId,
        role: "owner",
        status: "active",
        joinedAt: clock().toISOString(),
      });

      return {
        accountId: candidate.id,
        handle: candidate.handle,
        displayName: command.displayName.trim(),
        kind: candidate.kind,
        status: candidate.status,
      };
    },
  };
}
