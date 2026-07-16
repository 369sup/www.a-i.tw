import { describe, expect, it } from "vitest";
import {
  createIssueComment,
  createIssueDependency,
  createMilestone,
} from "../../domain/work-tracking/entities/issue-collaboration";

describe("Issue collaboration", () => {
  it("normalizes Issue comments and requires a body", () => {
    expect(
      createIssueComment({
        id: "comment-1",
        issueId: "issue-1",
        authorPrincipalId: "user-1",
        body: "  A useful reply  ",
        createdAt: "2026-07-16T00:00:00.000Z",
      }).body,
    ).toBe("A useful reply");

    expect(() =>
      createIssueComment({
        id: "comment-2",
        issueId: "issue-1",
        authorPrincipalId: "user-1",
        body: "   ",
        createdAt: "2026-07-16T00:00:00.000Z",
      }),
    ).toThrow("Issue comment body is required.");
  });

  it("opens normalized Milestones and requires a title", () => {
    expect(
      createMilestone({
        id: "milestone-1",
        repositoryId: "repository-1",
        title: "  First release  ",
      }),
    ).toMatchObject({ title: "First release", state: "open" });

    expect(() =>
      createMilestone({
        id: "milestone-2",
        repositoryId: "repository-1",
        title: "   ",
      }),
    ).toThrow("Milestone title is required.");
  });

  it("prevents an Issue from blocking itself", () => {
    expect(createIssueDependency("issue-1", "issue-2")).toEqual({
      blockedIssueId: "issue-1",
      blockingIssueId: "issue-2",
    });
    expect(() => createIssueDependency("issue-1", "issue-1")).toThrow(
      "An Issue cannot block itself.",
    );
  });
});
