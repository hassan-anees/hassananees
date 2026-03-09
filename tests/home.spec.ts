import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Hassan Anees/);
});

test("home page has navigation links", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /work/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /writing/i }).first()).toBeVisible();
});
