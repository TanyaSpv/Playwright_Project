import { expect, type Locator, type Page } from "@playwright/test";

export class UniqloShoppingCartPage {
  readonly kidSectionLink: Locator;
  itemFilter: Locator;
  readonly selectItem: Locator;
  readonly ageButton: Locator;
  selectAge: Locator;
  readonly dropDownButton: Locator;
  readonly clickQuantity: Locator;
  selectQuantity: Locator;
  readonly shoppingCartButton: Locator;
  readonly viewShoppingCart: Locator;
  readonly okButton: Locator;
  readonly clickQuantityButton: Locator;
  changeQuantity: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.kidSectionLink = page.getByRole("link", { name: "kids" });
    this.selectItem = page.locator('[data-test="product-card-E470711-000"] a');
    this.ageButton = page.locator('[data-test="product-card-E470711-000"] a');
    this.dropDownButton = page.locator('[data-test="quantity-dropdown"]');
    this.shoppingCartButton = page.locator('[data-test="add-to-cart-button"]');
    this.viewShoppingCart = page.locator('[data-test="view-cart-button"]');
    this.okButton = page.locator('[data-test="ok-button"]');
    this.clickQuantityButton = page.locator('[data-test="quantity"]').first();

    this.page = page;
  }

  async searchForKidsItem() {
    await this.page.waitForTimeout(5000);
    await expect(this.kidSectionLink).toBeVisible();
    await this.kidSectionLink.hover();
  }

  async filterProduct(filterType: string) {
    this.itemFilter = this.page
      .locator("a")
      .filter({ hasText: filterType })
      .first();
    await expect(this.itemFilter).toBeVisible();
    await this.itemFilter.click();
  }

  async itemSelection() {
    await expect(this.selectItem).toBeVisible();
    await this.selectItem.click();
  }

  async clickAgeButton() {
    await expect(this.ageButton).toBeVisible();
    await this.ageButton.click();
  }

  async ageSelection(ageRange: string) {
    this.selectAge = this.page
      .locator('[data-test="\\37 -8Y\\(130\\)"]')
      .getByText(ageRange);
    await expect(this.selectAge).toBeVisible();
    await this.selectAge.click();
  }
  async clickDropDown() {
    await expect(this.dropDownButton).toBeVisible();
    await this.dropDownButton.click();
  }

  async quantitySelection(quantity: string) {
    this.selectQuantity = this.page.getByRole("option", { name: quantity });
    await expect(this.selectQuantity).toBeVisible();
    await this.selectQuantity.click();
  }

  async addItemToTheShoppingCart() {
    await expect(this.shoppingCartButton).toBeVisible();
    await this.shoppingCartButton.click();
  }

  async viewItemInTheShoppingCart() {
    await expect(this.viewShoppingCart).toBeVisible();
    await this.viewShoppingCart.click();
  }

  async waitForAndClickOkButton() {
    await this.page.waitForTimeout(1500);
    if ((await this.okButton.count()) > 0) await this.okButton.click();
  }

  async clickOnNewQuantity() {
    await expect(this.clickQuantityButton).toBeVisible();
    await this.clickQuantityButton.click();
  }

  async increaseQuantity(quantity: string) {
    this.changeQuantity = this.page
      .locator('[data-test="quantity-options"]')
      .getByText(quantity);
    await expect(this.changeQuantity).toBeVisible();
    await this.changeQuantity.click();
  }
}
