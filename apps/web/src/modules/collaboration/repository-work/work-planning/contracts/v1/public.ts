export type ProjectItemV1 =
  | Readonly<{ itemId: string; type: "issue"; issueId: string }>
  | Readonly<{ itemId: string; type: "draft"; title: string; body?: string }>;

export type ProjectSummaryV1 = Readonly<{
  projectId: string;
  ownerAccountId: string;
  title: string;
  visibility: "public" | "private";
  items: readonly ProjectItemV1[];
}>;
