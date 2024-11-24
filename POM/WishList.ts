import { expect, type Locator, type Page } from "@playwright/test";

export class UniqloWishListPage {
  womenSectionLink: Locator;
  readonly closeModal: Locator;
  readonly womenItemSearchButton: Locator;
  selectItemSection: Locator;
  selectItemSectionSecondTime: Locator;
  filterItems: Locator;
  readonly selectFavoriteFirstItem: Locator;
  readonly selectFavoriteSecondItem: Locator;
  readonly selectFavoriteThirdItem: Locator;
  wishListButton: Locator;
  readonly checkWishList: Locator;
  readonly page: Page;
  readonly sortByButton: Locator;
  wishListItemLocator: Locator;

  constructor(page: Page) {
    this.womenItemSearchButton = page.getByRole("button").nth(1);
    this.closeModal = page
      .frameLocator('iframe[title="Sign Up via Text for Offers"]')
      .getByTestId("closeIcon");
    this.selectFavoriteFirstItem = page
      .getByRole("button", { name: "Favorite" })
      .nth(1);
    this.selectFavoriteSecondItem = page
      .getByRole("button", { name: "Favorite" })
      .nth(2);
    this.selectFavoriteThirdItem = page
      .getByRole("button", { name: "Favorite" })
      .nth(3);
    this.wishListButton = page.locator('a[href*="/ca/en/wishlist/"]').first();
    this.checkWishList = page.getByText("Your wish list has no items.");
    this.sortByButton = page.getByRole("button", { name: "Sort by" });
    this.page = page;
  }

  async chooseApparelCategory(category: string = "Women") {
    this.womenSectionLink = this.page.getByRole("tab", { name: category });
    await this.page.waitForTimeout(10000);
    await expect(this.womenSectionLink).toBeVisible();

    await this.womenSectionLink.click();
  }

  async clickCloseModal() {
    await this.page.reload();
    await this.closeModal.click({ force: true });
  }

  async clickSearchButton() {
    await this.womenItemSearchButton.dblclick({ force: true });
  }

  async selectItemType(categoryOption: string = "Accessories") {
    this.selectItemSection = this.page.getByRole("button", {
      name: categoryOption,
    });
    await expect(this.selectItemSection).toBeVisible();
    await this.page.waitForTimeout(5000);
    await this.selectItemSection.click();
  }

  async selectItemSpeciality(categoryOption: string = "Bags") {
    await this.page.waitForTimeout(5000);
    this.selectItemSectionSecondTime = this.page.getByRole("link", {
      name: categoryOption,
      exact: true,
    });
    await expect(this.selectItemSectionSecondTime).toBeVisible();
    await this.selectItemSectionSecondTime.click();
  }

  async clickSortBy(sortBy: string = "New arrivals") {
    await expect(
      this.sortByButton,
      "Sort by button did not appear"
    ).toBeVisible({ timeout: 30000 });
    await this.sortByButton.click();
    this.filterItems = this.page.getByRole("button", { name: sortBy });
    await expect(this.filterItems).toBeVisible();
    await this.filterItems.click();
  }

  async addToWishListFirstItem() {
    await expect(this.selectFavoriteFirstItem).toBeVisible();
    await this.selectFavoriteFirstItem.click();
  }

  async addToWishListSecondItem() {
    await expect(this.selectFavoriteSecondItem).toBeVisible();
    await this.selectFavoriteSecondItem.click();
  }

  async addToWishListThirdItem() {
    await expect(this.selectFavoriteThirdItem).toBeVisible();
    await this.selectFavoriteThirdItem.click();
  }

  async clickWishListButton() {
    await expect(this.wishListButton).toBeVisible();
    await this.wishListButton.click();
  }

  async unfavouriteItemsInWishList() {
    let favouritedItems = await this.page.locator(`button span.fr-icon.active.favorite_large`);
    let count = await favouritedItems.count();

    for (let i = 0; i < count; i++) {
        await favouritedItems.nth(0).click();
        // Re-evaluate the locator after each click
        favouritedItems = await this.page.locator(`button span.fr-icon.active.favorite_large`);
    }
}

  async clickCheckWishList() {
    await expect(this.checkWishList).toBeVisible();
    await this.checkWishList.click();
  }

  async navigateToClothingCategory(
    gender: string,
    category: string,
    subCategory: string = ""
  ) {
    await this.page.goto(
      `https://www.uniqlo.com/ca/en/${gender}/${category}/${subCategory}`
    );
  }

  async getWishlistItemCount() {
    const wishlistItems = await this.page.$$(
      ".fr-product-card.list.list-for-wishlist"
    );
    return wishlistItems.length;
  }
}
