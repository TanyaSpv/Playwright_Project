import { type Locator, type Page } from "@playwright/test";

export class UniqloSortingByPrice {
  selectGender: Locator;
  readonly itemFilter: Locator;
  sortingButton: Locator;
  priceFilterLowToHigh: Locator;
  firstItemElement: Locator;
  lastItemElement: Locator;
  readonly cleanedString: string;
  firstItemValue: number;
  lastItemValue: number;
  readonly page: Page;
  firstItemInnerText: string[];
  lastItemInnerText: string[];
  firstTextAmt: number;
  lastTextAmt: number;

  constructor(page: Page) {
    this.page = page;
    this.itemFilter = page
      .locator("a")
      .filter({ hasText: /^T-shirts$/ })
      .first();
  }

  async selectGenderOption(gender: string) {
    this.selectGender = this.page.getByRole("link", { name: `${gender}` });
    await this.selectGender.hover();
    await this.itemFilter.click();
  }

  async sortByItem() {
    this.sortingButton = this.page.locator('[data-test="sort-by"]');
    await this.sortingButton.click();
  }

  async filteringItem(ascending: boolean) {
    if (ascending) {
      this.priceFilterLowToHigh = this.page.getByRole("option", {
        name: "Price: High to low",
      });
    } else {
      this.priceFilterLowToHigh = this.page.getByRole("option", {
        name: "Price: Low to high",
      });
    }
    return this.priceFilterLowToHigh.click();
  }

  async getFirstItemInnerText() {
    this.firstItemElement = this.page
      .locator(
        `//article[contains(@class, 'fr-grid-item w4')]//div[@class='price fr-no-uppercase']`
      )
      .first();
    this.firstItemInnerText = await this.firstItemElement.allInnerTexts()[0];

    let innerText = this.firstItemElement.toString().replace(/[^\d.]/g, "");
    this.firstTextAmt = parseFloat(innerText);
  }

  async getLastItemInnerText() {
    this.lastItemElement = this.page
      .locator(
        `//article[contains(@class, 'fr-grid-item w4')]//div[@class='price fr-no-uppercase']`
      )
      .last();
    this.lastItemInnerText = await this.lastItemElement.allInnerTexts()[0];
    let innerText =  await this.lastItemElement.toString().replace(/[^\d.]/g,"");
    this.lastTextAmt = parseFloat(innerText);
  }
}
