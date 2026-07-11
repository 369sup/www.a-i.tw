import type { SubTemplate } from "../domain/sub-template";

export interface SubTemplateCatalog {
  list(): Promise<SubTemplate[]>;
  find(subTemplateId: string): Promise<SubTemplate | undefined>;
}
