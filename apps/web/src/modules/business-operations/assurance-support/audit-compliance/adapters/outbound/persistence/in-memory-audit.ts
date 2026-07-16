import type { AuditStore } from "../../../application/ports/outbound/audit-store";
import {
  createAuditEntry,
  type AuditEntry,
} from "../../../domain/audit-compliance/entities/audit-entry";

export class InMemoryAuditStore implements AuditStore {
  private readonly items: AuditEntry[];

  constructor(initial: readonly AuditEntry[] = []) {
    this.items = initial.map((entry) => createAuditEntry({ ...entry }));
  }

  async append(value: AuditEntry) {
    const existing = this.items.find((entry) => entry.id === value.id);
    if (existing) {
      if (JSON.stringify(existing) !== JSON.stringify(value)) {
        throw new Error("Audit entry identity conflict.");
      }
      return;
    }
    this.items.push(createAuditEntry({ ...value }));
  }

  async query(input: { actorPrincipalId?: string; action?: string }) {
    return this.items.filter(
      (entry) =>
        (!input.actorPrincipalId ||
          entry.actorPrincipalId === input.actorPrincipalId) &&
        (!input.action || entry.action === input.action),
    );
  }
}
