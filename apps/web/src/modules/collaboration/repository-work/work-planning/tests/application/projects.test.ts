import { describe, expect, it } from "vitest";
import { createProjectsService } from "../../application/use-cases/projects-service";
import { InMemoryProjectStore } from "../../adapters/outbound/persistence/in-memory-projects";
describe("projects", () =>
  it("plans an Issue reference", async () => {
    const service = createProjectsService(
      new InMemoryProjectStore(),
      { isOwner: async () => true },
      {
        find: async (issueId) => ({ issueId, repositoryId: "repository-1" }),
      },
      (() => {
        let id = 0;
        return () => `project-${++id}`;
      })(),
    );
    const project = await service.create({
      ownerAccountId: "account-1",
      actorPrincipalId: "principal-1",
      title: "Roadmap",
      visibility: "private",
    });
    await expect(
      service.addIssue({
        projectId: project.projectId,
        issueId: "issue-1",
        actorPrincipalId: "principal-1",
      }),
    ).resolves.toMatchObject({
      items: [{ type: "issue", issueId: "issue-1" }],
    });
  }));

it("rejects Project creation by a non-owner", async () => {
  const service = createProjectsService(
    new InMemoryProjectStore(),
    { isOwner: async () => false },
    { find: async () => undefined },
    () => "project-1",
  );
  await expect(
    service.create({
      ownerAccountId: "account-1",
      actorPrincipalId: "principal-2",
      title: "Roadmap",
      visibility: "private",
    }),
  ).rejects.toThrow("owner authorization denied");
});
