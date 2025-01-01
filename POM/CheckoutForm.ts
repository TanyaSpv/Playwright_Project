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

  async clickSearchButton(){
    await this.kidItemSearchButton.click({force: true});
    await this.page.waitForTimeout(3000); 
  }


  async selectItemType(filteringOption: string = "Bottoms") {
    //getByRole('button', { name: 'Bottoms' })
    this.selectItemSection = this.page.getByRole('button', { name: filteringOption });
    await expect(this.selectItemSection).toBeVisible({ timeout: 5000 });
    await this.selectItemSection.click();
  }

  async selectItemSpeciality(filterOption: string = "Pants") {
    await this.page.waitForTimeout(5000);
    this.selectItemSectionSecondTime = this.page.getByRole('link', { name: filterOption, exact: true });
    await expect(this.selectItemSectionSecondTime).toBeVisible();
    await this.selectItemSectionSecondTime.click();
  }


  async clickAgeButton(ageRange: string = "3-4Y(110)") {
    this.ageButton = this.page.getByRole('img', { name: ageRange });
    await expect(this.ageButton).toBeVisible();
    await this.ageButton.click();
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