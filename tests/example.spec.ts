import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { UniqloLoginPage } from "../POM/login";
import { UniqloSearchPage } from "../POM/search";
import { UniqloSortingByPrice } from "../POM/sortingbypricepom";
import { UniqloFilterPage } from "../POM/filtering";
import { UniqloShoppingCartPage } from "../POM/ShoppingCartQuantity";

// Read from default ".env" file.
dotenv.config();

test.beforeEach(async ({ page }) => {
  const loginPage = new UniqloLoginPage(page);

  await loginPage.goto();
  await loginPage.manageModal();
  await loginPage.clickToLogIn();
  await loginPage.enterUserName(`${process.env.EMAIL}`);
  await loginPage.enterPassword(`${process.env.PASSWORD}`);
  await loginPage.loginUser();
});

test("searching for a hat", async ({ page }) => {
  const searchPage = new UniqloSearchPage(page);

  await searchPage.searchItem();
  await searchPage.fillItem("hats");
  await searchPage.pressEnterButton();
  await page.waitForLoadState();
  expect(searchPage.isItemFound()).toBeTruthy();
});

test("Selecting womens T-shirts and sorting them by price", async ({
  page,
}) => {
  const uniqloSortByPrice = new UniqloSortingByPrice(page);

  await uniqloSortByPrice.selectGenderOption("women");
  await uniqloSortByPrice.sortByItem();
  await page.waitForTimeout(1000);
  await uniqloSortByPrice.filteringItem(false);
  await page.waitForTimeout(1000);
  await uniqloSortByPrice.getFirstItemInnerText();
  await uniqloSortByPrice.getLastItemInnerText();
  expect(uniqloSortByPrice.firstTextAmt).toBeLessThanOrEqual(
    uniqloSortByPrice.lastTextAmt
  );
});

test("Selecting womens T-shirts and filtering", async ({ page }) => {
  const uniqloFiltergBySizeAndPrice = new UniqloFilterPage(page);

  await uniqloFiltergBySizeAndPrice.selectGenderOption("women");
  await uniqloFiltergBySizeAndPrice.clickOnItemFilter();
  await uniqloFiltergBySizeAndPrice.clickOnFilterBySize();
  await uniqloFiltergBySizeAndPrice.clickOnFilterBySpecificSize("M");
  await uniqloFiltergBySizeAndPrice.clickOnFilterByColor();
  await uniqloFiltergBySizeAndPrice.clickOnFilterBySpecificColor("WHITE");
  await uniqloFiltergBySizeAndPrice.clickOnFilterByPrice();
  await uniqloFiltergBySizeAndPrice.clickOnFilterBySize();
  await uniqloFiltergBySizeAndPrice.clickOnFilterBySpecificPrice("$20 - $");
  await uniqloFiltergBySizeAndPrice.sizeFilterOptionSelected("XXS-XXL");
  expect(uniqloFiltergBySizeAndPrice.sizeFilterSelected).toContainText(
    "XXS-XXL"
  );
  await uniqloFiltergBySizeAndPrice.priceFilterOptionSelected("$20 - $");
  expect(
    await uniqloFiltergBySizeAndPrice.priceFilterSelected.isChecked()
  ).toBe(true);
  await uniqloFiltergBySizeAndPrice.clearAllSelections();
});

test("Selecting color,size,quantity on the Product Detail Page and adding to the cart", async ({
  page,
}) => {
  test.slow();
  expect(
    page.locator('[data-test="men-navItem"]').getByRole("link", { name: "men" })
  ).toBeVisible();
  await page
    .locator('[data-test="men-navItem"]')
    .getByRole("link", { name: "men" })
    .hover();

  expect(
    page
      .locator("a")
      .filter({ hasText: /^Sweaters$/ })
      .first()
  ).toBeVisible();
  await page
    .locator("a")
    .filter({ hasText: /^Sweaters$/ })
    .first()
    .click();

  expect(
    page
      .locator('[data-test="product-card-E453754-000"]')
      .getByRole("link", { name: "Favorite WASHABLE MILANO" })
  ).toBeVisible();
  await page
    .locator('[data-test="product-card-E453754-000"]')
    .getByRole("link", { name: "Favorite WASHABLE MILANO" })
    .click();

  expect(page.locator('[data-test="OLIVE"] label')).toBeVisible();
  await page.locator('[data-test="OLIVE"] label').click();

  expect(page.locator('[data-test="XL"] label')).toBeVisible();
  await page.locator('[data-test="XL"] label').click();

  expect(page.locator('[data-test="quantity-dropdown"]')).toBeVisible();
  await page.locator('[data-test="quantity-dropdown"]').click();

  expect(page.getByRole("option", { name: "2" })).toBeVisible();
  await page.getByRole("option", { name: "2" }).click();

  expect(page.locator('[data-test="add-to-cart-button"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-button"]').click();

  expect(page.getByRole("button", { name: "Close" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();

  expect(page.locator("//i[@class='fr-badge']")).toBeVisible();
  const cartItemCount = parseInt(
    await page.locator("//i[@class='fr-badge']").innerText()
  );
  expect(cartItemCount).toBeGreaterThan(1);
});

test("Change the quantity and remove an item in the shopping cart", async ({
  page,
}) => {
  const uniqloChangeQuantity = new UniqloShoppingCartPage(page);

  await uniqloChangeQuantity.searchForKidsItem();
  await uniqloChangeQuantity.filterProduct("Shorts");
  await uniqloChangeQuantity.itemSelection();
  await uniqloChangeQuantity.clickAgeButton();
  await uniqloChangeQuantity.ageSelection("-8Y(130)");
  await uniqloChangeQuantity.clickDropDown();
  await uniqloChangeQuantity.quantitySelection("2");
  await uniqloChangeQuantity.addItemToTheShoppingCart();
  await uniqloChangeQuantity.viewItemInTheShoppingCart();
  await uniqloChangeQuantity.waitForAndClickOkButton();
  await uniqloChangeQuantity.clickOnNewQuantity();
  await uniqloChangeQuantity.increaseQuantity("2");
});

test("Proceed to checkout and fill out the form", async ({ page }) => {
  test.slow();
  await expect(page.getByRole("link", { name: "kids" })).toBeVisible();
  await page.getByRole("link", { name: "kids" }).hover();

  await expect(
    page.locator("a").filter({ hasText: "Shorts" }).first()
  ).toBeVisible();
  await page.locator("a").filter({ hasText: "Shorts" }).first().click();

  await expect(
    page.locator('[data-test="product-card-E470711-000"] a')
  ).toBeVisible();
  await page.locator('[data-test="product-card-E470711-000"] a').click();

  // adding age
  await expect(
    page.locator('[data-test="\\37 -8Y\\(130\\)"]').getByText("-8Y(130)")
  ).toBeVisible();
  await page
    .locator('[data-test="\\37 -8Y\\(130\\)"]')
    .getByText("-8Y(130)")
    .click();

  await expect(page.locator('[data-test="quantity-dropdown"]')).toBeVisible();
  await page.locator('[data-test="quantity-dropdown"]').click();

  await expect(page.getByRole("option", { name: "1" })).toBeVisible();
  await page.getByRole("option", { name: "1" });

  await expect(page.locator('[data-test="add-to-cart-button"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-button"]').click();

  await expect(page.locator('[data-test="view-cart-button"]')).toBeVisible();
  await page.locator('[data-test="view-cart-button"]').click();

  await page.waitForTimeout(5000);

  if ((await page.getByRole("button", { name: "OK" }).count()) > 0) {
    await page.getByRole("button", { name: "OK" }).click();
  }

  await expect(page.locator('[data-test="checkout-button"]')).toBeVisible();
  await page.locator('[data-test="checkout-button"]').click();

  await page.waitForTimeout(5000);
});

test.fixme("Creating and removing wish list", async ({ page }) => {
  test.slow();
  expect(page.getByRole("link", { name: "women" })).toBeVisible();
  await page.getByRole("link", { name: "women" }).hover();

  expect(
    page.locator("a").filter({ hasText: "New Arrivals" }).first()
  ).toBeVisible();
  await page.locator("a").filter({ hasText: "New Arrivals" }).first().click();

  expect(
    page
      .locator('[data-test="product-card-E475462-000"]')
      .getByRole("button", { name: "Favorite" })
  ).toBeVisible();
  await page
    .locator('[data-test="product-card-E475462-000"]')
    .getByRole("button", { name: "Favorite" })
    .click();

  expect(
    page
      .locator('[data-test="product-card-E469863-000"]')
      .getByRole("button", { name: "Favorite" })
  ).toBeVisible();
  await page
    .locator('[data-test="product-card-E469863-000"]')
    .getByRole("button", { name: "Favorite" })
    .click();

  expect(
    page
      .locator('[data-test="product-card-E469425-000"]')
      .getByRole("link", { name: "Favorite SOFT FLANNEL SKIPPER" })
  ).toBeVisible();
  await page
    .locator('[data-test="product-card-E469425-000"]')
    .getByRole("link", { name: "Favorite SOFT FLANNEL SKIPPER" })
    .click();

  expect(page.locator('[data-test="add-to-wishlist-link"] a')).toBeVisible();
  await page.locator('[data-test="add-to-wishlist-link"] a').click();

  expect(page.getByRole("link", { name: "Wish list" })).toBeVisible();
  await page.getByRole("link", { name: "Wish list" }).click();

  await page.waitForTimeout(5000);
  // Assuming 'page' is your Playwright page object

  // Select the wishlist items
  // Select all wishlist items using a selector
  const wishlistItems = await page.$$(
    ".fr-product-card.list.list-for-wishlist"
  );

  // Assert that the number of wishlist items is 3
  expect(wishlistItems.length).toBe(3);

  expect(
    page
      .getByRole("link", { name: "Favorite Image not found SOFT" })
      .getByRole("button")
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Favorite Image not found SOFT" })
    .getByRole("button")
    .click();

  await page.waitForTimeout(5000);

  expect(
    page
      .getByRole("link", {
        name: "Favorite Image not found PUFFTECH COMPACT VEST Product ID: 469863 Color: 32",
      })
      .getByRole("button")
  ).toBeVisible();
  await page
    .getByRole("link", {
      name: "Favorite Image not found PUFFTECH COMPACT VEST Product ID: 469863 Color: 32",
    })
    .getByRole("button")
    .click();

  await page.waitForTimeout(5000);

  expect(
    page
      .getByRole("link", {
        name: "Favorite Image not found KNITTED SHORT STRIPED JACKET Product ID: 475462 Color: 09 BLACK Size: Women New CAD $",
      })
      .getByRole("button")
  ).toBeVisible();
  await page
    .getByRole("link", {
      name: "Favorite Image not found KNITTED SHORT STRIPED JACKET Product ID: 475462 Color: 09 BLACK Size: Women New CAD $",
    })
    .getByRole("button")
    .click();

  // Find the element that contains the text 'Your wish list has no items.'
  const emptyWishlistText = await page.getByText(
    "Your wish list has no items."
  );

  // Assert that the element exists, indicating the wishlist is empty
  expect(emptyWishlistText).not.toBeNull();
});

test.fixme("Fill out the checkout form", async ({ page }) => {
  test.slow();

  //TODO: Get to checkout form to fill out.

  await expect(
    page.getByPlaceholder("Please enter your first name")
  ).toBeVisible();
  await page
    .getByPlaceholder("Please enter your first name")
    .scrollIntoViewIfNeeded();
  await page.getByPlaceholder("Please enter your first name").fill("John");

  await page.waitForTimeout(2000);

  await expect(
    page.getByPlaceholder("Please enter your last name (")
  ).toBeVisible();
  await page.getByPlaceholder("Please enter your last name").fill("Doe");

  await page.waitForTimeout(2000);

  await expect(
    page.getByPlaceholder("Please enter your Canadian")
  ).toBeVisible();
  await page.getByPlaceholder("Please enter your Canadian").fill("E1C1B2");

  await page.waitForTimeout(2000);

  await expect(page.getByPlaceholder("Street and number, c/o.")).toBeVisible();
  await page
    .getByPlaceholder("Street and number, c/o.")
    .fill("Albert Street 118");

  await page.waitForTimeout(2000);

  await expect(page.getByPlaceholder("Apt, suite/unit, floor,")).toBeVisible();
  await page
    .getByPlaceholder("Street and number, c/o.")
    .fill("Apt 25, second floor");

  await page.waitForTimeout(2000);

  await expect(page.getByPlaceholder("Please enter your city.")).toBeVisible();
  await page.getByPlaceholder("Please enter your city.").fill("Moncton");

  await page.waitForTimeout(2000);

  await expect(page.getByPlaceholder("Please enter your phone")).toBeVisible();
  await page.getByPlaceholder("Please enter your phone").fill("7052541867");

  await page.waitForTimeout(2000);

  await expect(
    page.locator("label").filter({ hasText: "Please confirm that the" })
  ).toBeVisible();

  await page.waitForTimeout(2000);

  await page
    .locator("label")
    .filter({ hasText: "Please confirm that the" })
    .check();

  await page.waitForTimeout(2000);

  await expect(
    page.locator("label").filter({ hasText: "Please confirm that the" })
  ).toBeChecked();

  if (
    (await page
      .locator("label")
      .filter({ hasText: "Use as billing address" })
      .count()) > 0
  ) {
    await page
      .locator("label")
      .filter({ hasText: "Use as billing address" })
      .check();
    await expect(
      page.locator("label").filter({ hasText: "Use as billing address" })
    ).toBeChecked();
  }

  await page.waitForTimeout(2000);
});

test("Continue to payment and fill out the form", async ({ page }) => {
  test.slow();
  await expect(page.getByRole("link", { name: "kids" })).toBeVisible();
  await page.getByRole("link", { name: "kids" }).hover();

  await expect(
    page.locator("a").filter({ hasText: "Shorts" }).first()
  ).toBeVisible();
  await page.locator("a").filter({ hasText: "Shorts" }).first().click();

  await expect(
    page.locator('[data-test="product-card-E470711-000"] a')
  ).toBeVisible();
  await page.locator('[data-test="product-card-E470711-000"] a').click();

  // adding age
  await expect(
    page.locator('[data-test="\\37 -8Y\\(130\\)"]').getByText("-8Y(130)")
  ).toBeVisible();
  await page
    .locator('[data-test="\\37 -8Y\\(130\\)"]')
    .getByText("-8Y(130)")
    .click();

  await expect(page.locator('[data-test="quantity-dropdown"]')).toBeVisible();
  await page.locator('[data-test="quantity-dropdown"]').click();

  await expect(page.getByRole("option", { name: "1" })).toBeVisible();
  await page.getByRole("option", { name: "1" });

  await expect(page.locator('[data-test="add-to-cart-button"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-button"]').click();

  await expect(page.locator('[data-test="view-cart-button"]')).toBeVisible();
  await page.locator('[data-test="view-cart-button"]').click();

  await page.waitForTimeout(5000);

  if ((await page.getByRole("button", { name: "OK" }).count()) > 0) {
    await page.getByRole("button", { name: "OK" }).click();
  }

  await expect(page.locator('[data-test="checkout-button"]')).toBeVisible();
  await page.locator('[data-test="checkout-button"]').click();

  await page.waitForTimeout(5000);
  await page
    .locator('[data-test="continue-to-payment-button"]')
    .scrollIntoViewIfNeeded();
  await expect(
    page.locator('[data-test="continue-to-payment-button"]')
  ).toBeVisible();
  await page.locator('[data-test="continue-to-payment-button"]').click();
  await expect(
    page.locator('[data-test="continue-to-payment-button"]')
  ).toBeVisible();
  await page.locator('[data-test="continue-to-payment-button"]').click();

  await page.waitForTimeout(5000);

  await expect(
    page
      .frameLocator('iframe[title="Iframe for secured card number"]')
      .getByLabel("Card number field")
  ).toBeVisible();
  await page
    .frameLocator('iframe[title="Iframe for secured card number"]')
    .getByLabel("Card number field")
    .fill(faker.finance.creditCardNumber());

  await expect(
    page
      .frameLocator('iframe[title="Iframe for secured card expiry date"]')
      .getByPlaceholder("MM/YY")
  ).toBeVisible();
  await page
    .frameLocator('iframe[title="Iframe for secured card expiry date"]')
    .getByPlaceholder("MM/YY")
    .fill("09/26");

  await expect(
    page
      .frameLocator('iframe[title="Iframe for secured card security code"]')
      .getByPlaceholder("digits")
  ).toBeVisible();
  await page
    .frameLocator('iframe[title="Iframe for secured card security code"]')
    .getByPlaceholder("digits")
    .fill("2567");

  await expect(page.getByLabel("Full name")).toBeVisible();
  await page.getByLabel("Full name").fill("John Doe");
});

test.afterEach(async ({ page }) => {
  if (!(await page.url().includes("cart"))) {
    await page.goto("https://www.uniqlo.com/ca/en/cart/");
  }
  if ((await page.locator(".fr-btn.primary.w4-f").last().count()) > 1) {
    await page.locator(".fr-btn.primary.w4-f").last().click();
  }
  while ((await page.locator('[data-test="remove-item-button"]').count()) > 0) {
    const removeButtons = await page.locator(
      '[data-test="remove-item-button"]'
    );
    for (let i = 0; i < (await removeButtons.count()); i++) {
      await expect(removeButtons.nth(i)).toBeVisible();
      await removeButtons.nth(i).click();

      await expect(page.getByRole("button", { name: "Remove" })).toBeVisible();
      await page.getByRole("button", { name: "Remove" }).click();
    }
  }
});
