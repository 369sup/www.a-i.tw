import type { NetworkDomainGovernance } from "../../../application/ports/inbound/network-domain-governance";

export async function startDomainVerificationFromForm(
  governance: NetworkDomainGovernance,
  actorPrincipalId: string,
  formData: FormData,
) {
  return governance.start({
    enterpriseId: requiredValue(formData, "enterpriseId"),
    domainName: requiredValue(formData, "domainName"),
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
