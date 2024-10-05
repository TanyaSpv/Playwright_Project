import { expect, type Locator, type Page } from '@playwright/test';

export class UniqloSearchPage {
    readonly searchButton: Locator;
    readonly itemInput: Locator;
    readonly pressEnter: Locator;
    readonly itemFound: Locator;
  
  
    constructor(page: Page) {
      
      this.searchButton = page.getByRole('button').nth(2);
      this.itemInput = page.getByPlaceholder("Search by keyword");
      this.itemFound = page.getByRole("link", { name: "CASHMERE KNITTED BEANIE" });
    }

    async searchItem(){
        await this.searchButton.click();
      }
    
      async fillItem(item: string){
        await this.itemInput.fill(item);
      }

      async pressEnterButton(){
       await this.pressEnter.press("Enter");
      }

      async isItemFound(){
        return this.itemFound.isVisible();
      }
    
    }