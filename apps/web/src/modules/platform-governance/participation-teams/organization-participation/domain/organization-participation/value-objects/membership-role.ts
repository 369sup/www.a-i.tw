export const MEMBERSHIP_ROLES = ["owner", "member"] as const;

export type MembershipRole = (typeof MEMBERSHIP_ROLES)[number];
