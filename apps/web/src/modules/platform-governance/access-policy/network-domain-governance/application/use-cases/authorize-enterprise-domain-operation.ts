import type { NetworkDomainAdministration } from "../ports/outbound/network-domain-administration";
import type {
  NetworkDomainEnterprise,
  NetworkDomainEnterpriseDirectory,
} from "../ports/outbound/network-domain-enterprise-directory";

export async function authorizeEnterpriseDomainOperation(
  enterprises: NetworkDomainEnterpriseDirectory,
  administration: NetworkDomainAdministration,
  enterpriseId: string,
  principalId: string,
): Promise<NetworkDomainEnterprise> {
  const enterprise = await enterprises.resolve(enterpriseId);
  if (!enterprise) throw new Error("Enterprise account is unavailable.");
  await administration.requireEnterpriseOwner(enterpriseId, principalId);
  return enterprise;
}
