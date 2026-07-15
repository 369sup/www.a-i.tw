import { InvalidAccountIdError } from "../errors/invalid-account-id-error";

declare const accountIdBrand: unique symbol;

export type AccountId = string & { readonly [accountIdBrand]: true };

export function createAccountId(value: string): AccountId {
  const id = value.trim();
  if (!id) throw new InvalidAccountIdError();
  return id as AccountId;
}
