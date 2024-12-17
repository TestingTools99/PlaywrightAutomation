import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export class LoginPage extends BasePage
{
    readonly page : Page
    private readonly userNameTextBox:Locator
    private readonly passwordTextBox:Locator
    private readonly loginInButton:Locator
    private readonly notNowButton:Locator

    constructor(page:Page)
    {
        super(page)
        this.page = page
        this.userNameTextBox = page.locator('#xl-form-email')
        this.passwordTextBox = page.locator('#xl-form-password')
        this.loginInButton = page.locator('#xl-form-submit')
        this.notNowButton = page.locator("//button[text()='Not now']")
    }

    async doPerformLogin(userName:string, password:string)
    {
        await this.userNameTextBox.fill(userName)
        await this.passwordTextBox.fill(password)
        await this.loginInButton.waitFor({ state: 'visible' });
        await this.clickElement(this.loginInButton)
    }

    async clickOnNotNow()
    {
        await this.highlightAndClick(this.notNowButton)
    }
}