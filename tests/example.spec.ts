import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

// Read from default ".env" file.
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.uniqlo.com/ca/en/");
  await page.waitForTimeout(3000);
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "Login" }).click();
  await page
    .getByPlaceholder("Enter a valid email")
    .fill(`${process.env.EMAIL}`);
  await page
    .getByLabel("Password Password must be at")
    .fill(`${process.env.PASSWORD}`);
  await page.locator('[data-test="login-button"]').click();
});

test("searching for a hat", async ({ page }) => {
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByPlaceholder("Search by keyword").fill("hats");

  await page.keyboard.press("Enter");
  await page.waitForLoadState();
  await expect(
    page.getByRole("link", { name: "CASHMERE KNITTED BEANIE" })
  ).toBeVisible();
});

test("Selecting womens T-shirts and filtering and sorting them", async ({
  page,
}) => {
  await page.getByRole("link", { name: "women" }).hover();
  await page
    .locator("a")
    .filter({ hasText: /^T-shirts$/ })
    .first()
    .click();
  await page.locator('[data-test="sort-by"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole("option", { name: "Price: Low to high" }).click();
  await page.waitForTimeout(1000);
  var firstItemElement = await page
    .locator(
      `//article[contains(@class, 'fr-grid-item w4')]//div[@class='price fr-no-uppercase']`
    )
    .first()
    .allInnerTexts();
  var lastItemElement = await page
    .locator(
      `//article[contains(@class, 'fr-grid-item w4')]//div[@class='price fr-no-uppercase']`
    )
    .last()
    .allInnerTexts();

  // Step 1: Remove non-digit and non-dot characters
  var cleanedString = firstItemElement[0].replace(/[^\d.]/g, "");

  // Step 2: Parse the cleaned string as a floating-point number
  var firstItemValue = parseFloat(cleanedString);

  cleanedString = lastItemElement[0].replace(/[^\d.]/g, "");
  var lastItemValue = parseFloat(cleanedString);

  expect(firstItemValue).toBeLessThanOrEqual(lastItemValue);
});
