import { InvalidPrincipalReferenceError } from "../errors/invalid-principal-reference-error";

declare const principalReferenceBrand: unique symbol;

export type PrincipalReference = string & {
  readonly [principalReferenceBrand]: "PrincipalReference";
};

export function createPrincipalReference(value: string): PrincipalReference {
  const principalId = value.trim();
  if (!principalId) throw new InvalidPrincipalReferenceError();
  return principalId as PrincipalReference;
}
