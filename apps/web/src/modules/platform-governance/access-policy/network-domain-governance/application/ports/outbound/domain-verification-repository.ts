import type { DomainVerification } from "../../../domain/network-domain-governance/aggregates/enterprise-domain-verification";
import type { EnterpriseDomainName } from "../../../domain/network-domain-governance/value-objects/enterprise-domain-name";

export interface DomainVerificationRepository {
  find(verificationId: string): Promise<DomainVerification | undefined>;
  findByEnterpriseAndDomain(
    enterpriseId: string,
    domainName: EnterpriseDomainName,
  ): Promise<DomainVerification | undefined>;
  list(enterpriseId: string): Promise<readonly DomainVerification[]>;
  save(verification: DomainVerification): Promise<void>;
}
