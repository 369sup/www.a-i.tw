import { InvalidUserAccountHandleError } from "../errors/invalid-user-account-handle-error";

declare const userAccountHandleBrand: unique symbol;

export type UserAccountHandle = string & {
  readonly [userAccountHandleBrand]: "UserAccountHandle";
};

const userAccountHandlePattern = /^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/;

export function createUserAccountHandle(value: string): UserAccountHandle {
  const handle = value.trim().toLowerCase();
  if (!userAccountHandlePattern.test(handle)) {
    throw new InvalidUserAccountHandleError();
  }
  return handle as UserAccountHandle;
}
