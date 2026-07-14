import { InvalidPrincipalIdError } from "../errors/invalid-principal-id.error";

declare const principalIdBrand: unique symbol;

export type PrincipalId = string & {
  readonly [principalIdBrand]: "PrincipalId";
};

export function createPrincipalId(input: string): PrincipalId {
  const value = input.trim();
  if (!value) throw new InvalidPrincipalIdError();
  return value as PrincipalId;
}
