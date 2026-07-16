import type { AuditEntry } from "../../../domain/audit-compliance/entities/audit-entry";

export interface AuditStore {
  append(value: AuditEntry): Promise<void>;
  query(input: {
    actorPrincipalId?: string;
    action?: string;
  }): Promise<AuditEntry[]>;
}
