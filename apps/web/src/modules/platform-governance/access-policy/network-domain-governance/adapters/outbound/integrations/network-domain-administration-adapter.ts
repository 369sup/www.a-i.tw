import type { AdministrativeAccessApiV1 } from "@/src/modules/platform-governance/access-policy/administrative-access-control/contracts/v1/public";
import type { NetworkDomainAdministration } from "../../../application/ports/outbound/network-domain-administration";

export class NetworkDomainAdministrationAdapter implements NetworkDomainAdministration {
  constructor(private readonly administration: AdministrativeAccessApiV1) {}

  requireEnterpriseOwner(enterpriseId: string, principalId: string) {
    return this.administration.requireEnterpriseOwner(
      enterpriseId,
      principalId,
    );
  }
}
