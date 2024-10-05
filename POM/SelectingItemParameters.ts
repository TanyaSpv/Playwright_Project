import { expect, type Locator, type Page } from "@playwright/test";

export class UniqloProductDetailPage {
  readonly menSectionLink: Locator;
  readonly menItemSearchBar: Locator;
  itemFilter: Locator;
  itemFilterSecondTime: Locator;
  readonly selectItem: Locator;
  readonly selectColor: Locator;
  selectSize: Locator;
  readonly quantityDropdown: Locator;
  selectQuantity: Locator;
  readonly addItemToTheCart: Locator;
  readonly closeButton: Locator;
  readonly cartLocator: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.menSectionLink = page.getByRole('tab', { name: 'Men', exact: true });
    this.menItemSearchBar = page.getByRole('button').nth(3);
    this.itemFilter = page.getByRole('button', { name: 'SWEATERS & KNITWEAR' })
    this.itemFilterSecondTime = page.getByRole('link', { name: 'Sweaters & Knitwear' })
    this.selectItem = page.locator('a').filter({ hasText: 'Add to wish listColorColorColorColorColorColorColorMenXS-XXLCASHMERE CREW NECK' });
    this.selectColor = page.locator('[data-test="OLIVE"] label');
    this.selectSize = page.locator('[data-test="XL"] label');
    this.quantityDropdown = page.locator('[data-test="quantity-dropdown"]');
    this.selectQuantity = page.getByRole("option", { name: "2" });
    this.addItemToTheCart = page.locator('[data-test="add-to-cart-button"]');
    this.closeButton = page.getByRole("button", { name: "Close" });
    this.cartLocator = page.getByRole('main').locator(`//i[@class='ec-renewal-icon__badge fr-badge']`).first();
    this.page = page;
  }


  async searchForMenItem() {
    //await this.page.waitForTimeout(5000);
    await expect(this.menSectionLink).toBeVisible();
    await this.menSectionLink.click();
  }

  async clickSearchBar() {
    await expect(this.menItemSearchBar).toBeVisible();
    await this.menItemSearchBar.click();

  }

  async clickOnTheSweaterOption(filterType: string) {
    await expect(this.itemFilter).toBeVisible();
    await this.itemFilter.click();
  }

  async clickOnTheSweaterOptionSecondTime(filterType: string) {
    await expect(this.itemFilterSecondTime).toBeVisible();
    await this.itemFilterSecondTime.click();
  }
  async itemSelection() {
    await expect(this.selectItem).toBeVisible();
    await this.selectItem.click();
  }

  async colorSelection() {
    await expect(this.selectColor).toBeVisible();
    await this.selectColor.click();
  }

  async sizeSelection(sizeRange: string) {
    this.selectSize = this.page
      .locator('[data-test="XL"] label')
      .getByText(sizeRange);
    await expect(this.selectSize).toBeVisible();
    await this.selectSize.click();
  }
  async clickDropDown() {
    await expect(this.quantityDropdown).toBeVisible();
    await this.quantityDropdown.click();
  }

  async quantitySelection(quantity: string) {
    this.selectQuantity = this.page.getByRole("option", { name: quantity });
    await expect(this.selectQuantity).toBeVisible();
    await this.selectQuantity.click();
  }

  async addItemToTheShoppingCart() {
    await expect(this.addItemToTheCart).toBeVisible();
    await this.addItemToTheCart.click();
  }

  async clickCloseButton() {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
  }

  async getCartItemCount() {
    await expect(this.cartLocator).toBeVisible();
    const cartText = await this.cartLocator.innerText();  // Get the inner text
    await expect(parseInt(cartText)).toBe(2);  // Parse the text to an integer and compare
  }
  

}
