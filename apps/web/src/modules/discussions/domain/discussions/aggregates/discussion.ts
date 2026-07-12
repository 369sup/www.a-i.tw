export type Discussion = Readonly<{
  id: string;
  repositoryId: string;
  authorPrincipalId: string;
  title: string;
  body: string;
  state: "open" | "closed";
  answerCommentId?: string;
}>;
export function createDiscussion(
  input: Omit<Discussion, "state" | "answerCommentId">,
): Discussion {
  if (!input.title.trim()) throw new Error("Discussion title is required.");
  return { ...input, title: input.title.trim(), state: "open" };
}
export function markAnswer(value: Discussion, commentId: string): Discussion {
  if (value.state === "closed")
    throw new Error("Closed Discussion cannot accept an answer.");
  if (!commentId) throw new Error("Answer comment is required.");
  return { ...value, answerCommentId: commentId };
}
