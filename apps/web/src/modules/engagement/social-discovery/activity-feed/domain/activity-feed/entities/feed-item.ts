export type FeedItem = Readonly<{
  id: string;
  recipientPrincipalId: string;
  actorPrincipalId: string;
  verb: string;
  subjectRef: string;
  occurredAt: string;
}>;
export function createFeedItem(value: FeedItem) {
  if (!value.verb.trim()) throw new Error("Feed verb is required.");
  return value;
}
