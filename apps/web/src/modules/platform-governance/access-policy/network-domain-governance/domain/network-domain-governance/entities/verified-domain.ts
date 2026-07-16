import type { DomainVerification } from "../aggregates/enterprise-domain-verification";
import type { EnterpriseDomainName } from "../value-objects/enterprise-domain-name";

export type VerifiedDomain = Readonly<{
  enterpriseId: string;
  domainName: EnterpriseDomainName;
  verifiedAt: string;
}>;

export function createVerifiedDomain(
  verification: DomainVerification,
): VerifiedDomain | undefined {
  return verification.status === "verified" && verification.verifiedAt
    ? {
        enterpriseId: verification.enterpriseId,
        domainName: verification.domainName,
        verifiedAt: verification.verifiedAt,
      }
    : undefined;
}
