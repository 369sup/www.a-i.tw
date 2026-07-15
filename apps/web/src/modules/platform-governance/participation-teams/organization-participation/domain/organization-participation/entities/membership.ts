import {
  createOrganizationAccountId,
  type OrganizationAccountId,
} from "../value-objects/organization-account-id";
import { InvalidMembershipTransitionError } from "../errors/invalid-membership-transition-error";
import {
  createMembershipId,
  type MembershipId,
} from "../value-objects/membership-id";
import {
  createMembershipInvitationExpiry,
  hasMembershipInvitationExpired,
  type MembershipInvitationExpiry,
} from "../value-objects/membership-invitation-expiry";
import {
  createMembershipInvitationId,
  type MembershipInvitationId,
} from "../value-objects/membership-invitation-id";
import type { MembershipInvitationStatus } from "../value-objects/membership-invitation-status";
import type { MembershipRole } from "../value-objects/membership-role";
import type { MembershipStatus } from "../value-objects/membership-status";

export type Membership = Readonly<{
  id: MembershipId;
  accountId: OrganizationAccountId;
  principalId: string;
  role: MembershipRole;
  status: MembershipStatus;
  joinedAt: string;
  removedAt?: string;
}>;

export type MembershipInvitation = Readonly<{
  id: MembershipInvitationId;
  accountId: OrganizationAccountId;
  invitedPrincipalId: string;
  invitedByPrincipalId: string;
  role: MembershipRole;
  status: MembershipInvitationStatus;
  invitedAt: string;
  expiresAt: MembershipInvitationExpiry;
  respondedAt?: string;
}>;

export type IssueMembershipInvitationInput = Readonly<{
  id: string;
  accountId: string;
  invitedPrincipalId: string;
  invitedByPrincipalId: string;
  role: MembershipRole;
  invitedAt: string;
}>;

export function issueMembershipInvitation(
  input: IssueMembershipInvitationInput,
): MembershipInvitation {
  if (input.invitedPrincipalId === input.invitedByPrincipalId)
    throw new InvalidMembershipTransitionError(
      "Organization owners are already members.",
    );
  requirePrincipalId(input.invitedPrincipalId);
  requirePrincipalId(input.invitedByPrincipalId);
  requireTimestamp(input.invitedAt, "Invitation issue time");
  return {
    ...input,
    id: createMembershipInvitationId(input.id),
    accountId: createOrganizationAccountId(input.accountId),
    expiresAt: createMembershipInvitationExpiry(input.invitedAt),
    status: "pending",
  };
}

export function acceptMembershipInvitation(
  invitation: MembershipInvitation,
  principalId: string,
  acceptedAt: string,
): MembershipInvitation {
  if (invitation.invitedPrincipalId !== principalId)
    throw new InvalidMembershipTransitionError(
      "Only the invited principal may accept this invitation.",
    );
  if (invitation.status !== "pending")
    throw new InvalidMembershipTransitionError(
      "Only a pending invitation may be accepted.",
    );
  if (hasMembershipInvitationExpired(invitation.expiresAt, acceptedAt))
    throw new InvalidMembershipTransitionError(
      "Membership invitation has expired.",
    );
  requireTimestamp(acceptedAt, "Invitation acceptance time");
  if (Date.parse(acceptedAt) < Date.parse(invitation.invitedAt))
    throw new InvalidMembershipTransitionError(
      "Invitation acceptance cannot precede its issue time.",
    );
  return { ...invitation, status: "accepted", respondedAt: acceptedAt };
}

export function expireMembershipInvitation(
  invitation: MembershipInvitation,
  expiredAt: string,
): MembershipInvitation {
  if (invitation.status !== "pending")
    throw new InvalidMembershipTransitionError(
      "Only a pending invitation may expire.",
    );
  if (!hasMembershipInvitationExpired(invitation.expiresAt, expiredAt))
    throw new InvalidMembershipTransitionError(
      "Membership invitation has not expired.",
    );
  return { ...invitation, status: "expired", respondedAt: expiredAt };
}

export function cancelMembershipInvitation(
  invitation: MembershipInvitation,
  cancelledAt: string,
): MembershipInvitation {
  if (invitation.status !== "pending")
    throw new InvalidMembershipTransitionError(
      "Only a pending invitation may be cancelled.",
    );
  requireTimestamp(cancelledAt, "Invitation cancellation time");
  if (Date.parse(cancelledAt) < Date.parse(invitation.invitedAt))
    throw new InvalidMembershipTransitionError(
      "Invitation cancellation cannot precede its issue time.",
    );
  if (hasMembershipInvitationExpired(invitation.expiresAt, cancelledAt))
    throw new InvalidMembershipTransitionError(
      "An expired invitation cannot be cancelled.",
    );
  return { ...invitation, status: "cancelled", respondedAt: cancelledAt };
}

export type ActivateMembershipInput = Readonly<{
  id: string;
  accountId: string;
  principalId: string;
  role: MembershipRole;
  joinedAt: string;
}>;

export function activateMembership(input: ActivateMembershipInput): Membership {
  requirePrincipalId(input.principalId);
  requireTimestamp(input.joinedAt, "Membership join time");
  return {
    ...input,
    id: createMembershipId(input.id),
    accountId: createOrganizationAccountId(input.accountId),
    status: "active",
  };
}

export function removeMembership(
  membership: Membership,
  removedAt: string,
): Membership {
  if (membership.status !== "active")
    throw new InvalidMembershipTransitionError(
      "Only an active membership may be removed.",
    );
  requireTimestamp(removedAt, "Membership removal time");
  if (Date.parse(removedAt) < Date.parse(membership.joinedAt))
    throw new InvalidMembershipTransitionError(
      "Membership removal cannot precede its join time.",
    );
  return { ...membership, status: "removed", removedAt };
}

function requirePrincipalId(principalId: string) {
  if (!principalId.trim())
    throw new InvalidMembershipTransitionError("Principal ID is required.");
}

function requireTimestamp(value: string, label: string) {
  if (!Number.isFinite(Date.parse(value)))
    throw new InvalidMembershipTransitionError(
      `${label} must be a valid timestamp.`,
    );
}
