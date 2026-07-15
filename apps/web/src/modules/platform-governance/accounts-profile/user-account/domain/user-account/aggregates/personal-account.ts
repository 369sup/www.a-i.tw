import {
  createPrincipalReference,
  type PrincipalReference,
} from "../value-objects/principal-reference";
import {
  createUserAccountHandle,
  type UserAccountHandle,
} from "../value-objects/user-account-handle";
import {
  createUserAccountId,
  type UserAccountId,
} from "../value-objects/user-account-id";

export type PersonalAccount = Readonly<{
  id: UserAccountId;
  handle: UserAccountHandle;
  principalId: PrincipalReference;
  status: "provisioning" | "active" | "suspended";
}>;

export function createPersonalAccount(input: {
  id: string;
  handle: string;
  principalId: string;
}): PersonalAccount {
  return {
    id: createUserAccountId(input.id),
    handle: createUserAccountHandle(input.handle),
    principalId: createPrincipalReference(input.principalId),
    status: "provisioning",
  };
}

export function resumePersonalAccountProvisioning(
  account: PersonalAccount,
  input: { handle: string },
): PersonalAccount {
  if (
    account.status !== "provisioning" ||
    account.handle !== createUserAccountHandle(input.handle)
  ) {
    throw new PersonalAccountProvisioningConflictError();
  }
  return account;
}

export function activatePersonalAccount(
  account: PersonalAccount,
): PersonalAccount {
  if (account.status !== "provisioning") {
    throw new InvalidPersonalAccountTransitionError(account.status, "active");
  }
  return { ...account, status: "active" };
}
import { InvalidPersonalAccountTransitionError } from "../errors/invalid-personal-account-transition-error";
import { PersonalAccountProvisioningConflictError } from "../errors/personal-account-provisioning-conflict-error";
