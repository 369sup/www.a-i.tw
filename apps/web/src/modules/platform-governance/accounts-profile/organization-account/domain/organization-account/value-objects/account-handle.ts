import { InvalidAccountHandleError } from "../errors/invalid-account-handle-error";

declare const accountHandleBrand: unique symbol;

export type AccountHandle = string & {
  readonly [accountHandleBrand]: true;
};

const accountHandlePattern = /^(?=.{1,39}$)[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function createAccountHandle(value: string): AccountHandle {
  const handle = value.trim().toLowerCase();
  if (!accountHandlePattern.test(handle)) throw new InvalidAccountHandleError();
  return handle as AccountHandle;
}
