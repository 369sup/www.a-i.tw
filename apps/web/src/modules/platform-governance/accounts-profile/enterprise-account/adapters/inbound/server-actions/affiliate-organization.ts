export type AffiliateOrganizationFormInput = {
  enterpriseId: string;
  organizationAccountId: string;
};

function requiredValue(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${name} is required.`);
  }
  return value.trim();
}

export function mapAffiliateOrganizationForm(
  formData: FormData,
): AffiliateOrganizationFormInput {
  return {
    enterpriseId: requiredValue(formData, "enterpriseId"),
    organizationAccountId: requiredValue(formData, "organizationAccountId"),
  };
}
