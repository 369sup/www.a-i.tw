import type {
  AuthenticatedPrincipalV1,
  PrincipalRefV1,
} from "../contracts/public";
import { assertCanAuthenticate, type Principal } from "../domain/principal";

export interface PrincipalStore {
  list(): Promise<Principal[]>;
  find(principalId: string): Promise<Principal | undefined>;
}

export interface SessionStore {
  current(): Promise<AuthenticatedPrincipalV1 | undefined>;
  save(session: AuthenticatedPrincipalV1): Promise<void>;
  clear(): Promise<void>;
}

export interface IdentityAccessService {
  listPrincipals(): Promise<PrincipalRefV1[]>;
  currentPrincipal(): Promise<AuthenticatedPrincipalV1 | undefined>;
  authenticate(principalId: string): Promise<AuthenticatedPrincipalV1>;
  revokeSession(): Promise<void>;
}

export function createIdentityAccessService(
  principals: PrincipalStore,
  sessions: SessionStore,
  now: () => Date,
): IdentityAccessService {
  return {
    async listPrincipals() {
      return (await principals.list()).map(toRef);
    },
    currentPrincipal: () => sessions.current(),
    async authenticate(principalId) {
      const principal = await principals.find(principalId);
      if (!principal) throw new Error("Principal not found.");
      assertCanAuthenticate(principal);
      const session = {
        principal: toRef(principal),
        authenticatedAt: now().toISOString(),
      };
      await sessions.save(session);
      return session;
    },
    revokeSession: () => sessions.clear(),
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
