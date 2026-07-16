import type {
  DomainVerificationViewModel,
  EnterpriseDomainVerificationViewModel,
} from "../../dto/domain-verification-view-model";

export interface NetworkDomainGovernance {
  start(input: {
    enterpriseId: string;
    domainName: string;
    actorPrincipalId: string;
  }): Promise<DomainVerificationViewModel>;
  complete(input: {
    enterpriseId: string;
    verificationId: string;
    actorPrincipalId: string;
  }): Promise<DomainVerificationViewModel>;
  list(input: {
    enterpriseId: string;
    actorPrincipalId: string;
  }): Promise<EnterpriseDomainVerificationViewModel>;
}
