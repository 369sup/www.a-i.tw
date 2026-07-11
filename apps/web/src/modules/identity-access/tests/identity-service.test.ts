import { describe, expect, it } from "vitest";
import { createIdentityAccessService } from "../src/application/identity-service";
import {
  InMemoryPrincipalStore,
  InMemorySessionStore,
} from "../src/infrastructure/in-memory-identity";

describe("identity access", () => {
  it("rejects authentication for a disabled principal", async () => {
    const service = createIdentityAccessService(
      new InMemoryPrincipalStore([
        {
          id: "p-1",
          handle: "disabled",
          displayName: "Disabled",
          status: "disabled",
        },
      ]),
      new InMemorySessionStore(),
      () => new Date("2026-07-12T00:00:00Z"),
    );
    await expect(service.authenticate("p-1")).rejects.toThrow(
      "Disabled principals",
    );
  });
});
