import { describe, expect, it } from "vitest";
import {
  applyLabel,
  assignIssue,
  closeIssue,
  createIssue,
  reopenIssue,
} from "../../domain/work-tracking/aggregates/issue";

describe("Issue", () => {
  it("creates an open repository-scoped Issue with normalized content", () => {
    const issue = createIssue({
      id: "issue-1",
      repositoryId: "repository-1",
      number: 1,
      title: "  Track work  ",
      body: "  Details  ",
    });

    expect(issue).toEqual({
      id: "issue-1",
      repositoryId: "repository-1",
      number: 1,
      title: "Track work",
      body: "Details",
      status: "open",
      labelIds: [],
      assigneePrincipalIds: [],
    });
  });

  it.each([
    [{ title: "   ", number: 1 }, "Issue title is required."],
    [{ title: "Track work", number: 0 }, "Issue number is invalid."],
    [{ title: "Track work", number: 1.5 }, "Issue number is invalid."],
  ])("rejects invalid Issue identity input", (override, message) => {
    expect(() =>
      createIssue({
        id: "issue-1",
        repositoryId: "repository-1",
        body: "",
        ...override,
      }),
    ).toThrow(message);
  });

  it("keeps labels and assignees unique and supports lifecycle transitions", () => {
    const issue = createIssue({
      id: "issue-1",
      repositoryId: "repository-1",
      number: 1,
      title: "Track work",
      body: "",
    });
    const labelled = applyLabel(applyLabel(issue, "label-1"), "label-1");
    const assigned = assignIssue(assignIssue(labelled, "user-1"), "user-1");

    expect(assigned.labelIds).toEqual(["label-1"]);
    expect(assigned.assigneePrincipalIds).toEqual(["user-1"]);
    expect(reopenIssue(closeIssue(assigned)).status).toBe("open");
  });
});
