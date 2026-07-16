import { describe, expect, it, vi } from "vitest";
import { addDraftToProjectFromForm } from "../../adapters/inbound/server-actions/add-draft-to-project";
import { addIssueToProjectFromForm } from "../../adapters/inbound/server-actions/add-issue-to-project";
import { createProjectFromForm } from "../../adapters/inbound/server-actions/create-project";
import type { ProjectsService } from "../../application/use-cases/projects-service";

function projectsService() {
  return {
    create: vi.fn(),
    addIssue: vi.fn(),
    addDraft: vi.fn(),
    list: vi.fn(),
  } satisfies ProjectsService;
}

function formData(values: Readonly<Record<string, string>>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe("Project Server Action adapters", () => {
  it("maps create, Issue reference and Draft forms to use cases", async () => {
    const projects = projectsService();

    await createProjectFromForm(
      projects,
      "principal-1",
      formData({
        ownerAccountId: "account-1",
        title: " Roadmap ",
        visibility: "public",
      }),
    );
    await addIssueToProjectFromForm(
      projects,
      "principal-1",
      formData({ projectId: "project-1", issueId: "issue-1" }),
    );
    await addDraftToProjectFromForm(
      projects,
      "principal-1",
      formData({
        projectId: "project-1",
        title: " Draft plan ",
        body: " Start here ",
      }),
    );

    expect(projects.create).toHaveBeenCalledWith({
      ownerAccountId: "account-1",
      actorPrincipalId: "principal-1",
      title: "Roadmap",
      visibility: "public",
    });
    expect(projects.addIssue).toHaveBeenCalledWith({
      projectId: "project-1",
      issueId: "issue-1",
      actorPrincipalId: "principal-1",
    });
    expect(projects.addDraft).toHaveBeenCalledWith({
      projectId: "project-1",
      title: "Draft plan",
      body: "Start here",
      actorPrincipalId: "principal-1",
    });
  });

  it("rejects missing transport values before invoking a use case", () => {
    const projects = projectsService();

    expect(() =>
      createProjectFromForm(
        projects,
        "principal-1",
        formData({ ownerAccountId: "account-1" }),
      ),
    ).toThrow("title is required.");
    expect(projects.create).not.toHaveBeenCalled();
  });
});
