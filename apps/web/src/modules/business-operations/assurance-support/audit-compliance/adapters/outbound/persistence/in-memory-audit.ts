import type { AuditStore } from "../../../application/use-cases/audit-service";
import type { AuditEntry } from "../../../domain/audit-compliance/entities/audit-entry";
export class InMemoryAuditStore implements AuditStore {
  private readonly items: AuditEntry[] = [];
  async append(v: AuditEntry) {
    this.items.push(v);
  }
  async query(i: { actorPrincipalId?: string; action?: string }) {
    return this.items.filter(
      (x) =>
        (!i.actorPrincipalId || x.actorPrincipalId === i.actorPrincipalId) &&
        (!i.action || x.action === i.action),
    );
  }
}
