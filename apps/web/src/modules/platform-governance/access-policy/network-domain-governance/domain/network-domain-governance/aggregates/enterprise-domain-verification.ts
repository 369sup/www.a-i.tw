import {
  createDnsTxtChallenge,
  type DnsTxtChallenge,
} from "../value-objects/dns-txt-challenge";
import { createDomainVerificationId } from "../value-objects/domain-verification-id";
import { createDomainVerificationTimestamp } from "../value-objects/domain-verification-timestamp";
import type { DomainVerificationStatus } from "../value-objects/domain-verification-status";
import { createEnterpriseId } from "../value-objects/enterprise-id";
import {
  createEnterpriseDomainName,
  type EnterpriseDomainName,
} from "../value-objects/enterprise-domain-name";

export type DomainVerification = Readonly<{
  id: string;
  enterpriseId: string;
  domainName: EnterpriseDomainName;
  challenge: DnsTxtChallenge;
  status: DomainVerificationStatus;
  createdAt: string;
  verifiedAt?: string;
}>;

export function startEnterpriseDomainVerification(input: {
  id: string;
  enterpriseId: string;
  domainName: string;
  token: string;
  createdAt: string;
}): DomainVerification {
  const domainName = createEnterpriseDomainName(input.domainName);
  return {
    id: createDomainVerificationId(input.id),
    enterpriseId: createEnterpriseId(input.enterpriseId),
    domainName,
    challenge: createDnsTxtChallenge(domainName, input.token),
    status: "pending",
    createdAt: createDomainVerificationTimestamp(input.createdAt),
  };
}

export function completeEnterpriseDomainVerification(
  verification: DomainVerification,
  verifiedAt: string,
): DomainVerification {
  if (verification.status === "verified") return verification;
  return {
    ...verification,
    status: "verified",
    verifiedAt: createDomainVerificationTimestamp(verifiedAt),
  };
}
