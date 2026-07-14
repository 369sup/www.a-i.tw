export type IssueRefV1 = Readonly<{
  issueId: string;
  repositoryId: string;
}>;

export interface IssueDirectoryApiV1 {
  findIssueRef(issueId: string): Promise<IssueRefV1 | undefined>;
}
