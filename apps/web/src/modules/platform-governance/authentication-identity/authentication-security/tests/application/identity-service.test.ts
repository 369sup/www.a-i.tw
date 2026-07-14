import { describe, expect, it } from "vitest";
import { createIdentityAccessService } from "../../application/use-cases/identity-service";
import {
  InMemoryPrincipalStore,
  InMemorySessionStore,
} from "../../adapters/outbound/persistence/in-memory-identity";

describe("identity access", () => {
  it("rejects authentication for a disabled principal", async () => {
    const service = createIdentityAccessService(
      new InMemoryPrincipalStore([
        {
          id: "p-1",
          kind: "human",
          status: "disabled",
        },
      ]),
      {
        verify: async () => ({
          principalId: "p-1",
          method: "password",
          assurance: "mock",
        }),
      },
      new InMemorySessionStore(),
      () => "session-1",
      () => "token-1",
      () => new Date("2026-07-12T00:00:00Z"),
    );
    await expect(service.login("disabled", "password")).rejects.toThrow(
      "Disabled principals",
    );
  });

  it("creates isolated opaque sessions after credential verification", async () => {
    const service = createIdentityAccessService(
      new InMemoryPrincipalStore([
        { id: "p-1", kind: "human", status: "active" },
      ]),
      {
        verify: async (login, password) =>
          login === "admin" && password === "123456"
            ? {
                principalId: "p-1",
                method: "password" as const,
                assurance: "mock" as const,
              }
            : undefined,
      },
      new InMemorySessionStore(),
      () => "session-1",
      () => "token-1",
      () => new Date("2026-07-12T00:00:00Z"),
    );
    const result = await service.login("admin", "123456");
    expect(result.token).toBe("token-1");
    expect(result.expiresAt).toBe("2026-07-12T08:00:00.000Z");
    expect(await service.currentPrincipal(result.token)).toEqual(
      result.authentication,
    );
    await expect(service.login("admin", "wrong")).rejects.toThrow(
      "Invalid login or password",
    );
  });

  it("expires and revokes server Sessions independently from browser tokens", async () => {
    let now = new Date("2026-07-12T00:00:00.000Z");
    const sessions = new InMemorySessionStore();
    const service = createIdentityAccessService(
      new InMemoryPrincipalStore([
        { id: "p-1", kind: "human", status: "active" },
      ]),
      {
        verify: async () => ({
          principalId: "p-1",
          method: "password",
          assurance: "mock",
        }),
      },
      sessions,
      () => "session-1",
      () => "token-1",
      () => now,
    );
    const result = await service.login("admin", "123456");
    now = new Date(result.expiresAt);
    await expect(
      service.currentPrincipal(result.token),
    ).resolves.toBeUndefined();
    expect((await sessions.find(result.token))?.status).toBe("expired");

    now = new Date("2026-07-13T00:00:00.000Z");
    const active = await service.login("admin", "123456");
    await service.revokeSession(active.token);
    await expect(
      service.currentPrincipal(active.token),
    ).resolves.toBeUndefined();
    expect((await sessions.find(active.token))?.status).toBe("revoked");
  });
});
