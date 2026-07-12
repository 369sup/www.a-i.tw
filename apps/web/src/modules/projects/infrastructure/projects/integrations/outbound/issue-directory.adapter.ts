import type { IssueDirectoryApiV1 } from "@/src/modules/issues/contracts/issues/public";

import type { IssueDirectory } from "../../../../application/projects/ports/outbound/issue-directory.port";

export class IssueDirectoryAdapter implements IssueDirectory {
  constructor(private readonly issues: IssueDirectoryApiV1) {}

  find(issueId: string) {
    return this.issues.findIssueRef(issueId);
  }
}
