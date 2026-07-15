import { describe, expect, it } from "vitest";
import { InMemoryTeamStore } from "../../adapters/outbound/persistence/in-memory-team-store";
import { InvalidTeamIdError } from "../../domain/organization-participation/errors/invalid-team-id-error";

describe("InMemoryTeamStore", () => {
  it("reconstructs Team seeds through Domain factories", async () => {
    const store = new InMemoryTeamStore([
      {
        id: "team-1",
        accountId: "org-1",
        name: "Research Team",
        memberMembershipIds: ["membership-1"],
      },
    ]);
    await expect(store.find("team-1")).resolves.toMatchObject({
      name: "research-team",
      memberMembershipIds: ["membership-1"],
    });
  });

  it("rejects invalid persisted Team identity", () => {
    expect(
      () => new InMemoryTeamStore([{ id: " ", accountId: "org-1", name: "x" }]),
    ).toThrow(InvalidTeamIdError);
  });
});
