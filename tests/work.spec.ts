import { test, expect } from "@playwright/test";

test("work page loads with both sections", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { name: "Industry", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Research", exact: true })).toBeVisible();
});

test("industry items are ordered newest first", async ({ page }) => {
  await page.goto("/work");
  const industry = page.locator("#industry h2");
  await expect(industry.first()).toHaveText("Security Engineer");
  await expect(industry.last()).toHaveText("Software Engineer");
});

test("research items are ordered newest first", async ({ page }) => {
  await page.goto("/work");
  const research = page.locator("#research h2");
  await expect(research.first()).toHaveText("Social Engineering and Enhancing Detection Methods");
  await expect(research.last()).toHaveText("Rural-Suicide Study Codebook");
});
