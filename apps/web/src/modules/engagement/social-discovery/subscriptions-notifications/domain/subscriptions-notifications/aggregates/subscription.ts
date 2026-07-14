export type RepositoryWatchMode = "participating" | "all" | "custom" | "ignore";
export type WatchEventType = "issues" | "discussions";

export type RepositoryWatch = Readonly<{
  principalId: string;
  repositoryId: string;
  mode: RepositoryWatchMode;
  eventTypes: readonly WatchEventType[];
}>;

export type ConversationSubscription = Readonly<{
  principalId: string;
  subjectRef: string;
  active: boolean;
}>;

export function createRepositoryWatch(input: RepositoryWatch): RepositoryWatch {
  if (!input.principalId.trim() || !input.repositoryId.trim())
    throw new Error("Repository watch requires a Principal and Repository.");
  return { ...input, eventTypes: [...new Set(input.eventTypes)] };
}

export function createConversationSubscription(input: {
  principalId: string;
  subjectRef: string;
}): ConversationSubscription {
  if (!input.principalId.trim() || !input.subjectRef.trim())
    throw new Error(
      "Conversation subscription requires a Principal and subject.",
    );
  return { ...input, active: true };
}
