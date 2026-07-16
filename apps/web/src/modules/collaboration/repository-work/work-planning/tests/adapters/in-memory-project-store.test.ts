import { describe, expect, it } from "vitest";
import { InMemoryProjectStore } from "../../adapters/outbound/persistence/in-memory-projects";
import { createProject } from "../../domain/work-planning/aggregates/project";

describe("InMemoryProjectStore", () => {
  it("reconstructs Projects by identity and owner account", async () => {
    const store = new InMemoryProjectStore();
    const project = createProject({
      id: "project-1",
      ownerAccountId: "account-1",
      title: "Roadmap",
      visibility: "private",
    });

    await store.save(project);

    await expect(store.find("project-1")).resolves.toEqual(project);
    await expect(store.list("account-1")).resolves.toEqual([project]);
    await expect(store.list("account-2")).resolves.toEqual([]);
  });
});
