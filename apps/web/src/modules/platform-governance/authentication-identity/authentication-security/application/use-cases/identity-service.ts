import type {
  AuthenticatedPrincipalV1,
  PrincipalRefV1,
} from "../../contracts/v1/public";
import {
  assertCanAuthenticate,
  type Principal,
} from "../../domain/authentication-security/entities/principal";
import {
  createSession,
  expireSession,
  revokeSession,
  type Session,
} from "../../domain/authentication-security/entities/session";
import { hasSessionExpired } from "../../domain/authentication-security/value-objects/session-expiry";
import type { CredentialVerifier } from "../ports/outbound/credential-verifier.port";
import type { PrincipalStore } from "../ports/outbound/principal-store.port";
import type { SessionStore } from "../ports/outbound/session-store.port";

export type BrowserSessionResult = Readonly<{
  token: string;
  expiresAt: string;
  authentication: AuthenticatedPrincipalV1;
}>;

export interface IdentityAccessService {
  listPrincipals(): Promise<PrincipalRefV1[]>;
  principal(principalId: string): Promise<PrincipalRefV1 | undefined>;
  login(login: string, password: string): Promise<BrowserSessionResult>;
  currentPrincipal(
    token: string,
  ): Promise<AuthenticatedPrincipalV1 | undefined>;
  revokeSession(token: string): Promise<void>;
}

export function createIdentityAccessService(
  principals: PrincipalStore,
  credentials: CredentialVerifier,
  sessions: SessionStore,
  nextSessionId: () => string,
  nextToken: () => string,
  now: () => Date,
): IdentityAccessService {
  return {
    async listPrincipals() {
      return (await principals.list()).map(toRef);
    },
    async principal(principalId) {
      const principal = await principals.find(principalId);
      return principal && toRef(principal);
    },
    async currentPrincipal(token) {
      const session = await sessions.find(token);
      if (!session || session.status !== "active") return undefined;
      const observedAt = now().toISOString();
      if (hasSessionExpired(session.expiresAt, observedAt)) {
        await sessions.save(token, expireSession(session, observedAt));
        return undefined;
      }
      const principal = await principals.find(session.principalId);
      if (!principal || principal.status !== "active") return undefined;
      return toAuthentication(session, principal);
    },
    async login(login, password) {
      const verification = await credentials.verify(login, password);
      if (!verification) throw new Error("Invalid login or password.");
      const principal = await principals.find(verification.principalId);
      if (!principal) throw new Error("Invalid login or password.");
      assertCanAuthenticate(principal);
      const authenticatedAt = now().toISOString();
      const session = createSession({
        id: nextSessionId(),
        principalId: principal.id,
        method: verification.method,
        assurance: verification.assurance,
        authenticatedAt,
      });
      const token = nextToken().trim();
      if (!token) throw new Error("Browser Session token is required.");
      await sessions.save(token, session);
      return {
        token,
        expiresAt: session.expiresAt,
        authentication: toAuthentication(session, principal),
      };
    },
    async revokeSession(token) {
      const session = await sessions.find(token);
      if (!session || session.status !== "active") return;
      const observedAt = now().toISOString();
      await sessions.save(
        token,
        hasSessionExpired(session.expiresAt, observedAt)
          ? expireSession(session, observedAt)
          : revokeSession(session, observedAt),
      );
    },
  };
}

function toRef(principal: Principal): PrincipalRefV1 {
  return {
    principalId: principal.id,
    status: principal.status,
  };
}

function toAuthentication(
  session: Session,
  principal: Principal,
): AuthenticatedPrincipalV1 {
  return {
    principalId: principal.id,
    status: principal.status,
    assurance: session.assurance,
    authenticatedAt: session.authenticatedAt,
  };
}
