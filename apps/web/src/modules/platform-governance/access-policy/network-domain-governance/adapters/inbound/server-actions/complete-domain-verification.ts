import type { NetworkDomainGovernance } from "../../../application/ports/inbound/network-domain-governance";

export async function completeDomainVerificationFromForm(
  governance: NetworkDomainGovernance,
  actorPrincipalId: string,
  formData: FormData,
) {
  return governance.complete({
    enterpriseId: requiredValue(formData, "enterpriseId"),
    verificationId: requiredValue(formData, "verificationId"),
    actorPrincipalId,
  });
}

function requiredValue(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${name} is required.`);
  }
  return value.trim();
}
