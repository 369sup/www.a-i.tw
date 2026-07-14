export type EnterpriseOrganizationAffiliation = Readonly<{
  organizationAccountId: string;
  affiliatedAt: string;
}>;

export type Enterprise = Readonly<{
  id: string;
  name: string;
  status: "active";
  organizationAffiliations: readonly EnterpriseOrganizationAffiliation[];
}>;

export function createEnterprise(input: {
  id: string;
  name: string;
}): Enterprise {
  const name = input.name.trim();
  if (!name) throw new Error("Enterprise name is required.");
  return { id: input.id, name, status: "active", organizationAffiliations: [] };
}

export function affiliateOrganization(
  enterprise: Enterprise,
  organizationAccountId: string,
  affiliatedAt: string,
): Enterprise {
  if (!organizationAccountId)
    throw new Error("Organization Account identity is required.");
  if (
    enterprise.organizationAffiliations.some(
      (item) => item.organizationAccountId === organizationAccountId,
    )
  )
    return enterprise;
  return {
    ...enterprise,
    organizationAffiliations: [
      ...enterprise.organizationAffiliations,
      { organizationAccountId, affiliatedAt },
    ],
  };
}
