import { describe, expect, it } from "vitest";

import { createCreateResource } from "./create-resource";
import type { ResourceStore } from "./ports";

function createStore(): ResourceStore & { saved: number } {
  return {
    saved: 0,
    async getById() {
      return null;
    },
    async isNameTaken() {
      return false;
    },
    async listByNamespace() {
      return [];
    },
    async save() {
      this.saved += 1;
      return "saved";
    },
  };
}

describe("CreateResource", () => {
  it("does not persist an invalid name", async () => {
    const resources = createStore();
    const createResource = createCreateResource({
      access: { canCreateResource: async () => true },
      clock: { now: () => new Date("2026-07-11T00:00:00.000Z") },
      ids: { generate: () => "resource-1" },
      namespaces: { isActive: async () => true },
      resources,
    });

    await expect(
      createResource.execute({
        principalId: "principal-1",
        namespaceId: "namespace-1",
        name: "New",
      }),
    ).resolves.toEqual({ ok: false, code: "INVALID_NAME" });
    expect(resources.saved).toBe(0);
  });

  it("maps the persistence uniqueness backstop to NAME_TAKEN", async () => {
    const resources = createStore();
    resources.save = async () => "name-conflict";
    const createResource = createCreateResource({
      access: { canCreateResource: async () => true },
      clock: { now: () => new Date("2026-07-11T00:00:00.000Z") },
      ids: { generate: () => "resource-1" },
      namespaces: { isActive: async () => true },
      resources,
    });

    await expect(
      createResource.execute({
        principalId: "principal-1",
        namespaceId: "namespace-1",
        name: "design-system",
      }),
    ).resolves.toEqual({ ok: false, code: "NAME_TAKEN" });
  });
});
