export interface IssueDirectory {
  find(issueId: string): Promise<
    | Readonly<{
        issueId: string;
        repositoryId: string;
      }>
    | undefined
  >;
}
