export type FeedItem = Readonly<{
  id: string;
  recipientPrincipalId: string;
  actorPrincipalId: string;
  verb: string;
  subjectRef: string;
  occurredAt: string;
}>;
export function createFeedItem(value: FeedItem) {
  if (
    !value.id.trim() ||
    !value.recipientPrincipalId.trim() ||
    !value.actorPrincipalId.trim() ||
    !value.verb.trim() ||
    !value.subjectRef.trim()
  ) {
    throw new Error(
      "Feed identity, recipient, actor, verb and subject are required.",
    );
  }
  if (Number.isNaN(Date.parse(value.occurredAt))) {
    throw new Error("Feed occurrence time is invalid.");
  }
  return Object.freeze({
    ...value,
    id: value.id.trim(),
    recipientPrincipalId: value.recipientPrincipalId.trim(),
    actorPrincipalId: value.actorPrincipalId.trim(),
    verb: value.verb.trim(),
    subjectRef: value.subjectRef.trim(),
  });
}
