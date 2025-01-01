import { expect, type Locator, type Page } from "@playwright/test";

export class UniqloCheckoutFormPage {
  kidSectionLink: Locator;
  readonly kidItemSearchButton: Locator;
  selectItemSection: Locator;
  selectItemSectionSecondTime: Locator;
  readonly selectItem: Locator;
  ageButton: Locator;
  readonly shoppingCartButton: Locator;
  readonly viewShoppingCart: Locator;
  readonly checkoutButton: Locator;
  readonly placeHolderName: Location;
  readonly placeHolderLastName: Locator;
  readonly placeHolderPostalCode: Locator;
  readonly placeHolderStreetAndNum: Locator;
  readonly placeHolderApt: Locator;
  readonly placeHolderCity: Locator;
  readonly placeHolderPhone: Locator;
  readonly page: Page;


  constructor(page: Page) {
    this.kidItemSearchButton = page.locator('#bottomNav div').nth(3);
    this.selectItem = page.locator('[data-test="product-card-E476418-000"] a');
    this.shoppingCartButton = page.locator('[data-test="add-to-cart-button"]');
    this.viewShoppingCart = page.locator('[data-test="view-cart-button"]');
    this.checkoutButton = page.locator('[data-test="checkout-button"]');

    this.page = page;
  }

  async clickCheckoutButton() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }

}