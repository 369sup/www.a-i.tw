import { InvalidOrganizationAccountTransitionError } from "../errors/invalid-organization-account-transition-error";
import {
  createAccountHandle,
  type AccountHandle,
} from "../value-objects/account-handle";
import { createAccountId, type AccountId } from "../value-objects/account-id";

export type OrganizationAccount = Readonly<{
  id: AccountId;
  handle: AccountHandle;
  kind: "organization";
  status: "provisioning" | "active" | "suspended";
}>;

export function createOrganizationAccount(input: {
  id: string;
  handle: string;
}): OrganizationAccount {
  return {
    id: createAccountId(input.id),
    handle: createAccountHandle(input.handle),
    kind: "organization",
    status: "provisioning",
  };
}

export function resumeOrganizationAccountProvisioning(
  account: OrganizationAccount,
  input: { handle: string },
): OrganizationAccount {
  if (account.status !== "provisioning") {
    throw new InvalidOrganizationAccountTransitionError(
      "Only a provisioning Organization Account can be resumed.",
    );
  }
  if (account.handle !== createAccountHandle(input.handle)) {
    throw new InvalidOrganizationAccountTransitionError(
      "A provisioning Organization Account cannot change its handle.",
    );
  }
  return account;
}

export function activateOrganizationAccount(
  account: OrganizationAccount,
): OrganizationAccount {
  if (account.status !== "provisioning") {
    throw new InvalidOrganizationAccountTransitionError(
      "Only a provisioning Organization Account can be activated.",
    );
  }
  return { ...account, status: "active" };
}

export function rehydrateOrganizationAccount(input: {
  id: string;
  handle: string;
  status: "provisioning" | "active" | "suspended";
}): OrganizationAccount {
  return {
    id: createAccountId(input.id),
    handle: createAccountHandle(input.handle),
    kind: "organization",
    status: input.status,
  };
}
