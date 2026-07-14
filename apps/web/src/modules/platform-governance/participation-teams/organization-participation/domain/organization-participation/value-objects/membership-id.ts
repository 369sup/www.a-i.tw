import { InvalidMembershipIdError } from "../errors/invalid-membership-id.error";

declare const membershipIdBrand: unique symbol;

export type MembershipId = string & {
  readonly [membershipIdBrand]: "MembershipId";
};

export function createMembershipId(input: string): MembershipId {
  const value = input.trim();
  if (!value) throw new InvalidMembershipIdError("Membership ID is required.");
  return value as MembershipId;
}
