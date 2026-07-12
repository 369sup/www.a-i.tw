import {
  createAuditEntry,
  type AuditEntry,
} from "../../../domain/audit/entities/audit-entry";
export interface AuditStore {
  append(value: AuditEntry): Promise<void>;
  query(input: {
    actorPrincipalId?: string;
    action?: string;
  }): Promise<AuditEntry[]>;
}
export function createAuditService(
  store: AuditStore,
  nextId: () => string,
  now: () => Date,
) {
  return {
    query: (input: { actorPrincipalId?: string; action?: string }) =>
      store.query(input),
    async record(input: Omit<AuditEntry, "id" | "occurredAt">) {
      const value = createAuditEntry({
        ...input,
        id: nextId(),
        occurredAt: now().toISOString(),
      });
      await store.append(value);
      return value;
    },
  };
}
