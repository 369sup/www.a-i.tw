import type { AuthenticationAssurance } from "../../../domain/authentication-security/value-objects/authentication-assurance";
import type { AuthenticationMethod } from "../../../domain/authentication-security/value-objects/authentication-method";

export type CredentialVerification = Readonly<{
  principalId: string;
  method: AuthenticationMethod;
  assurance: AuthenticationAssurance;
}>;

export interface CredentialVerifier {
  verify(
    login: string,
    password: string,
  ): Promise<CredentialVerification | undefined>;
}
