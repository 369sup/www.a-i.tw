export type DomainVerificationViewModel = Readonly<{
  verificationId: string;
  enterpriseId: string;
  domainName: string;
  status: "pending" | "verified";
  recordName: string;
  expectedValue: string;
  createdAt: string;
  verifiedAt?: string;
}>;

export type EnterpriseDomainVerificationViewModel = Readonly<{
  enterpriseId: string;
  enterpriseName: string;
  domains: readonly DomainVerificationViewModel[];
}>;
