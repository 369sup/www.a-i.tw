import { InvalidSessionExpiryError } from "../errors/invalid-session-expiry-error";

declare const sessionExpiryBrand: unique symbol;

export const SESSION_TTL_MS = 8 * 60 * 60 * 1_000;

export type SessionExpiry = string & {
  readonly [sessionExpiryBrand]: "SessionExpiry";
};

export function createSessionExpiry(authenticatedAt: string): SessionExpiry {
  const issuedAt = Date.parse(authenticatedAt);
  if (!Number.isFinite(issuedAt))
    throw new InvalidSessionExpiryError(
      "Session authentication time must be a valid timestamp.",
    );
  return new Date(issuedAt + SESSION_TTL_MS).toISOString() as SessionExpiry;
}

export function hasSessionExpired(
  expiresAt: SessionExpiry,
  observedAt: string,
): boolean {
  const observation = Date.parse(observedAt);
  if (!Number.isFinite(observation))
    throw new InvalidSessionExpiryError(
      "Session observation time must be a valid timestamp.",
    );
  return observation >= Date.parse(expiresAt);
}
