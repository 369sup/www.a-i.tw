import type { IssueDirectoryApiV1 } from "@/src/modules/collaboration/repository-work/work-tracking/contracts/v1/public";

import type { IssueDirectory } from "../../../application/ports/outbound/issue-directory-port";

export class IssueDirectoryAdapter implements IssueDirectory {
  constructor(private readonly issues: IssueDirectoryApiV1) {}

  find(issueId: string) {
    return this.issues.findIssueRef(issueId);
  }
}
