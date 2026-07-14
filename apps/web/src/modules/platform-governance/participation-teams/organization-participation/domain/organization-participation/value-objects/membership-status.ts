export const MEMBERSHIP_STATUSES = ["active", "removed"] as const;

export type MembershipStatus = (typeof MEMBERSHIP_STATUSES)[number];
