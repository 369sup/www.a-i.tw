import type { Principal } from "../../../domain/authentication-security/entities/principal";

export interface PrincipalStore {
  list(): Promise<Principal[]>;
  find(principalId: string): Promise<Principal | undefined>;
}
