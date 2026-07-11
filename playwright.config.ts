import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.E2E_PORT ?? "3100");
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `pnpm --filter @a-i/web exec next start --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
