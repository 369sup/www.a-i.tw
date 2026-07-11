import { expect, test } from "@playwright/test";

const listPath = "/architecture/master-template/acme/resources";

test("the template workspace renders list, preview, and editor slots together", async ({
  page,
}) => {
  await page.goto("/templates/landing-page");
  await expect(
    page.getByRole("region", { name: "Sub-template list" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Sub-template preview" }),
  ).toContainText("Landing page");
  await expect(
    page.getByRole("region", { name: "Sub-template editor" }),
  ).toBeVisible();
});

test("direct create navigation uses the full page rather than the modal", async ({
  page,
}) => {
  await page.goto(`${listPath}/new`);

  await expect(page.getByText("Master template / full page")).toBeVisible();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
