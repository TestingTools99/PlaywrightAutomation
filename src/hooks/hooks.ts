import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { DashBoardPage } from '../tests/pageInfo/DashBoardPage'
import { LoginPage } from '../tests/pageInfo/LoginPage';
import { WaitUtils } from '../utils/WaitUtils';

let browser: Browser;
let page: Page;
let context: BrowserContext
let loginPage:LoginPage
let dashBoardPage:DashBoardPage

BeforeAll(async function () {
    browser = await firefox.launch({ headless: false})
})

Before(async function () {
    context = await browser.newContext();
    page = await browser.newPage();
    // @ts-ignore
    pageFixture.page = page;
})

After(async function () {
    loginPage = new LoginPage(pageFixture.page)
    dashBoardPage = new DashBoardPage(pageFixture.page)
    await dashBoardPage.logout()
    await page.close()
    await context.close()
})

AfterStep(async function({pickle}){
    // Screenshot after each step
    const image = await pageFixture.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" });
    await this.attach(image, "image/png");
})

AfterAll(async function () {
    await browser.close();
});