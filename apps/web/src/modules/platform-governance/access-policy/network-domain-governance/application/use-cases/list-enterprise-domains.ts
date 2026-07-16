import { toDomainVerificationViewModel } from "../dto/to-domain-verification-view-model";
import type { NetworkDomainGovernance } from "../ports/inbound/network-domain-governance";
import type { DomainVerificationRepository } from "../ports/outbound/domain-verification-repository";
import type { NetworkDomainAdministration } from "../ports/outbound/network-domain-administration";
import type { NetworkDomainEnterpriseDirectory } from "../ports/outbound/network-domain-enterprise-directory";
import { authorizeEnterpriseDomainOperation } from "./authorize-enterprise-domain-operation";

export function createListEnterpriseDomains(
  repository: DomainVerificationRepository,
  enterprises: NetworkDomainEnterpriseDirectory,
  administration: NetworkDomainAdministration,
): NetworkDomainGovernance["list"] {
  return async (input) => {
    const enterprise = await authorizeEnterpriseDomainOperation(
      enterprises,
      administration,
      input.enterpriseId,
      input.actorPrincipalId,
    );
    return {
      enterpriseId: enterprise.enterpriseId,
      enterpriseName: enterprise.name,
      domains: (await repository.list(input.enterpriseId)).map(
        toDomainVerificationViewModel,
      ),
    };
  };
}
