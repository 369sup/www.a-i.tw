export const accountStatuses = ["active", "suspended"] as const;

export type AccountStatus = (typeof accountStatuses)[number];

export function isActiveAccountStatus(status: AccountStatus): boolean {
  return status === "active";
}
