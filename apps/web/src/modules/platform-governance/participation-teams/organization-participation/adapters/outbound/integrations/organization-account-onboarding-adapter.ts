import type { OrganizationAccountApiV1 } from "@/src/modules/platform-governance/accounts-profile/organization-account/contracts/v1/public";

import type { OrganizationAccountOnboardingGateway } from "../../../application/ports/outbound/organization-account-onboarding-gateway-port";

export class OrganizationAccountOnboardingAdapter implements OrganizationAccountOnboardingGateway {
  constructor(private readonly accounts: OrganizationAccountApiV1) {}

  async resolve(accountId: string) {
    const account = await this.accounts.resolve(accountId);
    return account ? { kind: account.kind, status: account.status } : undefined;
  }

  provision(
    input: Parameters<OrganizationAccountOnboardingGateway["provision"]>[0],
  ) {
    return this.accounts.provision(input);
  }
}
