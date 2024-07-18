import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('has title', async ({ page }) => {
  await page.goto('https://sephora.ca/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sephora/);
});

test('navigate to registration page', async ({ page }) => {
  await page.goto('https://www.sephora.com/ca/en/');

  await page.getByRole('button', { name: 'Sign In for FREE Shipping 🚚' }).click();

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.locator("#email")).toBeVisible();

  await page.locator("#email").fill(faker.internet.email());

  await page.locator(".css-1eg024x.eanm77i0").click();
});
