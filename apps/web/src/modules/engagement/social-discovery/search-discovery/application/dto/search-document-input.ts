export type SearchDocumentInput = Readonly<{
  resourceId: string;
  resourceType: "account" | "repository" | "issue" | "project" | "discussion";
  title: string;
  body?: string;
  href: string;
  ownerLabel: string;
}>;
