export type AuditEntry = Readonly<{
  id: string;
  actorPrincipalId: string;
  action: string;
  targetRef: string;
  result: "success" | "failure";
  occurredAt: string;
}>;
export function createAuditEntry(value: AuditEntry) {
  if (!value.action.trim() || !value.targetRef.trim())
    throw new Error("Audit action and target are required.");
  return Object.freeze(value);
}
