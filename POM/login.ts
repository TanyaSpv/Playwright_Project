import { expect, type Locator, type Page } from '@playwright/test';

export class UniqloLoginPage {
  readonly page: Page;
  readonly uniqloUrl: string;
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButtonComplete: Locator;
  readonly okayButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.uniqloUrl = "https://www.uniqlo.com/ca/en/";
    this.loginButton = page.getByRole('button').nth(4);
    this.emailInput = page.getByPlaceholder("Enter a valid email");
    this.passwordInput = page.getByLabel("Password Password must be at");
    this.loginButtonComplete = page.locator('[data-test="login-button"]');
    this.okayButton = page.locator('[data-test="ok-button"]');
  }

  async goto() {
    await this.page.goto(this.uniqloUrl);
  }

  async manageModal() {
    await this.page.waitForTimeout(5000);
    await this.page.keyboard.press("Escape");
  }

  async clickToLogIn(){
    await this.page.waitForTimeout(1000);
    await this.loginButton.click({force: true});
    await this.okayButton.click({force: true});
  }

  async enterUserName(email: string){
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string){
    await this.passwordInput.fill(password);
  }

  async loginUser(){
    await this.loginButtonComplete.click();
  }
}