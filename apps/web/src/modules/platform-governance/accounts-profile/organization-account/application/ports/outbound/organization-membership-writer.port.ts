export interface OrganizationMembershipWriter {
  save(
    membership: Readonly<{
      id: string;
      accountId: string;
      principalId: string;
      role: "owner";
      status: "active";
      joinedAt: string;
    }>,
  ): Promise<void>;
}
