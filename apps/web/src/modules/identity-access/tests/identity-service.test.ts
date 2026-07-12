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
      { verify: async () => "p-1" },
      new InMemorySessionStore(),
      () => "session-1",
      () => new Date("2026-07-12T00:00:00Z"),
    );
    await expect(service.login("disabled", "password")).rejects.toThrow(
      "Disabled principals",
    );
  });

  it("creates isolated opaque sessions after credential verification", async () => {
    const service = createIdentityAccessService(
      new InMemoryPrincipalStore([
        { id: "p-1", handle: "admin", displayName: "Admin", status: "active" },
      ]),
      {
        verify: async (login, password) =>
          login === "admin" && password === "123456" ? "p-1" : undefined,
      },
      new InMemorySessionStore(),
      () => "session-1",
      () => new Date("2026-07-12T00:00:00Z"),
    );
    const result = await service.login("admin", "123456");
    expect(result.token).toBe("session-1");
    expect(await service.currentPrincipal(result.token)).toEqual(
      result.authentication,
    );
    await expect(service.login("admin", "wrong")).rejects.toThrow(
      "Invalid login or password",
    );
  });
});
