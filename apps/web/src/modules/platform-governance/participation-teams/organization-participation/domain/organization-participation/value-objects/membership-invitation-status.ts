export const MEMBERSHIP_INVITATION_STATUSES = [
  "pending",
  "accepted",
  "expired",
  "cancelled",
] as const;

export type MembershipInvitationStatus =
  (typeof MEMBERSHIP_INVITATION_STATUSES)[number];
