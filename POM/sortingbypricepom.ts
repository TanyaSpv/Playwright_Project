import { type Locator, type Page } from "@playwright/test";

export class UniqloSortingByPrice {
  searchButton: Locator;
  selectButton: Locator;
  selectSpecificButton: Locator;
  filterButton: Locator;
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

  async filteringOptions(priceFilter: string, itemFilter: string) {
    const filterLocator = this.page.locator('#utilityBarER label').filter({ hasText: priceFilter });
    await filterLocator.click();
    await this.page.locator('header').filter({ hasText: itemFilter}).locator('div').click();
  }

  async getFirstItemInnerText() {
    this.firstItemElement = this.page.locator('.price-limited-ER').nth(0);
    this.firstItemInnerText = await this.firstItemElement.allInnerTexts();
    //I need this.firstItemInnerText to strip the $ sign and convert to a number
    this.firstItemInnerText = this.firstItemInnerText.map((item) => {
      return item.replace(/[^\d.]/g, "");
    });

    this.firstTextAmt = parseFloat(this.firstItemInnerText[0]);
  }

  async getLastItemInnerText() {
    this.lastItemElement = this.page.locator('.price-limited-ER').last();
    this.lastItemInnerText = await this.lastItemElement.allInnerTexts();
    // Strip the $ sign and convert to a number
    this.lastItemInnerText = this.lastItemInnerText.map((item) => {
      return item.replace(/[^\d.]/g, "");
    });

    this.lastTextAmt = parseFloat(this.lastItemInnerText[0]);
  }
}
