import {
  createAccountHandle,
  type AccountHandle,
} from "../value-objects/account-handle";
import { createAccountId, type AccountId } from "../value-objects/account-id";
import type { AccountStatus } from "../value-objects/account-status";

export type { AccountKind } from "../value-objects/account-kind";
export type { AccountStatus } from "../value-objects/account-status";

type AccountBase = Readonly<{
  id: AccountId;
  handle: AccountHandle;
  status: AccountStatus;
}>;

export type Organization = AccountBase &
  Readonly<{
    kind: "organization";
  }>;

export type Account = Organization;

export function createOrganization(input: {
  id: string;
  handle: string;
}): Organization {
  return {
    id: createAccountId(input.id),
    handle: createAccountHandle(input.handle),
    kind: "organization",
    status: "active",
  };
}
