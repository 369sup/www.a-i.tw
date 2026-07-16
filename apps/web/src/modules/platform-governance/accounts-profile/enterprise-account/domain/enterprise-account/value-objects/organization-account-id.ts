import { InvalidEnterpriseAffiliationError } from "../errors/invalid-enterprise-affiliation-error";

declare const organizationAccountIdBrand: unique symbol;
export type OrganizationAccountId = string & {
  readonly [organizationAccountIdBrand]: true;
};

export function createOrganizationAccountId(
  input: string,
): OrganizationAccountId {
  const value = input.trim();
  if (!value) {
    throw new InvalidEnterpriseAffiliationError(
      "Organization Account identity is required.",
    );
  }
  return value as OrganizationAccountId;
}
