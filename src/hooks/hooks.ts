import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let page: Page;
let context: BrowserContext

BeforeAll(async function () {
    browser = await firefox.launch({ headless: false})
})

Before(async function () {
    context = await browser.newContext();
    page = await browser.newPage();
    // @ts-ignore
    pageFixture.page = page;
})

After(async function ({ pickle, result }) {
    // Screenshot only for failure
    if(result?.status == Status.FAILED){
        const image = await pageFixture.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`, type: "png"});
        await this.attach(image, "image/png");
    }
    await page.close();
    await context.close();
})

AfterStep(async function({pickle}){
    // Screenshot after each step
    const image = await pageFixture.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" });
    await this.attach(image, "image/png");
})

AfterAll(async function () {
    await browser.close();
});