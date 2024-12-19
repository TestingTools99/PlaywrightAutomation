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
    const fs = require('fs');
    const videoPath = './test-result/videos/';
    const screenshotPath = './test-result/screenshots/';
    if (!fs.existsSync(videoPath)) {
        fs.mkdirSync(videoPath, { recursive: true });
    }
    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath, { recursive: true });
    }
    browser = await chromium.launch({ headless: false}
    )
})

Before(async function () {
    const path = require('path');
    context = await browser.newContext({
        recordVideo: {
            dir: path.resolve('./test-result/videos/'),
            size: { width: 1280, height: 720 }
        }
    });
    page = await context.newPage(); // Ensure new page is created in the context
    pageFixture.page = page;
});

After(async function () {
    loginPage = new LoginPage(pageFixture.page)
    dashBoardPage = new DashBoardPage(pageFixture.page)
    await dashBoardPage.logout()

    const videoPath = await page.video()?.path();
    if (videoPath) {
        const fs = require('fs').promises;
        const video = await fs.readFile(videoPath);
        await this.attach(video, 'video/webm');
    }
    
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