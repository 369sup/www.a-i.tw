import { DeterministicAuthoritativeDnsTxtVerifier } from "../adapters/outbound/integrations/deterministic-authoritative-dns-txt-verifier";
import { GeneratedVerificationToken } from "../adapters/outbound/integrations/generated-verification-token";
import { NetworkDomainAdministrationAdapter } from "../adapters/outbound/integrations/network-domain-administration-adapter";
import { NetworkDomainEnterpriseDirectoryAdapter } from "../adapters/outbound/integrations/network-domain-enterprise-directory-adapter";
import { InMemoryDomainVerificationRepository } from "../adapters/outbound/persistence/in-memory-domain-verification-repository";
import type { NetworkDomainGovernance } from "../application/ports/inbound/network-domain-governance";
import type { NetworkDomainAdministration } from "../application/ports/outbound/network-domain-administration";
import type { NetworkDomainEnterpriseDirectory } from "../application/ports/outbound/network-domain-enterprise-directory";
import { createCompleteEnterpriseDomainVerification } from "../application/use-cases/complete-enterprise-domain-verification";
import { createListEnterpriseDomains } from "../application/use-cases/list-enterprise-domains";
import { createStartEnterpriseDomainVerification } from "../application/use-cases/start-enterprise-domain-verification";

export function createNetworkDomainGovernanceComposition(
  enterprises: NetworkDomainEnterpriseDirectory,
  administration: NetworkDomainAdministration,
  nextVerificationId: () => string,
  nextToken: () => string,
  now: () => Date = () => new Date(),
) {
  const repository = new InMemoryDomainVerificationRepository();
  return {
    start: createStartEnterpriseDomainVerification(
      repository,
      enterprises,
      administration,
      new GeneratedVerificationToken(nextToken),
      nextVerificationId,
      now,
    ),
    complete: createCompleteEnterpriseDomainVerification(
      repository,
      enterprises,
      administration,
      new DeterministicAuthoritativeDnsTxtVerifier(),
      now,
    ),
    list: createListEnterpriseDomains(repository, enterprises, administration),
  } satisfies NetworkDomainGovernance;
}

export {
  DeterministicAuthoritativeDnsTxtVerifier,
  GeneratedVerificationToken,
  InMemoryDomainVerificationRepository,
  NetworkDomainAdministrationAdapter,
  NetworkDomainEnterpriseDirectoryAdapter,
  createCompleteEnterpriseDomainVerification,
  createListEnterpriseDomains,
  createStartEnterpriseDomainVerification,
};
