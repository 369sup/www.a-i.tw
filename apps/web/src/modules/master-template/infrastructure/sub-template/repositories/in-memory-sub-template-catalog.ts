import type { SubTemplateCatalog } from "../../../application/sub-template/ports/outbound/ports";
import {
  createSubTemplate,
  type SubTemplate,
} from "../../../domain/sub-template/aggregates/sub-template";

export class InMemorySubTemplateCatalog implements SubTemplateCatalog {
  private readonly items: SubTemplate[];

  constructor(seed: SubTemplate[]) {
    this.items = seed.map(createSubTemplate);
  }

  async list() {
    return [...this.items];
  }

  async find(subTemplateId: string) {
    return this.items.find((item) => item.id === subTemplateId);
  }
}
