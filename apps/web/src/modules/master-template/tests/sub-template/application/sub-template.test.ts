import { describe, expect, it } from "vitest";
import { createSubTemplateService } from "../../../application/sub-template/use-cases/sub-template-service";
import { InMemorySubTemplateCatalog } from "../../../infrastructure/sub-template/repositories/in-memory-sub-template-catalog";

describe("sub-template supporting subdomain", () => {
  it("lists and resolves catalog entries through its application port", async () => {
    const service = createSubTemplateService(
      new InMemorySubTemplateCatalog([
        {
          id: "release-notes",
          title: "Release notes",
          content: "# Notes",
          status: "active",
        },
      ]),
    );

    await expect(service.list()).resolves.toHaveLength(1);
    await expect(service.get("release-notes")).resolves.toMatchObject({
      title: "Release notes",
    });
  });
});
