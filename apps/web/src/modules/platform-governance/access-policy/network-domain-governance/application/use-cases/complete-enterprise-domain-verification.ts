import { completeEnterpriseDomainVerification } from "../../domain/network-domain-governance/aggregates/enterprise-domain-verification";
import { toDomainVerificationViewModel } from "../dto/to-domain-verification-view-model";
import type { NetworkDomainGovernance } from "../ports/inbound/network-domain-governance";
import type { AuthoritativeDnsTxtVerifier } from "../ports/outbound/authoritative-dns-txt-verifier";
import type { DomainVerificationRepository } from "../ports/outbound/domain-verification-repository";
import type { NetworkDomainAdministration } from "../ports/outbound/network-domain-administration";
import type { NetworkDomainEnterpriseDirectory } from "../ports/outbound/network-domain-enterprise-directory";
import { authorizeEnterpriseDomainOperation } from "./authorize-enterprise-domain-operation";

export function createCompleteEnterpriseDomainVerification(
  repository: DomainVerificationRepository,
  enterprises: NetworkDomainEnterpriseDirectory,
  administration: NetworkDomainAdministration,
  dns: AuthoritativeDnsTxtVerifier,
  clock: () => Date,
): NetworkDomainGovernance["complete"] {
  return async (input) => {
    await authorizeEnterpriseDomainOperation(
      enterprises,
      administration,
      input.enterpriseId,
      input.actorPrincipalId,
    );
    const verification = await repository.find(input.verificationId);
    if (!verification || verification.enterpriseId !== input.enterpriseId) {
      throw new Error("Domain verification is unavailable.");
    }
    if (verification.status === "verified") {
      return toDomainVerificationViewModel(verification);
    }

    const result = await dns.verify(
      verification.challenge.recordName,
      verification.challenge.expectedValue,
    );
    if (result !== "matched") {
      throw new Error(`DNS TXT verification is ${result}; retry later.`);
    }

    const completed = completeEnterpriseDomainVerification(
      verification,
      clock().toISOString(),
    );
    await repository.save(completed);
    return toDomainVerificationViewModel(completed);
  };
}
