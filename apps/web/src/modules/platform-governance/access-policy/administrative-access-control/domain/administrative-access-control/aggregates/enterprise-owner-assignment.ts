export type EnterpriseOwnerAssignment = Readonly<{
  enterpriseId: string;
  principalId: string;
  assignedAt: string;
}>;

export function assignEnterpriseOwner(input: EnterpriseOwnerAssignment) {
  if (!input.enterpriseId || !input.principalId)
    throw new Error("Enterprise and Principal identities are required.");
  return input;
}
