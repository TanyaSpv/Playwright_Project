import { expect, type Locator, type Page } from '@playwright/test';

export class UniqloSearchPage {
    readonly searchButton: Locator;
    readonly itemInput: Locator;
    readonly pressEnter: Locator;
    readonly itemFound: Locator;
    readonly page: Page;
  
  
    constructor(page: Page) {
      
      this.searchButton = page.getByRole('button').nth(3);
      this.itemInput = page.getByPlaceholder('Search by keyword');
      this.itemFound = page.getByRole('link', { name: 'Favorite CASHMERE KNITTED' });
      this.page = page;
    }

    async searchItem(){
        await this.searchButton.click({force: true});
      }
    
      async fillItem(item: string){
        await this.page.waitForTimeout(1000);
        await this.itemInput.fill(item);
      }

      async pressEnterButton(){
        await this.page.keyboard.press("Enter");
      }

      async isItemFound(){
        return this.itemFound.isVisible();
      }
    
    }