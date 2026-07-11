export type Membership = Readonly<{
  id: string;
  accountId: string;
  principalId: string;
  status: "active" | "removed";
  joinedAt: string;
  removedAt?: string;
}>;

export type MembershipInvitation = Readonly<{
  id: string;
  accountId: string;
  invitedPrincipalId: string;
  invitedByPrincipalId: string;
  status: "pending" | "accepted";
  invitedAt: string;
  expiresAt: string;
  respondedAt?: string;
}>;

export function issueMembershipInvitation(
  input: Omit<MembershipInvitation, "status">,
): MembershipInvitation {
  if (input.invitedPrincipalId === input.invitedByPrincipalId)
    throw new Error("Organization owners are already members.");
  if (new Date(input.expiresAt) <= new Date(input.invitedAt))
    throw new Error("Invitation expiry must follow its issue time.");
  return { ...input, status: "pending" };
}

export function acceptMembershipInvitation(
  invitation: MembershipInvitation,
  principalId: string,
  acceptedAt: string,
): MembershipInvitation {
  if (invitation.invitedPrincipalId !== principalId)
    throw new Error("Only the invited principal may accept this invitation.");
  if (invitation.status !== "pending")
    throw new Error("Only a pending invitation may be accepted.");
  if (new Date(acceptedAt) >= new Date(invitation.expiresAt))
    throw new Error("Membership invitation has expired.");
  return { ...invitation, status: "accepted", respondedAt: acceptedAt };
}

export function activateMembership(
  input: Omit<Membership, "status">,
): Membership {
  return { ...input, status: "active" };
}

export function removeMembership(
  membership: Membership,
  removedAt: string,
): Membership {
  if (membership.status !== "active")
    throw new Error("Only an active membership may be removed.");
  return { ...membership, status: "removed", removedAt };
}
