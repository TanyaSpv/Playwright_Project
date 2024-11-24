import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { UniqloLoginPage } from "../POM/login";
import { UniqloSearchPage } from "../POM/search";
import { UniqloSortingByPrice } from "../POM/sortingbypricepom";
import { UniqloFilterPage } from "../POM/filtering";
import { UniqloShoppingCartPage } from "../POM/ShoppingCartQuantity";
import { UniqloProductDetailPage } from "../POM/SelectingItemParameters";
import { UniqloProceedToCheckoutPage } from "../POM/ProceedToCheckout";
import { UniqloWishListPage } from "../POM/WishList";
// Read from default ".env" file.
dotenv.config();

test.beforeEach(async ({ page }) => {
  const loginPage = new UniqloLoginPage(page);

  await loginPage.gotoUniqloLogInPage();
  await loginPage.clickToLogIn();
  await loginPage.enterUserName(`${process.env.EMAIL}`);
  await loginPage.enterPassword(`${process.env.PASSWORD}`);
  await loginPage.loginUser();
  await page.goto("https://www.uniqlo.com/ca/en/");
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

  await uniqloSortByPrice.searchItem();
  await uniqloSortByPrice.selectItem();
  await page.waitForTimeout(1000);
  await uniqloSortByPrice.selectSpecificItem();
  await uniqloSortByPrice.clickFilterByPrice();
  await uniqloSortByPrice.filteringOptions();
  await page.waitForTimeout(1000);
  await uniqloSortByPrice.getFirstItemInnerText();
  await uniqloSortByPrice.getLastItemInnerText();
  expect(uniqloSortByPrice.firstTextAmt).toBeLessThanOrEqual(
    uniqloSortByPrice.lastTextAmt
  );
});

test("Selecting womens T-shirts and filtering", async ({ page }) => {
  const uniqloFiltergBySizeAndPrice = new UniqloFilterPage(page);

  await uniqloFiltergBySizeAndPrice.searchItem();
  await uniqloFiltergBySizeAndPrice.selectItemType("T-Shirts, Sweats & Fleece");
  await uniqloFiltergBySizeAndPrice.selectItemSpeciality("T-shirts");
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
  const uniqloSelectingColorSizeAndQuantity = new UniqloProductDetailPage(page);

  await uniqloSelectingColorSizeAndQuantity.searchForMenItem();
  await uniqloSelectingColorSizeAndQuantity.clickSearchBar();
  await uniqloSelectingColorSizeAndQuantity.clickOnTheSweaterOption(
    "SWEATERS & KNITWEAR"
  );
  await uniqloSelectingColorSizeAndQuantity.clickOnTheSweaterOptionSecondTime(
    "SWEATERS & KNITWEAR"
  );
  await uniqloSelectingColorSizeAndQuantity.itemSelection();
  await uniqloSelectingColorSizeAndQuantity.colorSelection();
  await uniqloSelectingColorSizeAndQuantity.sizeSelection("XL");
  await uniqloSelectingColorSizeAndQuantity.clickDropDown();
  await uniqloSelectingColorSizeAndQuantity.quantitySelection("2");
  await uniqloSelectingColorSizeAndQuantity.addItemToTheShoppingCart();
  await uniqloSelectingColorSizeAndQuantity.clickCloseButton();
  await uniqloSelectingColorSizeAndQuantity.getCartItemCount();
});

test("Change the quantity and remove an item in the shopping cart", async ({
  page,
}) => {
  const uniqloChangeQuantity = new UniqloShoppingCartPage(page);

  await test.step(`Add children's pants to cart.`, async () => {
    await uniqloChangeQuantity.chooseApparelCategory("kids");
    await uniqloChangeQuantity.clickSearchButton();
    await uniqloChangeQuantity.selectItemType("Bottoms");
    await uniqloChangeQuantity.selectItemSpeciality("Pants");
    await uniqloChangeQuantity.itemSelection();
    await uniqloChangeQuantity.clickAgeButton();
    await uniqloChangeQuantity.clickDropDown();
    await uniqloChangeQuantity.quantitySelection("2");
    await uniqloChangeQuantity.addItemToTheShoppingCart();
  });

  await test.step(`View the childrens pants in the cart.`, async () => {
    await uniqloChangeQuantity.viewItemInTheShoppingCart();
    await uniqloChangeQuantity.waitForAndClickOkButton();
  });

  await test.step(`Change the quantity of the pants to 2.`, async () => {
    await uniqloChangeQuantity.clickOnNewQuantity();
    await uniqloChangeQuantity.increaseQuantity("2");
  });
});

test("Proceed to checkout", async ({ page }) => {
  const uniqloProceedToCheckout = new UniqloProceedToCheckoutPage(page);

  await test.step(`Add children's shorts to cart.`, async () => {
    await uniqloProceedToCheckout.chooseApparelCategory("kids");
    await uniqloProceedToCheckout.clickSearchButton();
    await uniqloProceedToCheckout.selectItemType("Bottoms");
    await uniqloProceedToCheckout.selectItemSpeciality();
    await uniqloProceedToCheckout.itemSelection();
    await uniqloProceedToCheckout.clickAgeButton();
    await uniqloProceedToCheckout.addItemToTheShoppingCart();
  });

  await test.step(`View the childrens shorts in the cart.`, async () => {
    await uniqloProceedToCheckout.viewItemInTheShoppingCart();
  });

  await test.step(`Proceed to checkout.`, async () => {
    await uniqloProceedToCheckout.clickCheckoutButton();
  });
});

test("Creating and removing wish list", async ({ page }) => {
  const uniqloWishList = new UniqloWishListPage(page);
  await test.step(`Navigate to the bags section.`, async () => {
    await uniqloWishList.navigateToClothingCategory(
      "women",
      "accessories-and-home",
      "bags"
    );
  });

  await test.step(`Wishlist three items.`, async () => {
    await uniqloWishList.clickSortBy();
    await uniqloWishList.addToWishListFirstItem();
    await uniqloWishList.addToWishListSecondItem();
    await uniqloWishList.addToWishListThirdItem();
  });

  await test.step(`Verify items are in wishlist.`, async () => {
    await uniqloWishList.clickWishListButton();
    expect(await uniqloWishList.getWishlistItemCount(), `expected the wishlisted item count to be 3, but is actually ${await uniqloWishList.getWishlistItemCount()}`).toBe(3);
  });

  await test.step(`Unselect the wishlisted items.`, async () => {
    await uniqloWishList.unfavouriteItemsInWishList();
    expect(await uniqloWishList.getWishlistItemCount(), `expected the wishlisted item count to be 0, but is actually ${await uniqloWishList.getWishlistItemCount()}`).toBe(0);
  });
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
