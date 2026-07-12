import { createSubTemplateService } from "../application/sub-template/use-cases/sub-template-service";
import type { SubTemplateCatalog } from "../application/sub-template/ports/outbound/ports";

export function createSubTemplateModule(catalog: SubTemplateCatalog) {
  return createSubTemplateService(catalog);
}
