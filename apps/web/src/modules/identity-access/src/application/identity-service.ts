import type {
  AuthenticatedPrincipalV1,
  LoginSessionV1,
  PrincipalRefV1,
} from "../contracts/public";
import { assertCanAuthenticate, type Principal } from "../domain/principal";

export interface PrincipalStore {
  list(): Promise<Principal[]>;
  find(principalId: string): Promise<Principal | undefined>;
}

export interface SessionStore {
  find(token: string): Promise<AuthenticatedPrincipalV1 | undefined>;
  save(token: string, session: AuthenticatedPrincipalV1): Promise<void>;
  clear(token: string): Promise<void>;
}

export interface CredentialVerifier {
  verify(login: string, password: string): Promise<string | undefined>;
}

export interface IdentityAccessService {
  listPrincipals(): Promise<PrincipalRefV1[]>;
  login(login: string, password: string): Promise<LoginSessionV1>;
  currentPrincipal(
    token: string,
  ): Promise<AuthenticatedPrincipalV1 | undefined>;
  revokeSession(token: string): Promise<void>;
}

export function createIdentityAccessService(
  principals: PrincipalStore,
  credentials: CredentialVerifier,
  sessions: SessionStore,
  nextToken: () => string,
  now: () => Date,
): IdentityAccessService {
  return {
    async listPrincipals() {
      return (await principals.list()).map(toRef);
    },
    currentPrincipal: (token) => sessions.find(token),
    async login(login, password) {
      const principalId = await credentials.verify(login, password);
      if (!principalId) throw new Error("Invalid login or password.");
      const principal = await principals.find(principalId);
      if (!principal) throw new Error("Invalid login or password.");
      assertCanAuthenticate(principal);
      const authentication = {
        principal: toRef(principal),
        authenticatedAt: now().toISOString(),
      };
      const token = nextToken();
      await sessions.save(token, authentication);
      return { token, authentication };
    },
    revokeSession: (token) => sessions.clear(token),
  };
}

function toRef(principal: Principal): PrincipalRefV1 {
  return {
    principalId: principal.id,
    handle: principal.handle,
    displayName: principal.displayName,
    status: principal.status,
  };
}
