export type SearchDocument = Readonly<{
  id: string;
  type: "account" | "repository" | "issue" | "project" | "discussion";
  title: string;
  body: string;
  visibility: "public" | "restricted";
}>;
export function matchesSearch(value: SearchDocument, query: string) {
  const q = query.trim().toLocaleLowerCase();
  return (
    q.length > 0 &&
    `${value.title} ${value.body}`.toLocaleLowerCase().includes(q)
  );
}
