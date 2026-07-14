export type OrganizationAccountId = string & {
  readonly __brand: "OrganizationAccountId";
};

export function createOrganizationAccountId(
  value: string,
): OrganizationAccountId {
  const id = value.trim();
  if (!id) throw new Error("Organization Account ID is required.");
  return id as OrganizationAccountId;
}
