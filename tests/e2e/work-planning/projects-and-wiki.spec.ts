import { expect, test } from "@playwright/test";

async function signIn(page: import("@playwright/test").Page) {
  await page.goto("/sign-in");
  await page.getByLabel("Login").fill("admin");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

test("publishes a Wiki Page and creates a Project with a Draft Item", async ({
  page,
}) => {
  await signIn(page);
  const suffix = Date.now().toString(36);

  await page.goto("/repositories?repository=repository-notes");
  await page.getByLabel("Page ID").fill(`prototype-${suffix}`);
  await page.getByLabel("Page title").fill(`Prototype ${suffix}`);
  await page.getByLabel("Page content").fill("Verified Wiki content");
  await page.getByRole("button", { name: "Publish Wiki Page" }).click();
  await expect(
    page.getByText(`Prototype ${suffix}`, { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Verified Wiki content", { exact: true }),
  ).toBeVisible();

  await page.goto("/projects");
  const title = `Launch plan ${suffix}`;
  const draftTitle = `Validate rollout ${suffix}`;

  await page.getByRole("button", { name: "Create Project" }).click();
  expect(
    await page
      .getByLabel("Project title")
      .evaluate((input: HTMLInputElement) => input.validity.valueMissing),
  ).toBe(true);

  await page.getByLabel("Project title").fill(title);
  await page.getByRole("button", { name: "Create Project" }).click();
  const project = page.getByLabel(`Project ${title}`);
  await expect(project).toBeVisible();

  await project.getByLabel("Draft title").fill(draftTitle);
  await project.getByLabel("Draft body").fill("State transition evidence");
  await project.getByRole("button", { name: "Add Draft Item" }).click();
  await expect(project.getByText(draftTitle, { exact: true })).toBeVisible();
  await expect(
    project.getByText("State transition evidence", { exact: true }),
  ).toBeVisible();

  await page.reload();
  await expect(page.getByText(draftTitle, { exact: true })).toBeVisible();
});
