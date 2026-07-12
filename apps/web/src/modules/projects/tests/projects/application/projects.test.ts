import { describe, expect, it } from "vitest";
import { createProjectsService } from "../../../application/projects/use-cases/projects-service";
import { InMemoryProjectStore } from "../../../infrastructure/projects/repositories/in-memory-projects";
describe("projects", () =>
  it("plans an Issue reference", async () => {
    const service = createProjectsService(
      new InMemoryProjectStore(),
      () => "project-1",
    );
    const project = await service.create({
      ownerAccountId: "account-1",
      title: "Roadmap",
      visibility: "private",
    });
    await expect(
      service.addItem({ projectId: project.id, itemId: "issue-1" }),
    ).resolves.toMatchObject({ itemIds: ["issue-1"] });
  }));
