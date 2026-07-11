import { createSubTemplateService } from "./application/sub-template-service";
import type { SubTemplateCatalog } from "./application/ports";

export function createSubTemplateModule(catalog: SubTemplateCatalog) {
  return createSubTemplateService(catalog);
}
