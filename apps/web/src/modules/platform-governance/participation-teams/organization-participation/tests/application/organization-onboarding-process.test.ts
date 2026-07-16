import { describe, expect, it, vi } from "vitest";
import { InMemoryMembershipStore } from "../../adapters/outbound/persistence/in-memory-membership";
import { InMemoryOrganizationOnboardingStore } from "../../adapters/outbound/persistence/in-memory-organization-onboarding-store";
import {
  createOrganizationOnboardingProcess,
  OrganizationOnboardingError,
} from "../../application/process-managers/organization-onboarding-process";
import type { MembershipStore } from "../../application/ports/outbound/membership-store-port";

const input = {
  principal: { principalId: "principal-1", status: "active" as const },
  handle: "Example-Org",
  displayName: "Example Organization",
};

describe("Organization onboarding process", () => {
  it("creates exactly one founding owner and is idempotent", async () => {
    const memberships = new InMemoryMembershipStore();
    const provision = vi.fn(async () => ({
      accountId: "organization-1",
      handle: "example-org",
      kind: "organization" as const,
      status: "active" as const,
    }));
    const process = createOrganizationOnboardingProcess(
      { provision },
      {
        async resolve() {
          return { kind: "organization", status: "active" };
        },
      },
      memberships,
      new InMemoryOrganizationOnboardingStore(),
      () => "membership-1",
      () => new Date("2026-07-16T00:00:00.000Z"),
    );

    await expect(process.onboard(input)).resolves.toMatchObject({
      account: { accountId: "organization-1", handle: "example-org" },
      membershipId: "membership-1",
    });
    await expect(process.onboard(input)).resolves.toMatchObject({
      membershipId: "membership-1",
    });
    expect(provision).toHaveBeenCalledTimes(1);
    await expect(
      memberships.find("organization-1", "principal-1"),
    ).resolves.toMatchObject({ role: "owner", status: "active" });
  });

  it("persists failure state and retries without duplicating the Account", async () => {
    const persistedMemberships = new InMemoryMembershipStore();
    let fail = true;
    const memberships: MembershipStore = {
      find: (...args) => persistedMemberships.find(...args),
      list: (...args) => persistedMemberships.list(...args),
      async save(membership) {
        if (fail) {
          fail = false;
          throw new Error("Membership store unavailable.");
        }
        await persistedMemberships.save(membership);
      },
    };
    const onboarding = new InMemoryOrganizationOnboardingStore();
    const provision = vi.fn(async () => ({
      accountId: "organization-1",
      handle: "example-org",
      kind: "organization" as const,
      status: "active" as const,
    }));
    const process = createOrganizationOnboardingProcess(
      { provision },
      {
        async resolve() {
          return { kind: "organization", status: "active" };
        },
      },
      memberships,
      onboarding,
      () => "membership-1",
      () => new Date("2026-07-16T00:00:00.000Z"),
    );

    await expect(process.onboard(input)).rejects.toEqual(
      new OrganizationOnboardingError("Membership store unavailable."),
    );
    await expect(
      onboarding.find("principal-1:example-org"),
    ).resolves.toMatchObject({
      accountId: "organization-1",
      status: "failed",
      lastFailure: "Membership store unavailable.",
    });

    await expect(process.onboard(input)).resolves.toMatchObject({
      membershipId: "membership-1",
    });
    expect(provision).toHaveBeenCalledTimes(1);
    await expect(
      persistedMemberships.find("organization-1", "principal-1"),
    ).resolves.toMatchObject({ role: "owner", status: "active" });
  });
});
