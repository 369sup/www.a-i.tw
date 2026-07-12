export type RepositoryVisibilityPolicy = Readonly<{
  publicRepositoryCreation: "allowed" | "forbidden";
  publicVisibilityChange: "allowed" | "forbidden";
}>;

export type EnterpriseOrganizationAffiliation = Readonly<{
  organizationAccountId: string;
  affiliatedAt: string;
}>;

export type Enterprise = Readonly<{
  id: string;
  name: string;
  status: "active";
  ownerPrincipalIds: readonly string[];
  organizationAffiliations: readonly EnterpriseOrganizationAffiliation[];
  repositoryVisibilityPolicy: RepositoryVisibilityPolicy;
}>;

export function createEnterprise(input: {
  id: string;
  name: string;
  foundingOwnerPrincipalId: string;
}): Enterprise {
  const name = input.name.trim();
  if (!name) throw new Error("Enterprise name is required.");
  if (!input.foundingOwnerPrincipalId)
    throw new Error("Enterprise founding owner is required.");
  return {
    id: input.id,
    name,
    status: "active",
    ownerPrincipalIds: [input.foundingOwnerPrincipalId],
    organizationAffiliations: [],
    repositoryVisibilityPolicy: {
      publicRepositoryCreation: "allowed",
      publicVisibilityChange: "allowed",
    },
  };
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

export function setRepositoryVisibilityPolicy(
  enterprise: Enterprise,
  policy: RepositoryVisibilityPolicy,
): Enterprise {
  return { ...enterprise, repositoryVisibilityPolicy: policy };
}

export function requireEnterpriseOwner(
  enterprise: Enterprise,
  principalId: string,
) {
  if (!enterprise.ownerPrincipalIds.includes(principalId))
    throw new Error("Enterprise owner authorization denied.");
}
