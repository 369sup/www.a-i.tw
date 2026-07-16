import { InvalidEnterpriseNameError } from "../errors/invalid-enterprise-name-error";

declare const enterpriseNameBrand: unique symbol;
export type EnterpriseName = string & { readonly [enterpriseNameBrand]: true };

export function createEnterpriseName(input: string): EnterpriseName {
  const value = input.trim();
  if (!value) throw new InvalidEnterpriseNameError();
  return value as EnterpriseName;
}
