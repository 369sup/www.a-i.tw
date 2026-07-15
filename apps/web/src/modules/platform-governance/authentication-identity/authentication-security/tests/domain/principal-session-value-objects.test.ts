import { describe, expect, it } from "vitest";
import {
  assertCanAuthenticate,
  createPrincipal,
} from "../../domain/authentication-security/entities/principal";
import {
  createSession,
  expireSession,
  revokeSession,
} from "../../domain/authentication-security/entities/session";
import { InvalidPrincipalIdError } from "../../domain/authentication-security/errors/invalid-principal-id-error";
import { InvalidSessionIdError } from "../../domain/authentication-security/errors/invalid-session-id-error";
import { SESSION_TTL_MS } from "../../domain/authentication-security/value-objects/session-expiry";

const authenticatedAt = "2026-07-14T00:00:00.000Z";

describe("Principal and Session value objects", () => {
  it("constructs stable Principal identity and closed authentication state", () => {
    expect(
      createPrincipal({ id: " principal-1 ", kind: "human", status: "active" }),
    ).toEqual({ id: "principal-1", kind: "human", status: "active" });
    expect(() =>
      createPrincipal({ id: " ", kind: "human", status: "active" }),
    ).toThrow(InvalidPrincipalIdError);
    expect(() =>
      assertCanAuthenticate(
        createPrincipal({
          id: "principal-1",
          kind: "human",
          status: "disabled",
        }),
      ),
    ).toThrow("Disabled principals");
  });

  it("creates a distinct Session identity with the existing eight-hour expiry", () => {
    const session = createSession({
      id: "session-1",
      principalId: "principal-1",
      method: "password",
      assurance: "mock",
      authenticatedAt,
    });
    expect(session.id).toBe("session-1");
    expect(Date.parse(session.expiresAt)).toBe(
      Date.parse(authenticatedAt) + SESSION_TTL_MS,
    );
    expect(() =>
      createSession({
        id: " ",
        principalId: "principal-1",
        method: "password",
        assurance: "mock",
        authenticatedAt,
      }),
    ).toThrow(InvalidSessionIdError);
  });

  it("keeps revoked and expired Session states terminal", () => {
    const active = createSession({
      id: "session-1",
      principalId: "principal-1",
      method: "password",
      assurance: "mock",
      authenticatedAt,
    });
    const revoked = revokeSession(active, "2026-07-14T01:00:00.000Z");
    expect(revoked.status).toBe("revoked");
    expect(() => revokeSession(revoked, "2026-07-14T02:00:00.000Z")).toThrow(
      "Only an active Session",
    );
    const expired = expireSession(active, "2026-07-14T08:00:00.000Z");
    expect(expired.status).toBe("expired");
    expect(() => revokeSession(expired, "2026-07-14T09:00:00.000Z")).toThrow(
      "Only an active Session",
    );
  });
});
