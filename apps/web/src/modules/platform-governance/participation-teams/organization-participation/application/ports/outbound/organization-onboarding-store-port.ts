export type OrganizationOnboardingState = Readonly<{
  onboardingKey: string;
  principalId: string;
  handle: string;
  displayName: string;
  membershipId: string;
  accountId?: string;
  status: "pending-account" | "pending-owner" | "failed" | "completed";
  lastFailure?: string;
}>;

export interface OrganizationOnboardingStore {
  find(onboardingKey: string): Promise<OrganizationOnboardingState | undefined>;
  save(state: OrganizationOnboardingState): Promise<void>;
}
