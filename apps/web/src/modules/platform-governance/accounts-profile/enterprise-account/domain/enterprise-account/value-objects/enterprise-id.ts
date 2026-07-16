import { InvalidEnterpriseIdError } from "../errors/invalid-enterprise-id-error";

declare const enterpriseIdBrand: unique symbol;
export type EnterpriseId = string & { readonly [enterpriseIdBrand]: true };

export function createEnterpriseId(input: string): EnterpriseId {
  const value = input.trim();
  if (!value) throw new InvalidEnterpriseIdError();
  return value as EnterpriseId;
}
