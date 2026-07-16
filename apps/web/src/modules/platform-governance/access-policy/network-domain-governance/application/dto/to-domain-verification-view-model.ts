import type { DomainVerification } from "../../domain/network-domain-governance/aggregates/enterprise-domain-verification";
import type { DomainVerificationViewModel } from "./domain-verification-view-model";

export function toDomainVerificationViewModel(
  verification: DomainVerification,
): DomainVerificationViewModel {
  return {
    verificationId: verification.id,
    enterpriseId: verification.enterpriseId,
    domainName: verification.domainName,
    status: verification.status,
    recordName: verification.challenge.recordName,
    expectedValue: verification.challenge.expectedValue,
    createdAt: verification.createdAt,
    ...(verification.verifiedAt ? { verifiedAt: verification.verifiedAt } : {}),
  };
}
