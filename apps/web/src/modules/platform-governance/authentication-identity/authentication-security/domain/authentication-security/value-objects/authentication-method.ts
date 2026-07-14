import { InvalidAuthenticationMethodError } from "../errors/invalid-authentication-method.error";

export type AuthenticationMethod = "password";

export function createAuthenticationMethod(
  input: string,
): AuthenticationMethod {
  if (input !== "password") throw new InvalidAuthenticationMethodError();
  return input;
}
