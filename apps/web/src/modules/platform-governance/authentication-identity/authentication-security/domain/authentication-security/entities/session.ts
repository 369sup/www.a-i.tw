import { InvalidSessionTransitionError } from "../errors/invalid-session-transition.error";
import {
  createAuthenticationAssurance,
  type AuthenticationAssurance,
} from "../value-objects/authentication-assurance";
import {
  createAuthenticationMethod,
  type AuthenticationMethod,
} from "../value-objects/authentication-method";
import {
  createPrincipalId,
  type PrincipalId,
} from "../value-objects/principal-id";
import {
  createSessionExpiry,
  hasSessionExpired,
  type SessionExpiry,
} from "../value-objects/session-expiry";
import { createSessionId, type SessionId } from "../value-objects/session-id";
import type { SessionStatus } from "../value-objects/session-status";

export type Session = Readonly<{
  id: SessionId;
  principalId: PrincipalId;
  method: AuthenticationMethod;
  assurance: AuthenticationAssurance;
  status: SessionStatus;
  authenticatedAt: string;
  expiresAt: SessionExpiry;
  endedAt?: string;
}>;

export function createSession(input: {
  id: string;
  principalId: string;
  method: string;
  assurance: string;
  authenticatedAt: string;
}): Session {
  const expiresAt = createSessionExpiry(input.authenticatedAt);
  return {
    id: createSessionId(input.id),
    principalId: createPrincipalId(input.principalId),
    method: createAuthenticationMethod(input.method),
    assurance: createAuthenticationAssurance(input.assurance),
    status: "active",
    authenticatedAt: new Date(input.authenticatedAt).toISOString(),
    expiresAt,
  };
}

export function expireSession(session: Session, observedAt: string): Session {
  if (session.status !== "active")
    throw new InvalidSessionTransitionError(
      "Only an active Session may expire.",
    );
  if (!hasSessionExpired(session.expiresAt, observedAt))
    throw new InvalidSessionTransitionError("Session has not expired.");
  return { ...session, status: "expired", endedAt: observedAt };
}

export function revokeSession(session: Session, revokedAt: string): Session {
  if (session.status !== "active")
    throw new InvalidSessionTransitionError(
      "Only an active Session may be revoked.",
    );
  if (hasSessionExpired(session.expiresAt, revokedAt))
    throw new InvalidSessionTransitionError(
      "An expired Session cannot be revoked.",
    );
  if (Date.parse(revokedAt) < Date.parse(session.authenticatedAt))
    throw new InvalidSessionTransitionError(
      "Session revocation cannot precede authentication.",
    );
  return { ...session, status: "revoked", endedAt: revokedAt };
}
