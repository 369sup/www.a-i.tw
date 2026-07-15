import { InvalidAuthenticationAssuranceError } from "../errors/invalid-authentication-assurance-error";

export type AuthenticationAssurance = "mock" | "single-factor" | "multi-factor";

export function createAuthenticationAssurance(
  input: string,
): AuthenticationAssurance {
  if (input !== "mock" && input !== "single-factor" && input !== "multi-factor")
    throw new InvalidAuthenticationAssuranceError();
  return input;
}
