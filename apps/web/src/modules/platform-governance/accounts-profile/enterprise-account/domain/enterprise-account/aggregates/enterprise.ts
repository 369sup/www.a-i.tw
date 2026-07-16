import { InvalidEnterpriseAffiliationError } from "../errors/invalid-enterprise-affiliation-error";
import {
  createEnterpriseId,
  type EnterpriseId,
} from "../value-objects/enterprise-id";
import {
  createEnterpriseName,
  type EnterpriseName,
} from "../value-objects/enterprise-name";
import {
  createOrganizationAccountId,
  type OrganizationAccountId,
} from "../value-objects/organization-account-id";

export type EnterpriseOrganizationAffiliation = Readonly<{
  organizationAccountId: OrganizationAccountId;
  affiliatedAt: string;
}>;

export type Enterprise = Readonly<{
  id: EnterpriseId;
  name: EnterpriseName;
  status: "active";
  organizationAffiliations: readonly EnterpriseOrganizationAffiliation[];
}>;

export function createEnterprise(input: {
  id: string;
  name: string;
}): Enterprise {
  return {
    id: createEnterpriseId(input.id),
    name: createEnterpriseName(input.name),
    status: "active",
    organizationAffiliations: [],
  };
}

export function rehydrateEnterprise(input: {
  id: string;
  name: string;
  status: "active";
  organizationAffiliations: readonly {
    organizationAccountId: string;
    affiliatedAt: string;
  }[];
}): Enterprise {
  return {
    id: createEnterpriseId(input.id),
    name: createEnterpriseName(input.name),
    status: input.status,
    organizationAffiliations: input.organizationAffiliations.map((item) => ({
      organizationAccountId: createOrganizationAccountId(
        item.organizationAccountId,
      ),
      affiliatedAt: validateAffiliatedAt(item.affiliatedAt),
    })),
  };
}

export function affiliateOrganization(
  enterprise: Enterprise,
  organizationAccountId: string,
  affiliatedAt: string,
): Enterprise {
  const organizationId = createOrganizationAccountId(organizationAccountId);
  const timestamp = validateAffiliatedAt(affiliatedAt);
  if (
    enterprise.organizationAffiliations.some(
      (item) => item.organizationAccountId === organizationId,
    )
  )
    return enterprise;
  return {
    ...enterprise,
    organizationAffiliations: [
      ...enterprise.organizationAffiliations,
      { organizationAccountId: organizationId, affiliatedAt: timestamp },
    ],
  };
}

function validateAffiliatedAt(input: string): string {
  if (!input || Number.isNaN(Date.parse(input))) {
    throw new InvalidEnterpriseAffiliationError(
      "A valid affiliation timestamp is required.",
    );
  }
  return input;
}
