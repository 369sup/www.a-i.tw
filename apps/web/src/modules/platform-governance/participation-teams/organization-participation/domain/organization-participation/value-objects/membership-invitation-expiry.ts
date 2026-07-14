import { InvalidMembershipInvitationExpiryError } from "../errors/invalid-membership-invitation-expiry.error";

declare const membershipInvitationExpiryBrand: unique symbol;

export const MEMBERSHIP_INVITATION_TTL_MS = 7 * 86_400_000;

export type MembershipInvitationExpiry = string & {
  readonly [membershipInvitationExpiryBrand]: "MembershipInvitationExpiry";
};

export function createMembershipInvitationExpiry(
  invitedAt: string,
): MembershipInvitationExpiry {
  const issuedAt = Date.parse(invitedAt);
  if (!Number.isFinite(issuedAt))
    throw new InvalidMembershipInvitationExpiryError(
      "Membership invitation issue time must be a valid timestamp.",
    );
  return new Date(
    issuedAt + MEMBERSHIP_INVITATION_TTL_MS,
  ).toISOString() as MembershipInvitationExpiry;
}

export function hasMembershipInvitationExpired(
  expiresAt: MembershipInvitationExpiry,
  observedAt: string,
): boolean {
  const observation = Date.parse(observedAt);
  if (!Number.isFinite(observation))
    throw new InvalidMembershipInvitationExpiryError(
      "Membership invitation observation time must be a valid timestamp.",
    );
  return observation >= Date.parse(expiresAt);
}
