import { createDnsTxtChallenge } from "../value-objects/dns-txt-challenge";
import { createDomainVerificationId } from "../value-objects/domain-verification-id";
import { createDomainVerificationTimestamp } from "../value-objects/domain-verification-timestamp";
import { createEnterpriseId } from "../value-objects/enterprise-id";
import { createEnterpriseDomainName } from "../value-objects/enterprise-domain-name";
import type { DomainVerification } from "./enterprise-domain-verification";

export function restoreEnterpriseDomainVerification(input: {
  id: string;
  enterpriseId: string;
  domainName: string;
  challenge: Readonly<{ recordName: string; expectedValue: string }>;
  status: "pending" | "verified";
  createdAt: string;
  verifiedAt?: string;
}): DomainVerification {
  const domainName = createEnterpriseDomainName(input.domainName);
  const verification: DomainVerification = {
    id: createDomainVerificationId(input.id),
    enterpriseId: createEnterpriseId(input.enterpriseId),
    domainName,
    challenge: createDnsTxtChallenge(domainName, input.challenge.expectedValue),
    status: input.status,
    createdAt: createDomainVerificationTimestamp(input.createdAt),
    ...(input.verifiedAt
      ? {
          verifiedAt: createDomainVerificationTimestamp(input.verifiedAt),
        }
      : {}),
  };

  if (verification.challenge.recordName !== input.challenge.recordName) {
    throw new Error("DNS TXT challenge record does not match its domain.");
  }
  if (verification.status === "verified" && !verification.verifiedAt) {
    throw new Error("A verified domain requires a verification timestamp.");
  }
  if (verification.status === "pending" && verification.verifiedAt) {
    throw new Error("A pending domain cannot have a verification timestamp.");
  }

  return verification;
}
