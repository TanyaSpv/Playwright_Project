import { type Locator, type Page } from "@playwright/test";

export class UniqloSortingByPrice {
  searchButton: Locator;
  selectButton: Locator;
  selectSpecificButton: Locator;
  filterButton: Locator;
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

  }

  async searchItem(){
    this.searchButton = this.page.getByRole('button').nth(3);
    await this.searchButton.click({force: true});
  }

  async selectItem(){
    this.selectButton = this.page.getByRole('button', { name: 'T-Shirts, Sweats & Fleece' });
    await this.selectButton.click({force: true});
  }

  async selectSpecificItem(){
    this.selectSpecificButton = this.page.getByRole('link', { name: 'T-shirts', exact: true });
    await this.selectSpecificButton.click({force: true});
  }

  async   clickFilterByPrice() {
    this.filterButton = this.page.locator('li').filter({ hasText: 'Price' }).locator('div');
    await this.filterButton.click();
  }

  async filteringOptions(priceFilter: string) {
    const filterLocator = this.page.locator('#utilityBarER label').filter({ hasText: priceFilter });
    await filterLocator.click();
    await this.priceFilterLowToHigh.click();
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
