import { InvalidMembershipInvitationIdError } from "../errors/invalid-membership-invitation-id.error";

declare const membershipInvitationIdBrand: unique symbol;

export type MembershipInvitationId = string & {
  readonly [membershipInvitationIdBrand]: "MembershipInvitationId";
};

export function createMembershipInvitationId(
  input: string,
): MembershipInvitationId {
  const value = input.trim();
  if (!value)
    throw new InvalidMembershipInvitationIdError(
      "Membership invitation ID is required.",
    );
  return value as MembershipInvitationId;
}
