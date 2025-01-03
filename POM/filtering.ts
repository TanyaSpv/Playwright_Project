import { expect, type Locator, type Page } from "@playwright/test";

export class UniqloFilterPage {
  searchButton: Locator;
  selectingOption: Locator;
  selectingOptionSecondTime: Locator;
  readonly itemFilterSize: Locator;
  itemFilterSizeM: Locator;
  readonly itemFilterColor: Locator;
  itemFilterColorChoice: Locator;
  readonly itemFilterPrice: Locator;
  itemFilterPriceFrom20$: Locator;
  readonly sizeFilterSelected: Locator;
  readonly priceFilterSelected: Locator;
  readonly filterClear: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.searchButton = page.getByRole('button').nth(3);
    this.itemFilterSize = page.locator('li').filter({ hasText: 'Size' }).locator('div');
    this.itemFilterColor = page.locator('li').filter({ hasText: 'Color' }).locator('div');
    this.itemFilterPrice = page.locator('li').filter({ hasText: 'Price' }).locator('div');
    this.sizeFilterSelected = page.locator(".fr-flitem.col6.right").nth(1);
    this.priceFilterSelected = page
      .locator("label")
      .filter({ hasText: "$20 - $" });
    this.filterClear = page.locator('[data-test="filters-clear"]');
    this.page = page;
  }

  

  async selectItemType(filteringOption: string) {
    this.selectingOption = this.page.getByRole('button', { name: filteringOption });
    await expect(this.selectingOption).toBeVisible();
    await this.selectingOption.click();
  }

  async selectItemSpeciality(filterOption: string) {
    this.selectingOptionSecondTime = this.page.getByRole('link', { name: filterOption, exact: true });
    await expect(this.selectingOptionSecondTime).toBeVisible();
    await this.selectingOptionSecondTime.click();
  }

  async clickOnFilterBySize() {
    await this.itemFilterSize.click();
  }

  async clickOnFilterBySpecificSize(size: string) {
    const sizeLocator = this.page.locator('span').filter({ hasText: new RegExp(`^${size}$`) }).first();
    await sizeLocator.click({force: true});
  }
  async clickOnFilterByColor() {
    await this.itemFilterColor.click();
  }

  async clickOnFilterBySpecificColor(color: string) {
    this.itemFilterColorChoice = this.page.locator(`#utilityBarER [data-test="filter-${color.toUpperCase()}"] label`)

    await this.itemFilterColorChoice.click();
  }

  async clickOnFilterByPrice() {
    await this.itemFilterPrice.click();
  }

  async clickOnFilterBySpecificPrice(price: string) {
    this.itemFilterPriceFrom20$ = this.page.locator('#utilityBarER').getByText(price)
    this.itemFilterPriceFrom20$.click({force: true});
  }

  async sizeFilterOptionSelected(size: string) {
    await expect(this.sizeFilterSelected).toBeVisible(); // Assertion to check visibility
    await expect(this.sizeFilterSelected).toContainText(size); // Assertion to check text
  }

  async priceFilterOptionSelected(price: string) {
    await expect(this.priceFilterSelected).toBeVisible(); // Assertion to check visibility
    await expect(this.priceFilterSelected).toContainText(price); // Assertion to check text
  }

  async clearAllSelections() {
    return this.filterClear.click();
  }
}
