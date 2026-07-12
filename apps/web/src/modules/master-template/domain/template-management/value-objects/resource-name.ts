export type ResourceNameResult =
  | { ok: true; value: ResourceName }
  | { ok: false; reason: "empty" | "invalid-format" | "reserved" };

const resourceNamePattern = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;
const reservedNames = new Set(["new", "settings", "admin"]);

export class ResourceName {
  private constructor(readonly value: string) {}

  static create(raw: string): ResourceNameResult {
    const normalized = raw.trim().toLowerCase();

    if (normalized.length === 0) return { ok: false, reason: "empty" };
    if (!resourceNamePattern.test(normalized)) {
      return { ok: false, reason: "invalid-format" };
    }
    if (reservedNames.has(normalized)) return { ok: false, reason: "reserved" };

    return { ok: true, value: new ResourceName(normalized) };
  }
}
