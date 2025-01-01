import { expect, type Locator, type Page } from "@playwright/test";

export class UniqloProceedToCheckoutPage {
  kidSectionLink: Locator;
  kidItemSearchButton: Locator;
  selectItemSection: Locator;
  selectItemSectionSecondTime: Locator;
  readonly selectItem: Locator;
  ageButton: Locator;
  readonly dropDownButton: Locator;
  selectQuantity: Locator;
  readonly shoppingCartButton: Locator;
  readonly viewShoppingCart: Locator;
  readonly checkoutButton: Locator;
  readonly page: Page;


  constructor(page: Page) {
    this.kidItemSearchButton = page.getByRole('button').nth(3);
    this.selectItem = page.getByRole('link', { name: 'DENIM MINI SKORT Color Color' })
    this.dropDownButton = page.locator('[data-test="quantity-dropdown"]');
    this.shoppingCartButton = page.locator('[data-test="add-to-cart-button"]');
    this.viewShoppingCart = page.locator('[data-test="view-cart-button"]');
    this.checkoutButton = page.locator('[data-test="checkout-button"]');

    this.page = page;
  }

  async viewItemInTheShoppingCart() {
    await expect(this.viewShoppingCart).toBeVisible();
    await this.viewShoppingCart.click();
  }

  async clickCheckoutButton() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }

}