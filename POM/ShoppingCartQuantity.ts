import { expect, type Locator, type Page } from "@playwright/test";

export class UniqloShoppingCartPage {
  kidSectionLink: Locator;
  kidItemSearchButton: Locator;
  selectItemSection: Locator;
  selectItemSectionSecondTime: Locator;
  readonly selectItem: Locator;
  ageButton: Locator;
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
    this.kidItemSearchButton = page.getByRole('button').nth(3);
    this.selectItemSection = page.getByRole('button', { name: 'BOTTOMS' });
    this.selectItemSectionSecondTime = page.getByRole('link', { name: 'Pants', exact: true });
    this.selectItem = page.locator('[data-test="product-card-E474573-000"]').getByRole('link', { name: 'Favorite PILE LINED SWEAT' })
    
    this.dropDownButton = page.locator('[data-test="quantity-dropdown"]');
    this.shoppingCartButton = page.locator('[data-test="add-to-cart-button"]');
    this.viewShoppingCart = page.locator('[data-test="view-cart-button"]');
    this.okButton = page.locator('[data-test="ok-button"]');
    this.clickQuantityButton = page.locator('[data-test="quantity"]').first();

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

  async selectItemSpeciality(filterOption: string) {
    this.selectItemSectionSecondTime = this.page.getByRole('link', { name: filterOption, exact: true });
    await expect(this.selectItemSectionSecondTime).toBeVisible();
    await this.selectItemSectionSecondTime.click();
  }


  async itemSelection() {
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
