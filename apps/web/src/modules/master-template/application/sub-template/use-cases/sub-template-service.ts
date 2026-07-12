import type { SubTemplateCatalog } from "../ports/outbound/ports";

export function createSubTemplateService(catalog: SubTemplateCatalog) {
  return {
    list: () => catalog.list(),
    get: (subTemplateId: string) => catalog.find(subTemplateId),
  };
}
