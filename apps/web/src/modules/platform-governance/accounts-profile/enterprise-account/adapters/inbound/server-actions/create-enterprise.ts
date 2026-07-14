export type CreateEnterpriseFormInput = {
  name: string;
};

function requiredValue(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${name} is required.`);
  }
  return value.trim();
}

export function mapCreateEnterpriseForm(
  formData: FormData,
): CreateEnterpriseFormInput {
  return { name: requiredValue(formData, "name") };
}
