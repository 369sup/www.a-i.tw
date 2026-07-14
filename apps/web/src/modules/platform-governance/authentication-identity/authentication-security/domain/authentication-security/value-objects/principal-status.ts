import { InvalidPrincipalStatusError } from "../errors/invalid-principal-status.error";

export type PrincipalStatus = "active" | "disabled";

export function createPrincipalStatus(input: string): PrincipalStatus {
  if (input !== "active" && input !== "disabled")
    throw new InvalidPrincipalStatusError();
  return input;
}
