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


  async chooseApparelCategory(category: string) {
    this.kidSectionLink = this.page.getByRole('tab', { name: category });
    await this.page.waitForTimeout(5000);
    await expect(this.kidSectionLink).toBeVisible();
    await this.kidSectionLink.click();
  }

  async clickSearchButton(){
    this.kidItemSearchButton = this.page.getByRole('button').nth(3);
    await this.kidItemSearchButton.click({force: true});
  }


  async selectItemType(filteringOption: string = "Bottoms") {
    this.selectItemSection = this.page.getByRole('button', { name: filteringOption });
    await expect(this.selectItemSection).toBeVisible();
    await this.selectItemSection.click();
  }

  async selectItemSpeciality(filterOption: string = "Shorts") {
    await this.page.waitForTimeout(5000);
    this.selectItemSectionSecondTime = this.page.getByRole('link', { name: filterOption, exact: true });
    await expect(this.selectItemSectionSecondTime).toBeVisible();
    await this.selectItemSectionSecondTime.click();
  }


  async itemSelection() {
    await this.page.waitForTimeout(10000);
    await expect(this.selectItem).toBeVisible();
    await this.selectItem.click();
  }

  async clickAgeButton(ageRange: string = "3-4Y(110)") {
    this.ageButton = this.page.getByRole('img', { name: ageRange });
    await expect(this.ageButton).toBeVisible();
    await this.ageButton.click();
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

  async clickCheckoutButton() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }

}