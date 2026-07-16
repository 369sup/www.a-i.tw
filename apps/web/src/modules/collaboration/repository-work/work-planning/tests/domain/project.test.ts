import { describe, expect, it } from "vitest";
import {
  addProjectItem,
  createProject,
} from "../../domain/work-planning/aggregates/project";

describe("Project domain", () => {
  it("normalizes the title and starts with no items", () => {
    expect(
      createProject({
        id: "project-1",
        ownerAccountId: "account-1",
        title: "  Roadmap  ",
        visibility: "private",
      }),
    ).toEqual({
      id: "project-1",
      ownerAccountId: "account-1",
      title: "Roadmap",
      visibility: "private",
      items: [],
    });
  });

  it("rejects a blank Project title", () => {
    expect(() =>
      createProject({
        id: "project-1",
        ownerAccountId: "account-1",
        title: "   ",
        visibility: "private",
      }),
    ).toThrow("Project title is required.");
  });

  it("keeps one reference for the same Issue", () => {
    const project = createProject({
      id: "project-1",
      ownerAccountId: "account-1",
      title: "Roadmap",
      visibility: "private",
    });
    const withIssue = addProjectItem(project, {
      itemId: "item-1",
      type: "issue",
      issueId: "issue-1",
    });

    expect(
      addProjectItem(withIssue, {
        itemId: "item-2",
        type: "issue",
        issueId: "issue-1",
      }),
    ).toBe(withIssue);
  });

  it("rejects a Project Item without identity", () => {
    const project = createProject({
      id: "project-1",
      ownerAccountId: "account-1",
      title: "Roadmap",
      visibility: "private",
    });

    expect(() =>
      addProjectItem(project, {
        itemId: "",
        type: "draft",
        title: "Untriaged work",
      }),
    ).toThrow("Project item identity is required.");
  });
});
