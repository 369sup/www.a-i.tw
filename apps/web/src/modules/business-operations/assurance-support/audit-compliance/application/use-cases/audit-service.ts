import {
  createAuditEntry,
  type AuditEntry,
} from "../../domain/audit-compliance/entities/audit-entry";
import type { AuditStore } from "../ports/outbound/audit-store";

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
