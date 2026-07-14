export type UpdateRepositoryPolicyFormInput = {
  enterpriseId: string;
  policy: {
    publicRepositoryCreation: "allowed" | "forbidden";
    publicVisibilityChange: "allowed" | "forbidden";
  };
};

function requiredValue(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${name} is required.`);
  }
  return value.trim();
}

export function mapUpdateRepositoryPolicyForm(
  formData: FormData,
): UpdateRepositoryPolicyFormInput {
  return {
    enterpriseId: requiredValue(formData, "enterpriseId"),
    policy: {
      publicRepositoryCreation:
        requiredValue(formData, "publicRepositoryCreation") === "forbidden"
          ? "forbidden"
          : "allowed",
      publicVisibilityChange:
        requiredValue(formData, "publicVisibilityChange") === "forbidden"
          ? "forbidden"
          : "allowed",
    },
  };
}
