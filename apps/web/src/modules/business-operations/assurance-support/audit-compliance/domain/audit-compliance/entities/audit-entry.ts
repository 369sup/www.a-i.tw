export type AuditEntry = Readonly<{
  id: string;
  actorPrincipalId: string;
  action: string;
  targetRef: string;
  result: "success" | "failure";
  occurredAt: string;
}>;
export function createAuditEntry(value: AuditEntry) {
  if (
    !value.id.trim() ||
    !value.actorPrincipalId.trim() ||
    !value.action.trim() ||
    !value.targetRef.trim()
  ) {
    throw new Error("Audit identity, actor, action and target are required.");
  }
  if (Number.isNaN(Date.parse(value.occurredAt))) {
    throw new Error("Audit occurrence time is invalid.");
  }
  return Object.freeze({
    ...value,
    id: value.id.trim(),
    actorPrincipalId: value.actorPrincipalId.trim(),
    action: value.action.trim(),
    targetRef: value.targetRef.trim(),
  });
}
