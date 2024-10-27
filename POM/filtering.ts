import { expect, type Locator, type Page } from "@playwright/test";

export class UniqloFilterPage {
  searchButton: Locator;
  selectingOption: Locator;
  selectingOptionSecondTime: Locator;
  readonly itemFilterSize: Locator;
  itemFilterSizeM: Locator;
  readonly itemFilterColor: Locator;
  itemFilterColorWhite: Locator;
  readonly itemFilterPrice: Locator;
  itemFilterPriceFrom20$: Locator;
  readonly sizeFilterSelected: Locator;
  readonly priceFilterSelected: Locator;
  readonly filterClear: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.searchButton = page.getByRole('button').nth(3);
    this.itemFilterSize = page.locator('[data-test="filter-by-size"]');
    this.itemFilterColor = page.locator('[data-test="filter-by-colour"]');
    this.itemFilterPrice = page.locator('[data-test="filter-by-price"]');
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
    this.itemFilterSizeM = this.page
      .locator(`[data-test="filter-${size}"]`)
      .getByText(size);
    return this.itemFilterSizeM.click();
  }
  async clickOnFilterByColor() {
    await this.itemFilterColor.click();
  }

  async clickOnFilterBySpecificColor(color: string) {
    this.itemFilterColorWhite = this.page.locator(
      `[data-test="filter-${color}"] label div`
    );
    await this.itemFilterColorWhite.click();
  }

  async clickOnFilterByPrice() {
    await this.itemFilterPrice.click();
  }

  async clickOnFilterBySpecificPrice(price: string) {
    this.itemFilterPriceFrom20$ = this.page
      .locator("label")
      .filter({ hasText: price });
    return this.itemFilterPriceFrom20$.click();
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
