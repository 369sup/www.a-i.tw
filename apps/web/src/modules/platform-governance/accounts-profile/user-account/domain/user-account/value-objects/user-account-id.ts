import { InvalidUserAccountIdError } from "../errors/invalid-user-account-id-error";

declare const userAccountIdBrand: unique symbol;

export type UserAccountId = string & {
  readonly [userAccountIdBrand]: "UserAccountId";
};

export function createUserAccountId(value: string): UserAccountId {
  const id = value.trim();
  if (!id) throw new InvalidUserAccountIdError();
  return id as UserAccountId;
}
