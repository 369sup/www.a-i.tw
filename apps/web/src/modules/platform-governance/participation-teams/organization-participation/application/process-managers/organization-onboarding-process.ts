import { activateMembership } from "../../domain/organization-participation/entities/membership";
import type { OrganizationAccountDirectory } from "../ports/outbound/organization-account-directory-port";
import type { OrganizationAccountProvisioner } from "../ports/outbound/organization-account-provisioner-port";
import type { OrganizationOnboardingStore } from "../ports/outbound/organization-onboarding-store-port";
import type { MembershipStore } from "../ports/outbound/membership-store-port";

export class OrganizationOnboardingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OrganizationOnboardingError";
  }
}

export function createOrganizationOnboardingProcess(
  accounts: OrganizationAccountProvisioner,
  accountDirectory: OrganizationAccountDirectory,
  memberships: MembershipStore,
  onboarding: OrganizationOnboardingStore,
  nextMembershipId: () => string,
  clock: () => Date,
) {
  return {
    async onboard(input: {
      principal: {
        principalId: string;
        status: "active" | "disabled";
      };
      handle: string;
      displayName: string;
    }) {
      const principalId = input.principal.principalId.trim();
      const onboardingKey = `${principalId}:${input.handle.trim().toLowerCase()}`;
      let state = await onboarding.find(onboardingKey);
      if (!state) {
        state = {
          onboardingKey,
          principalId,
          handle: input.handle,
          displayName: input.displayName,
          membershipId: nextMembershipId(),
          status: "pending-account",
        };
        await onboarding.save(state);
      } else if (
        state.displayName !== input.displayName ||
        state.principalId !== principalId
      ) {
        throw new OrganizationOnboardingError(
          "Organization onboarding retry input does not match the original request.",
        );
      }

      try {
        let accountId = state.accountId;
        if (!accountId) {
          const account = await accounts.provision(input);
          accountId = account.accountId;
          state = { ...state, accountId, status: "pending-owner" };
          await onboarding.save(state);
        }

        const account = await accountDirectory.resolve(accountId);
        if (!account || account.status !== "active")
          throw new OrganizationOnboardingError(
            "Provisioned Organization Account is unavailable or inactive.",
          );

        const existing = await memberships.find(accountId, principalId);
        if (existing) {
          if (existing.status !== "active" || existing.role !== "owner")
            throw new OrganizationOnboardingError(
              "Founding Principal has a conflicting Organization Membership.",
            );
        } else {
          await memberships.save(
            activateMembership({
              id: state.membershipId,
              accountId,
              principalId,
              role: "owner",
              joinedAt: clock().toISOString(),
            }),
          );
        }

        state = { ...state, accountId, status: "completed" };
        await onboarding.save(state);
        return {
          account: {
            accountId,
            handle: state.handle.trim().toLowerCase(),
            kind: account.kind,
            status: account.status,
          },
          membershipId: state.membershipId,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await onboarding.save({
          ...state,
          status: "failed",
          lastFailure: message,
        });
        if (error instanceof OrganizationOnboardingError) throw error;
        throw new OrganizationOnboardingError(message);
      }
    },
  };
}
