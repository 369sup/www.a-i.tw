import { startEnterpriseDomainVerification } from "../../domain/network-domain-governance/aggregates/enterprise-domain-verification";
import { createEnterpriseDomainName } from "../../domain/network-domain-governance/value-objects/enterprise-domain-name";
import { toDomainVerificationViewModel } from "../dto/to-domain-verification-view-model";
import type { NetworkDomainGovernance } from "../ports/inbound/network-domain-governance";
import type { DomainVerificationRepository } from "../ports/outbound/domain-verification-repository";
import type { NetworkDomainAdministration } from "../ports/outbound/network-domain-administration";
import type { NetworkDomainEnterpriseDirectory } from "../ports/outbound/network-domain-enterprise-directory";
import type { VerificationTokenGenerator } from "../ports/outbound/verification-token-generator";
import { authorizeEnterpriseDomainOperation } from "./authorize-enterprise-domain-operation";

export function createStartEnterpriseDomainVerification(
  repository: DomainVerificationRepository,
  enterprises: NetworkDomainEnterpriseDirectory,
  administration: NetworkDomainAdministration,
  tokens: VerificationTokenGenerator,
  nextId: () => string,
  clock: () => Date,
): NetworkDomainGovernance["start"] {
  return async (input) => {
    await authorizeEnterpriseDomainOperation(
      enterprises,
      administration,
      input.enterpriseId,
      input.actorPrincipalId,
    );
    const domainName = createEnterpriseDomainName(input.domainName);
    if (
      await repository.findByEnterpriseAndDomain(input.enterpriseId, domainName)
    ) {
      throw new Error(
        "This Enterprise domain already has a verification record.",
      );
    }

    const verification = startEnterpriseDomainVerification({
      id: nextId(),
      enterpriseId: input.enterpriseId,
      domainName,
      token: tokens.next(),
      createdAt: clock().toISOString(),
    });
    await repository.save(verification);
    return toDomainVerificationViewModel(verification);
  };
}
