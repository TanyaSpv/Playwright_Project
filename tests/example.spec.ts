import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
const stealth = require('puppeteer-extra-plugin-stealth')();
const { chromium } = require('playwright-extra');

// Load the stealth plugin and use defaults
chromium.use(stealth);

// Read from default ".env" file.
dotenv.config();


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.uniqlo.com/ca/en/');
  await page.waitForTimeout(3000);
  await page.keyboard.press("Escape");
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter a valid email').fill(`${process.env.EMAIL}`);
  await page.getByLabel('Password Password must be at').fill(`${process.env.PASSWORD}`);
  await page.locator('[data-test="login-button"]').click();
});

test('searching for a keyboard', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search by keyword').fill('hats');

  await page.keyboard.press("Enter");
  await page.waitForLoadState();
  await expect(page.getByRole('link', { name: 'CASHMERE KNITTED BEANIE' })).toBeVisible();
});
