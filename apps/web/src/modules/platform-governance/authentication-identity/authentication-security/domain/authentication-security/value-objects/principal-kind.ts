import { InvalidPrincipalKindError } from "../errors/invalid-principal-kind-error";

export type PrincipalKind = "human" | "workload";

export function createPrincipalKind(input: string): PrincipalKind {
  if (input !== "human" && input !== "workload")
    throw new InvalidPrincipalKindError();
  return input;
}
