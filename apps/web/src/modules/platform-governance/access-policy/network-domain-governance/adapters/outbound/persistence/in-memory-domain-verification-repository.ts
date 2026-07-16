import type { DomainVerificationRepository } from "../../../application/ports/outbound/domain-verification-repository";
import type { DomainVerification } from "../../../domain/network-domain-governance/aggregates/enterprise-domain-verification";
import { restoreEnterpriseDomainVerification } from "../../../domain/network-domain-governance/aggregates/restore-enterprise-domain-verification";
import type { EnterpriseDomainName } from "../../../domain/network-domain-governance/value-objects/enterprise-domain-name";

type DomainVerificationSeed = Readonly<{
  id: string;
  enterpriseId: string;
  domainName: string;
  challenge: Readonly<{ recordName: string; expectedValue: string }>;
  status: "pending" | "verified";
  createdAt: string;
  verifiedAt?: string;
}>;

export class InMemoryDomainVerificationRepository implements DomainVerificationRepository {
  private readonly verifications = new Map<string, DomainVerification>();

  constructor(seed: readonly DomainVerificationSeed[] = []) {
    for (const item of seed) {
      const verification = restoreEnterpriseDomainVerification(item);
      this.verifications.set(verification.id, verification);
    }
  }

  async find(verificationId: string) {
    return this.verifications.get(verificationId);
  }

  async findByEnterpriseAndDomain(
    enterpriseId: string,
    domainName: EnterpriseDomainName,
  ) {
    return [...this.verifications.values()].find(
      (item) =>
        item.enterpriseId === enterpriseId && item.domainName === domainName,
    );
  }

  async list(enterpriseId: string) {
    return [...this.verifications.values()].filter(
      (item) => item.enterpriseId === enterpriseId,
    );
  }

  async save(verification: DomainVerification) {
    this.verifications.set(
      verification.id,
      restoreEnterpriseDomainVerification(verification),
    );
  }
}
